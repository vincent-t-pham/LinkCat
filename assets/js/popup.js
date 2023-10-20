// popup.js
document.addEventListener("DOMContentLoaded", function(){
    const myButton = document.querySelector("#test-button");
    const generateLink = document.querySelector("#submit");
    const textboxContainer = document.getElementById("textboxContainer");

    const resultElement = document.createElement('p');
    resultElement.id = 'result';

    myButton.addEventListener("click", function(){
        // var div = document.getElementsByTagName("body")[0].style.backgroundColor = "aqua";

        const newLabel = document.createElement('label');
        newLabel.setAttribute('for', 'textbox' + (textboxContainer.childElementCount / 2 + 1));
        newLabel.textContent = 'Textbox ' + (textboxContainer.childElementCount / 2 + 1) + ':';
        // Create a new input element
        const newInput = document.createElement('input');
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('id', 'textbox' + (textboxContainer.childElementCount / 2 + 1));
        newInput.setAttribute('name', 'textbox' + (textboxContainer.childElementCount / 2 + 1));

        // Append the new label and input to the container
        textboxContainer.appendChild(newLabel);
        textboxContainer.appendChild(newInput);


        const newTextbox = document.createElement('');
        textboxContainer.appendChild()
        console.log("popup.js test");
    });

    generateLink.addEventListener("click", async function() {
        event.preventDefault();
        console.log("Trying to POST pressed");
    
        // new functionnnnnn so annoying
        const textbox1 = document.getElementById("textbox1")
        const textboxValue1 = textbox1.value
        const textbox2 = document.getElementById("textbox2")
        const textboxValue2 = textbox2.value

        const dataToSend = {
            textbox1: textboxValue1,
            textbox2: textboxValue2,
            key2: 'value2',
        };
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
                document.body.appendChild(resultElement);

                console.log('Response Data: ', responseData);
            } else {
                console.error('ErroR:', response.status);
            }
        } catch (error) {
            console.error('ErrOR:', error);
        }

        

    });


    // const copyLink = document.getElementById('copyLink');

    // copyLink.addEventListener('click', function (e) {
    //     e.preventDefault(); // Prevent the link from navigating

    //     const urlToCopy = copyLink.href; // Get the URL from the link's href attribute

    //     // Create a temporary input element to hold the URL
    //     const tempInput = document.createElement('input');
    //     tempInput.value = urlToCopy;

    //     // Append the input to the document
    //     document.body.appendChild(tempInput);

    //     // Select the text in the input and copy it to the clipboard
    //     tempInput.select();
    //     document.execCommand('copy');

    //     // Remove the input from the document
    //     document.body.removeChild(tempInput);

    //     alert('URL copied to clipboard: ' + urlToCopy);
    // });


    // generateLink.addEventListener("click", function(){
    //     console.log("Trying to POST pressed");

    //     const dataToSend = {
    //         key1: 'value1',
    //         key2: 'value2',
    //       };

    //     const url = 'http://127.0.0.1:5000/endpoint'

    //     // const request = new Request(url, {
    //     //     method: 'POST',
    //     //     body:JSON,stringify()
    //     // })

    //     fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type:': 'application/json',
    //         },
    //         body: dataToSend,
    //     })
    //     .then((responseData) => {
    //         console.log('Response Data: ', responseData)
    //     })
    //     .catch((error) => {
    //         console.error('ErroR', error)
    //     })
    // })

    

})


