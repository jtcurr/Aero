//Work around for CSS button staying focused on click
$(".btn").mouseup(function(){
    $(this).blur();
})