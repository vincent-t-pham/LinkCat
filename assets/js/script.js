
let selectGenerateTextbox = document.getElementById("select-generate-textbox");

console.log("test")
selectGenerateTextbox.addEventListener("click", () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }), function (tabs) {
        chrome.runtime.sendMessage({ action: "initiateGenerateTextbox", data: tabs[0]}).then(() => {
            window.close();
        })
    }
})