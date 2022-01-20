'use strict';

angular.module("melissa.services")
    .value("queueToAnalyze", [])
    .constant("sendForAnalysisTimeout", 2000)
    .constant('moveConverter', {movesToFen: moves => {
        const chess = new Chess();
        moves.forEach(move => chess.move(move));
        return chess.fen();
    }})
    .factory("baseUpdater", [
        '$http', 'baseManager', 'positionSelector', 'moveValidator', 'queueToAnalyze',
        'sendForAnalysisTimeout', 'userService', 'connectionIndicator', 'trackableApiClient', 'moveConverter',
        ($http, baseManager, positionSelector, moveValidator, queueToAnalyze,
        sendForAnalysisTimeout, userService, connectionIndicator, apiClient, moveConverter) => {
            let baseUpdated = false;
            let base = baseManager.restoreBase();
            let backendUrl = 'http://umain-02.cloudapp.net:9966';
            //backendUrl = 'http://localhost:9966';
            let retryTimeout = 1000;
            const updateBase = () => {
                const user = userService.getUser();
                connectionIndicator.startSending();
                $http({method: 'GET', url: backendUrl + '/api/getbase?userid=' + user.id, transformResponse: false}).
                    then(
                        function success(response){
                            console.log("new base received, ", response.data.length, " bytes");
                            base = JSON.parse(response.data);
                            base.pgn = '';
                            baseUpdated = true;
                            baseManager.saveBase(base);
                            connectionIndicator.success();
                        },
                        function error(response) {
                            console.error("could not update base from server: ", response);
                            connectionIndicator.error();
                            setTimeout(updateBase, retryTimeout+=retryTimeout);
                        }
                    );
            }
            setTimeout(updateBase, 0);
            
            var sendForAnalysisInProgress = false;
            var sendForAnalysis = function() {
                if(queueToAnalyze.length > 0) {
                    sendForAnalysisInProgress = true;
                    var dataToAnalyze = queueToAnalyze[0];
                    connectionIndicator.startSending()
                    $http.post(backendUrl + '/api/analyze', {moves: dataToAnalyze}).
                        then(function success() {
                            queueToAnalyze.shift();
                            sendForAnalysisInProgress = false;
                            console.log('sent to analyze: ' + dataToAnalyze);
                            connectionIndicator.success();
                        }, function error(err) {
                            sendForAnalysisInProgress = false;
                            console.log('post error: ' + err);
                            connectionIndicator.error();
                        });
                }
            };
            setInterval(sendForAnalysis, sendForAnalysisTimeout);

            const baseUpdater = {
                getStart: function () {
                    return base;
                },
                getBestSubPositions: function (positionObject) {
                    if (baseUpdated) {
                        positionObject = base;
                        baseUpdated = false;
                    }
                    return positionSelector.getBestSubPositions(positionObject);
                },
                validateMoves: function(moves) {
                    var result = moveValidator.validate(moves, base);
                    if (result == "unknown") {
                        var movesWithoutLast = moves.slice(0,moves.length-1);
                        queueToAnalyze.push(movesWithoutLast);
                    }
                    return result;
                },
                getBestMove: function(moves) {
                    var positionObject = positionSelector.getPositionByMoves(base, moves);
                    if (positionObject && positionObject.s && positionObject.s.length>0) {
                        return positionObject.s[0].m
                    } else {
                        return null;
                    }
                },
                getBestMoveAsync: moves => {
                    return new Promise((resolve, reject) => {
                        try {
                            let result = baseUpdater.getBestMove(moves);
                            if(!result) {
                                let fen = moveConverter.movesToFen(moves);
                                apiClient.getFenData(fen).then(fenData => {
                                    resolve(fenData.bestMove);
                                })
                            } else {
                                resolve(result);
                            }
                        } catch (err) {
                            reject(err);
                        }
                    })
                },
                getEvaluation: function(moves) {
                    var position = positionSelector.getPositionByMoves(base, moves);
                    return position ? position.e : null;
                }
            }
            return baseUpdater;
        }]);
