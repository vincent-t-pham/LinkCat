// popup.js

//  CODE STRUCTURE  //
//  querySelect: Find elements (querySelect) existing in the HTML document
//  addEventListener: Function implementation of user buttons
//      addButton
//      removeButton
//      generateLinkButton

document.addEventListener("DOMContentLoaded", function(){

    // Hide the loading screen // lambdas
    setTimeout(function() {
        // Code to be executed after the delay
        const loadingScreen = document.querySelector(".loading-screen");
        loadingScreen.style.display = "none";
    }, 350);

    // uniform quote styling
    const addButton = document.querySelector("#test-button");
    const removeButton = document.querySelector("#remove-button");
    const generateLinkButton = document.querySelector("#submit");
    const textboxContainer = document.getElementById("textboxContainer");
    const buttonsContainer = document.getElementById("buttons");

    const resultElement = document.createElement('a');
    resultElement.id = 'result';



    chrome.storage.sync.get(null, (items) => {
        // Iterate through all stored items
        Object.keys(items).forEach((key) => {
            // Check if the key represents a textbox (e.g., 'textbox1')
            // Sorts by the first digit instead of value i.e [1, 10, 11, 2, 3, 4]
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

    //Additional link
    addButton.addEventListener("click", function(){
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

        // // Mark the textbox as added in storage
        // const data = {};
        // data[storageKey] = 'sub';
        // chrome.storage.sync.set(data);

        // Add an event listener to the new textbox
        newInput.addEventListener('input', () => {
            // Save the value of the new textbox to storage
            const data = {};
            data[storageKey] = newInput.value;
            console.log(data[storageKey])
            chrome.storage.sync.set(data);
        });
            
        console.log("popup.js test");
    });

    removeButton.addEventListener("click", function() {
        chrome.storage.sync.get(null, function(items) {
            // Get all items from storage
          
            // Check if there are any items
            if (Object.keys(items).length > 0) {
              // Get the first key in the items
              const firstKey = Object.keys(items)[Object.keys(items).length-1];
          
              // Remove the item with the first key
              chrome.storage.sync.remove(firstKey, function() {
                console.log('Top item removed');
                chrome.runtime.reload();
              });
            } else {
              console.log('Storage is empty');
            }
          });
    })


    //POST to server button
    generateLinkButton.addEventListener("click", async function() {
        event.preventDefault();
        console.log("Trying to POST pressed");

        const dataToSend = {};

        // Could fail if index is out of order
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
                resultElement.textContent = resultElement.textContent.replace(/["']/g, '');
                resultElement.href = resultElement.textContent

                buttonsContainer.prepend(resultElement);

                console.log('Response Data: ', responseData);
            } else {
                console.error('ErroR:', response.status);
            }
        } catch (error) {
            console.error('ErrOR:', error);
        }

    });

})


