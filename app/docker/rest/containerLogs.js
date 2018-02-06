angular.module('portainer.docker')
.factory('ContainerLogs', ['$http', 'API_ENDPOINT_ENDPOINTS', 'EndpointProvider', function ContainerLogsFactory($http, API_ENDPOINT_ENDPOINTS, EndpointProvider) {
  'use strict';
  return {
    get: function (id, nodeName, params, callback) {
      $http({
        method: 'GET',
        url: API_ENDPOINT_ENDPOINTS + '/' + EndpointProvider.endpointID() + '/docker/containers/' + id + '/logs',
        params: {
          'stdout': params.stdout || 0,
          'stderr': params.stderr || 0,
          'timestamps': params.timestamps || 0,
          'tail': params.tail || 'all'
        },
        headers: {
          'X-PortainerAgent-Target': nodeName
        },
        ignoreLoadingBar: true
      }).success(callback).error(function (data, status, headers, config) {
        console.log(data);
      });
    }
  };
}]);