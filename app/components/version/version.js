'use strict';

angular.module('melissa.version', [
    'melissa.version.interpolate-filter',
    'melissa.version.version-directive'
])

    .value('version', '0.1');
