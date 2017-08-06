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
		if (id && id > 0) {
			for(var i = 0; i < vm.messages.length; i++) {
				if(vm.messages[i].id === id) {
					//Removes the old value
					vm.messages.splice(i, 1);
				}
			}
			//Adds new value with a new date
			objectCreatorAndConcat(id, vm.username, vm.epochSeconds, vm.message + '(EDITED)');

			messageChanging = false;
			changeId = null;
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
		vm.lastId = vm.lastId + 1;
		objectCreatorAndConcat(vm.lastId, vm.username, vm.epochSeconds, vm.message);
		//Changes name field to disabled so you can only enter name once
		$(".user-field").prop("disabled", true);
		blurRemover();
	}

	//Variables to ensure only one message is able to be changed at a time.
	var messageChanging = false;
	var changeId = null;

	vm.messageEditor = function(id, innerText) {
		//If there is no current message being changed, adds input field and changes button
		if(!messageChanging) {
			$('.message-body[id^='+id+']').remove();
			$('input[id^='+id+']').css('display', 'inline');
			$('input[id^='+id+']').attr('placeholder', innerText);
			$('button[id^='+id+']').removeClass('btn-warning');
			$('button[id^='+id+']').addClass('btn-success');
			$('button[id^='+id+']').html('Change!');
			changeId = id;
			messageChanging = true;
			blurRemover();
			return;
		}

		if(changeId !== id) {
			return;
		}
		//Only the button with the current Id will have a click handler availble for it
		if(changeId === id) {
			$('button[id^='+changeId+']').click(vm.addMessage(id));
			return;
		}
	}

	function objectCreatorAndConcat(id, author, date, content) {
		var messageObject = {
			id: id,
			author: author,
			timestamp: date,
			content: content
		}
		//Add the newest message to the beginning of the array
		vm.messages = [messageObject].concat(vm.messages);
		//Return fields to empty string
		vm.message = '';
	}

}]);