angular.module('patronusApp').controller('MainController', function($http){
  var vm = this;
  vm.names = [];
  vm.patronuses = [];

  vm.getNames = function() {
      $http.get('/people').then(function(response){
        console.log('Here are all of your names: ', response)
        vm.names = response.data;
        })
  }

  vm.getPatronuses = function() {
      $http.get('/patronuses').then(function(response){
        console.log('Here are all of your patronuses: ', response)
        vm.patronuses = response.data;
        })
  }

  vm.submitName = function() {
    var sendData = {};
    var splitName = vm.tempName.split(' ');
    sendData.first = splitName[0];
    sendData.last = splitName[1];
    vm.names.push(splitName);
    $http.post('/people', sendData).then(handleNameSuccess, handleFailure);
  }

  vm.submitPatronus = function() {
    var sendData = {};
    sendData.patronus = vm.tempPatronus;
    $http.post('/patronuses', sendData).then(handlePatronusSuccess, handleFailure);
  }

  function handleNameSuccess(response){
    console.log('Success', response);
    vm.getNames();
  }

  function handlePatronusSuccess(response){
    console.log('Success', response);
    vm.getPatronuses();
  }

  function handleFailure(response){
    console.log('Failure', response);
  }

  vm.getNames();
  vm.getPatronuses();

})
