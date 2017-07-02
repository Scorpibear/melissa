'use strict';

describe('melissa.analyze module', function () {

  beforeEach(module('melissa.analyze'));

  describe('analyze controller', function () {
    var baseUpdater = { 
      validateMoves: function() {},
      getEvaluation: function() {
        return {v: 0.06, d: 32};
      },
      getBestMove: function(){}
    };
    var analyzeChessGame = {reset: function(){}, history: function(){return [];},
      undo: function(){return {color: 'w'};}, fen: function(){}};
    var $controller;
    beforeEach(inject(function (_$controller_) {
      $controller = _$controller_;
    }));
    describe('constructor', function() {
      it('resets chessGame', function() {
        spyOn(analyzeChessGame, 'reset');
        var analyzeCtrl = $controller('AnalyzeController', {$scope: {}, analyzeChessGame: analyzeChessGame});
        expect(analyzeChessGame.reset).toHaveBeenCalled();
      });
    });
    describe('getType', function() {
      beforeEach(function () {
        spyOn(baseUpdater, 'validateMoves');
      });
      it("uses baseUpdater.validateMoves", function() {
        var $scope = {};
        var analyzeCtrl = $controller('AnalyzeController', {$scope: $scope, baseUpdater: baseUpdater});
        $scope.getType([]);
        expect(baseUpdater.validateMoves).toHaveBeenCalled();
      });
    });
    describe('getEvaluationAndDepthStr', function() {
      it("get evaluation by move", function() {
        var $scope = {};
        $controller('AnalyzeController', {$scope: $scope, baseUpdater: baseUpdater});
        expect($scope.getEvaluationAndDepthStr()).toEqual("0.06 32");
      });
      it("get empty string if evaluation is undefined", function() {
        var $scope = {};
        $controller('AnalyzeController', {$scope: $scope, baseUpdater: baseUpdater});
        spyOn(baseUpdater, 'getEvaluation').and.returnValue(undefined);
        expect($scope.getEvaluationAndDepthStr()).toEqual("");
      });
      it("provide only existing value if only it is known", function() {
        var $scope = {};
        $controller('AnalyzeController', {$scope: $scope, baseUpdater: baseUpdater});
        spyOn(baseUpdater, 'getEvaluation').and.returnValue({v: 0.23});
        expect($scope.getEvaluationAndDepthStr()).toEqual("0.23");
      });
      it("if evaluation is unknown, depth is useless so provide empty string", function() {
        var $scope = {};
        $controller('AnalyzeController', {$scope: $scope, baseUpdater: baseUpdater});
        spyOn(baseUpdater, 'getEvaluation').and.returnValue({d: 30});
        expect($scope.getEvaluationAndDepthStr()).toEqual("");
      });
    });
    describe('registerPositionChange', function() {
      it('add new html element to pgn', function() {
        var $scope = {$apply: function(){}};
        $controller('AnalyzeController', {$scope: $scope, analyzeChessGame: analyzeChessGame, baseUpdater: baseUpdater, trainMode: {}});

        $scope.registerPositionChange({color: 'b'});

        expect($scope.pgnElements.length).toBe(1);
      });
      it('white color increases move number', function() {
        var $scope = {$apply: function(){}};
        $controller('AnalyzeController', {$scope: $scope, analyzeChessGame: analyzeChessGame, baseUpdater: baseUpdater, trainMode: {}});

        $scope.registerPositionChange({color: 'w'});

        expect($scope.moveNumber).toBe(1);
      })
    });
    describe('back', function() {
      it('removes the last pgnElement', function() {
        var $scope = {$apply: function(){}, board: {position: function(){}}};
        $controller('AnalyzeController', {$scope: $scope, analyzeChessGame: analyzeChessGame, baseUpdater: baseUpdater, trainMode: {}});
        $scope.registerPositionChange({color: 'w', san: 'e4'});
        
        $scope.back();

        expect($scope.pgnElements.length).toBe(0);
      });
      it('does not modify game if on start position', function(){
        var $scope = {$apply: function(){}, board: {position: function(){}}};
        $controller('AnalyzeController', {$scope: $scope, analyzeChessGame: analyzeChessGame, baseUpdater: baseUpdater, trainMode: {}});
        spyOn(analyzeChessGame, 'undo');

        $scope.back();

        expect(analyzeChessGame.undo).not.toHaveBeenCalled();
      });
      it('does not change moveNumber if last move was black', function() {
        var $scope = {$apply: function(){}, board: {position: function(){}}};
        $controller('AnalyzeController', {$scope: $scope, analyzeChessGame: analyzeChessGame, baseUpdater: baseUpdater, trainMode: {}});
        $scope.registerPositionChange({color: 'w', san: 'e4'});
        $scope.registerPositionChange({color: 'b', san: 'e6'});
        spyOn(analyzeChessGame, 'undo').and.returnValue({color: 'b'});

        $scope.back();

        expect($scope.moveNumber).toBe(1);
      })
    });
    describe('reload', function() {
      it('calls back() if moveNumber is non zero', function() {
        var $scope = {$apply: function(){}, board: {position: function(){}}};
        $controller('AnalyzeController', {$scope: $scope, analyzeChessGame: analyzeChessGame, baseUpdater: baseUpdater, trainMode: {}});
        $scope.moveNumber = 1;
        spyOn($scope, 'back').and.callThrough();
        $scope.reload();

        expect($scope.back).toHaveBeenCalled();
      });
    });
    describe('switchOrientation', function() {
      it('sets board orientation to black if it was white', function() {
        var $scope = {$apply: function(){}, board: {position: function(){}, orientation: function(){}}};
        $controller('AnalyzeController', {$scope: $scope, analyzeChessGame: analyzeChessGame, baseUpdater: baseUpdater, trainMode: {}});
        spyOn($scope.board, 'orientation').and.returnValue('white');

        $scope.switchOrientation();

        expect($scope.board.orientation).toHaveBeenCalledWith('black');
      });
      it('sets board orientation to white if it was black', function() {
        var $scope = {$apply: function(){}, board: {position: function(){}, orientation: function(){}}};
        $controller('AnalyzeController', {$scope: $scope, analyzeChessGame: analyzeChessGame, baseUpdater: baseUpdater, trainMode: {}});
        spyOn($scope.board, 'orientation').and.returnValue('black');

        $scope.switchOrientation();
        
        expect($scope.board.orientation).toHaveBeenCalledWith('white');
      });
    });
    describe('getBetterMoveStr', function(){
      it('returns bestMove with exclamation mark in brackets if bestMove is not equal to lastMove', function() {
        var $scope = {};
        $controller('AnalyzeController', {$scope: $scope, analyzeChessGame: analyzeChessGame, baseUpdater: baseUpdater, trainMode: {}});
        expect($scope.getBetterMoveStr('e4', 'a2')).toEqual('(e4!)');
      });
    });
    describe('getMoveNumberStr', function() {
      var $scope = {};
      beforeAll(function() {
        $controller('AnalyzeController', {$scope: $scope, analyzeChessGame: analyzeChessGame, baseUpdater: baseUpdater, trainMode: {}});
      })
      it('returns number with point just after it for white', function() {
        expect($scope.getMoveNumberStr("w", 17)).toEqual("17.");
      });
      it('returns empty string for black', function() {
        expect($scope.getMoveNumberStr("b", 5)).toEqual("");
      });
    });
    describe('trainBranch', function() {
      //TODO
    });
  });
});
