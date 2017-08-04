tinyChatApp.controller('chatController', ['$http', '$scope', function($http, $scope) {

	var vm = this;
	vm.messages = [];
	vm.lastId = 0;
	$http.get('../../fixtures/fakedata.json').then(function(response) {
		vm.messages = response.data.messages;
		vm.lastId = vm.messages[vm.messages.length-1].id;
	});

	vm.username= '';
	vm.message = '';

	vm.addMessage = function() {
		vm.date = new Date();
		vm.epochSeconds = Math.round(vm.date.getTime() / 1000);
		vm.temp = vm.messages;
		vm.messageObject = {
			id: vm.lastId++,
			author: vm.username,
			timestamp: vm.epochSeconds,
			content: vm.message
		}
		vm.messages.push(vm.messageObject);
		console.log(vm.messages)
	}

}]);