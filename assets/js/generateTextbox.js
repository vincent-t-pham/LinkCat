let textboxCounter = 2;

function generateTextboxscript() {
    // Max size
    if(textboxCounter>=20){
        return 0;
    }

    textboxCounter++;

    const newLabel = document.createElement('label');
    newLabel.innerHTML = `Textbox ${textboxCounter}: `;
    newLabel.setAttribute('for', `textbox${textboxCounter}`);

    const newTextbox = document.createElement('input');
    newTextbox.setAttribute('type', 'text');
    newTextbox.setAttribute('id', `textbox${textboxCounter}`);
    newTextbox.setAttribute('name', `textbox${textboxCounter}`);
    
    const container = document.getElementById('textboxContainer');
    container.appendChild(newLabel);
    container.appendChild(newTextbox);
    container.appendChild(document.createElement('br'));
}

generateTextboxscript();