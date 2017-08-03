tinyChatApp.controller('chatController', ['$http', function($http) {
	var vm = this;
	vm.messages = [];
	$http.get('../../fixtures/fakedata.json').then(function(response) {
		vm.messages = response.data.messages;
	})
}])