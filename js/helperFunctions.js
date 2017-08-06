//Work around for Bootstrap button staying focused on click
$(".btn").mouseup(function(){
    $(this).blur();
});