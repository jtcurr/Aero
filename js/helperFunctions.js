//Work around for Bootstrap button staying focused on click
function blurRemover() {
	$(".btn").mouseup(function(){
	    $(this).blur();
	});
}