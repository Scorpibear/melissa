angular.module("melissa.services")
    .factory("baseProvider", function () {
        return {
            getAll: function () {
                return base;
            }
        }
    });
