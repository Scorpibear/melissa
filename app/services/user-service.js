angular.module('melissa.services')
    .factory('userService', function() {
        var generate = function () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16);
            })
        };
        var user = {id: ""};
        var key = "melissa.user";
        var loadedUser = localStorage.getItem(key);
        if(loadedUser != null) {
            user = JSON.parse(loadedUser);
        } else {
            user.id = generate();
            localStorage.setItem(key, JSON.stringify(user));
        }

        return {
            getUser: function() {
                return user;
            }
        }
    });
