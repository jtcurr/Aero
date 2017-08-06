tinyChatApp.controller('chatController', ['$http', function($http) {

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

	vm.addMessage = function(id) {
		if (id) {
			for(var i = 0; i < vm.messages.length; i++) {
				if(vm.messages[i].id === id) {
					vm.messages[i].content = vm.message;
				}
			}
			console.log(vm.messages)
			return;
		}
		//Won't submit empty fields
		if (vm.username === '' || vm.message === '') {
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
		//Changes name field to disabled so you can only enter name once
		$(".user-field").prop("disabled", true);
		//Return fields to empty string
		vm.message = '';
	}

	vm.messageEditor = function(id, innerText) {

		$('.message-body[id^='+id+']').remove();
		$('input[id^='+id+']').css('display', 'inline');
		$('input[id^='+id+']').attr('placeholder', innerText);
		$('button[id^='+id+']').removeClass('btn-warning');
		$('button[id^='+id+']').addClass('btn-success');
		$('button[id^='+id+']').html('Change!');
		$('button[id^='+id+']').click(vm.addMessage(id));

	}

}]);