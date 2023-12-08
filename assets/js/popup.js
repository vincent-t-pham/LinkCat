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



    chrome.storage.sync.get(null, (items) => {
        // Iterate through all stored items
        Object.keys(items).forEach((key) => {
            // Check if the key represents a textbox (e.g., 'textbox1')
            if (key.startsWith('textbox')) {
                // Extract the index from the key
                const index = parseInt(key.replace('textbox', ''), 10);
                console.log(index)

                // Create the corresponding textbox
                const newLabel = document.createElement('label');
                newLabel.setAttribute('for', 'textbox' + index);
                newLabel.textContent = 'Link ' + index + ':';

                const newInput = document.createElement('input');
                newInput.setAttribute('type', 'text');
                newInput.setAttribute('id', 'textbox' + index);
                newInput.setAttribute('name', 'textbox' + index);

                const lineBreak = document.createElement('br');

                textboxContainer.appendChild(newLabel);
                textboxContainer.appendChild(newInput);
                textboxContainer.appendChild(lineBreak);

                // Set the value of the textbox based on the stored data
                newInput.value = items[key];
            }
        });
    });


    myButton.addEventListener("click", function(){
        // var div = document.getElementsByTagName("body")[0].style.backgroundColor = "aqua";
        const textBoxCount = textboxContainer.childElementCount / 3 + 1;
        const storageKey = `textbox${textBoxCount}`;

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

        // Mark the textbox as added in storage
        const data = {};
        data[storageKey] = true;
        chrome.storage.sync.set(data);
        
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

    //         const dataToSend = {
//             textbox1: textboxValue1,
//             textbox2: textboxValue2,
//             key2: 'value2',
//          };

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
                document.body.appendChild(resultElement);

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
    const textbox3 = document.getElementById("textbox3")

    // const textbox1 = document.getElementById("textbox1")
    // const textbox2 = document.getElementById("textbox2")
    // const textbox1 = document.getElementById("textbox1")
    // const textbox2 = document.getElementById("textbox2")

    // Load saved values from storage when the popup is opened
    chrome.storage.sync.get(['textbox1', 'textbox2'], (items) => {
        if (items.textbox1) {
            textbox1.value = items.textbox1;
        }
        if (items.textbox2) {
            textbox2.value = items.textbox2;
        }
        if (items.textbox3) {
            textbox3.value = items.textbox3;
        }
    });

    // Save textbox values to storage when they change
    textbox1.addEventListener('input', () => {
        chrome.storage.sync.set({ 'textbox1': textbox1.value });
    });

    textbox2.addEventListener('input', () => {
        chrome.storage.sync.set({ 'textbox2': textbox2.value });
    });

    textbox3.addEventListener('input', () => {
        chrome.storage.sync.set({ 'textbox3': textbox3.value });
    });


    

})


