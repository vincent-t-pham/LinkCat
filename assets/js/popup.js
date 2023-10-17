// popup.js
document.addEventListener("DOMContentLoaded", function(){
    const myButton = document.querySelector("#test-button");

    myButton.addEventListener("click", function(){
        var div = document.getElementsByTagName("body")[0].style.backgroundColor = "aqua";
        console.log("popup.js test");
    });

})


