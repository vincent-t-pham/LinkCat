// popup.js

document.addEventListener("DOMContentLoaded", function(){

    // Hide the loading screen // lambdas
    setTimeout(function() {
        // Code to be executed after the delay
        const loadingScreen = document.querySelector(".loading-screen");
        loadingScreen.style.display = "none";
    }, 350);

    // uniform quote styling
    const myButton = document.querySelector("#test-button");
    const generateLink = document.querySelector("#submit");
    const textboxContainer = document.getElementById("textboxContainer");

    const resultElement = document.createElement('p');
    resultElement.id = 'result';

    myButton.addEventListener("click", function(){
        // var div = document.getElementsByTagName("body")[0].style.backgroundColor = "aqua";

        const newLabel = document.createElement('label');
        newLabel.setAttribute('for', 'textbox' + (textboxContainer.childElementCount / 3 + 1));
        newLabel.textContent = 'Link ' + (textboxContainer.childElementCount / 3 + 1) + ':';
        // Create a new input element
        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('id', 'textbox' + (textboxContainer.childElementCount / 3 + 1 ));
        newInput.setAttribute('name', 'textbox' + (textboxContainer.childElementCount / 3 + 1 ));
     
        const lineBreak = document.createElement('br');

        // Append the new label and input to the container
        textboxContainer.appendChild(newLabel);
        textboxContainer.appendChild(newInput);
        textboxContainer.appendChild(lineBreak);

        // Add an event listener to the new textbox
        newInput.addEventListener('input', () => {
            const storageKey = `textbox${textboxContainer.childElementCount / 3}`;
            const data = {};
            data[storageKey] = newTextbox.value;
            chrome.storage.sync.set(data);
        });

        const newTextbox = document.createElement('');
        textboxContainer.appendChild()
        console.log("popup.js test");
    });

    generateLink.addEventListener("click", async function() {
        event.preventDefault();
        console.log("Trying to POST pressed");

        const dataToSend = {};

        for (let i = 1; i <= textboxContainer.childElementCount/3; i++) {
            const textbox = document.getElementById(`textbox${i}`);
            dataToSend[`textbox${i}`] = textbox.value;
        }

        print(JSON.stringify(dataToSend))

        const url = 'http://127.0.0.1:5000/endpoint';
    
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Fix the header format
                },
                // body: textbox1,
                body: JSON.stringify(dataToSend), // Convert dataToSend to a JSON string
            });
    
            if (response.ok) {
                const responseData = await response.json();

                resultElement.textContent = JSON.stringify(responseData, null, 2);
                document.buttons.appendChild(resultElement);

                console.log('Response Data: ', responseData);
            } else {
                console.error('ErroR:', response.status);
            }
        } catch (error) {
            console.error('ErrOR:', error);
        }

    });


    const textbox1 = document.getElementById("textbox1")
    const textbox2 = document.getElementById("textbox2")

    // Load saved values from storage when the popup is opened
    chrome.storage.sync.get(['textbox1', 'textbox2'], (items) => {
        if (items.textbox1) {
            textbox1.value = items.textbox1;
        }
        if (items.textbox2) {
            textbox2.value = items.textbox2;
        }
    });

    // Save textbox values to storage when they change
    textbox1.addEventListener('input', () => {
        chrome.storage.sync.set({ 'textbox1': textbox1.value });
    });

    textbox2.addEventListener('input', () => {
        chrome.storage.sync.set({ 'textbox2': textbox2.value });
    });


    

})


