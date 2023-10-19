// background.js

chrome.runtime.onMessage.addListener (
    function (request, sender, sendResponse) {
        if (request.action == "initiateGenerateTextbox") {
            // generateTextbox(request.data.tab);
            console.log("Detected initiateGenerateTextbox")
            
            chrome.scripting.executeScript({
                target: {tabId: sender.tab.id},
                function: ['content.js']
            });
        }
    } 
)

console.log("background loaded")