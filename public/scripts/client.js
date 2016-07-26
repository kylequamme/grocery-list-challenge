angular.module('groceryApp', []);
angular.module('groceryApp').controller('MainController', function($http){
  var vm = this;
  vm.tempName = '';
  vm.tempQty = 1;
  vm.editName = [];
  vm.editQty = [];
  vm.edit = []
  vm.errorMessage = '';

  vm.getGroceries = function() {
    $http.get('/groceries').then(function(response){
      console.log('Here are all of your groceries: ', response)
      vm.groceries = response.data;
    })
  }

  vm.addGrocery = function() {
    if(vm.tempName != ''){
      vm.errorMessage = '';
      var sendData = {name: vm.tempName, qty: vm.tempQty};
      $http.post('/groceries/add', sendData).then(handleSuccess, handleFailure);
    }else{
      vm.errorMessage = 'Please add a grocery name'
    }
  }

  vm.editGrocery = function(id,name,qty){
    vm.edit[id] = true;
    vm.editName[id] = name;
    vm.editQty[id] = qty
  }

  vm.saveGrocery = function(id) {
    var sendData = {id: id, name: vm.editName[id], qty: vm.editQty[id]};
    $http.put('/groceries/modify', sendData).then(handleSuccess, handleFailure);
    vm.edit[id] = false;
  }

  vm.removeGrocery = function(id) {
    $http.delete('/groceries/remove/' + id).then(handleSuccess, handleFailure);
    vm.edit[id] = false;
  }

  function handleSuccess(response){
    vm.getGroceries();
    vm.tempName = '';
    vm.tempQty = 1;
  }

  function handleFailure(response){
    console.log('Failure', response);
  }

  vm.getGroceries();

})
