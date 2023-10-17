// content.js

// document.body.style.backgroundColor = 'blue';
console.log("test");



// function injectedFunction(){
// let textboxCounter = 2;

const popup = document.querySelector("#textboxContainer")

var textboxHtml = "<label for='textbox2'>Textbox 2:</label><input type='text' id='textbox2' name='textbox2'><br>"
popup.outerHTML = textboxHtml

// // const popupContent = document.getElementById("textboxContainer")

// // Max size
// if(textboxCounter>=20){
//     return 0;
// }

// textboxCounter++;

// const newLabel = document.createElement('label');
// newLabel.innerHTML = `Textbox ${textboxCounter}: `;
// newLabel.setAttribute('for', `textbox${textboxCounter}`);

// const newTextbox = document.createElement('input');
// newTextbox.setAttribute('type', 'text');
// newTextbox.setAttribute('id', `textbox${textboxCounter}`);
// newTextbox.setAttribute('name', `textbox${textboxCounter}`);

// const container = document.getElementByDiv('textboxContainer');
// container.appendChild(newLabel);
// container.appendChild(newTextbox);
// container.appendChild(document.createElement('br'));
  
// }
