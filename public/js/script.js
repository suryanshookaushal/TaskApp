
function myFunction(clr) {
    console.log(clr);
    document.getElementById("myForm").action = 
    "/tasks/"+clr;
    
    document.getElementById("myForm").submit();
}
