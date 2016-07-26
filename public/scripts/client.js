angular.module('groceryApp', []);
angular.module('groceryApp').controller('MainController', function($http){
  var vm = this;
  //Used to help get and pass info to the view
  vm.tempName = '';
  vm.tempQty = 1;
  vm.editName = [];
  vm.editQty = [];
  vm.edit = []
  vm.errorMessage = '';
  //Populates the ng-Repeat
  vm.getGroceries = function() {
    $http.get('/groceries').then(function(response){
      console.log('Here are all of your groceries: ', response)
      vm.groceries = response.data;
    })
  }
  //Add a grocery item to the groceries table in the DB
  vm.addGrocery = function() {
    if(vm.tempName != ''){
      vm.errorMessage = '';
      var sendData = {name: vm.tempName, qty: vm.tempQty};
      $http.post('/groceries/add', sendData).then(handleSuccess, handleFailure);
    }else{
      vm.errorMessage = 'Please add a grocery name'
    }
  }
  //Allows input fields to show up for individual items and links an index value with those fields
  vm.editGrocery = function(id,name,qty){
    vm.edit[id] = true;
    vm.editName[id] = name;
    vm.editQty[id] = qty
  }
  //Saves changes to grocery items
  vm.saveGrocery = function(id) {
    var sendData = {id: id, name: vm.editName[id], qty: vm.editQty[id]};
    $http.put('/groceries/modify', sendData).then(handleSuccess, handleFailure);
    vm.edit[id] = false;
  }
  //Removes a grocery item from the groceries table in the DB
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
