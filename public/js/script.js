
function myFunction(clr) {
    console.log(clr);
    document.getElementById("myForm").action = 
    "http://localhost:3000/tasks/"+clr;
    
    document.getElementById("myForm").submit();
}
