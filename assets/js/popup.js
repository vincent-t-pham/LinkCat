// popup.js

const myButton = document.querySelector("#test-button");

myButton.addEventListener("click", async () => {
    const response = await chrome.runtime.sendMessage({ action: "initiateGenerateTextbox" });
    console.log("popup.js test");
});

console.log("popup.js test");