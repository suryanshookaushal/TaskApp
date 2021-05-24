
function myFunction(clr) {
    console.log(clr);
    document.getElementById("myForm").action = 
    "/tasks/"+clr;
    
    document.getElementById("myForm").submit();
}

$(".listmessage").show();
setTimeout(function() { $(".listmessage").fadeOut(); }, 5000);


$(".successmessage").show();
setTimeout(function() { $(".successmessage").fadeOut(); }, 5000);