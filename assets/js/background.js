// background.js

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    });
  });


chrome.runtime.onMessage.addListener (
    function (request, sender, sendResponse) {
        if (request.action == "initiateGenerateTextbox") {
            // generateTextbox(request.data.tab);
            injectedFunction();
        }
    }
)

function generateTextbox(tab) {
    chrome.scripting.executeScript({
        target: {tabId: tab.id}, 
        files:['assets/js/generateTextbox.js']
    });
}

function injectedFunction() {
    document.body.style.backgroundColor = 'blue';
    console.log("test");
}


