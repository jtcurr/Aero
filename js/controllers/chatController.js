tinyChatApp.controller('chatController', ['$http', '$scope', function($http, $scope) {

	var vm = this;
	vm.messages = [];
	vm.lastId = 0;
	$http.get('../../fixtures/fakedata.json').then(function(response) {
		//Sorts responses to newest ones first
		vm.messages = response.data.messages.sort(function(a,b) {
			return b.timestamp-a.timestamp;
		});
		vm.lastId = vm.messages[0].id;
	});

	vm.username= '';
	vm.message = '';

	vm.addMessage = function() {
		//Wont submit empty fields
		if(vm.username === '' || vm.message === '') {
			return;
		}
		vm.date = new Date();
		//Get epoch time in second integer format
		vm.epochSeconds = Math.round(vm.date.getTime() / 1000);
		vm.temp = vm.messages;
		//New message with incremented up index and timestamp
		vm.messageObject = {
			id: vm.lastId++,
			author: vm.username,
			timestamp: vm.epochSeconds,
			content: vm.message
		}
		//Add the newest message to the beginning of the array
		vm.messages= [vm.messageObject].concat(vm.messages);
		//Changes name fild to disabled so you can only enter name once
		$(".user-field").prop('disabled', true);
		//Return fields to empty string
		vm.message = '';
	}

}]);