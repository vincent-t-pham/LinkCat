// popup.js
document.addEventListener("DOMContentLoaded", function(){
    const myButton = document.querySelector("#test-button");
    const generateLink = document.querySelector("#submit");

    myButton.addEventListener("click", function(){
        var div = document.getElementsByTagName("body")[0].style.backgroundColor = "aqua";
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
                console.log('Response Data: ', responseData);
            } else {
                console.error('ErroR:', response.status);
            }
        } catch (error) {
            console.error('ErrOR:', error);
        }
    });

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


