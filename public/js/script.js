
function myFunction(clr) {
    console.log(clr);
    document.getElementById("myForm").action = 
    "/tasks/"+clr;
    
    document.getElementById("myForm").submit();
}

$(".listmessage").show();

setTimeout(function() { $(".listmessage").fadeOut(); }, 5000);