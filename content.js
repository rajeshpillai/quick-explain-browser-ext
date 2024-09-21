let mouseX = 0;
let mouseY = 0;

// Capture mouse coordinates on right-click
document.addEventListener('contextmenu', (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;
});

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showExplanationPopup") {
    const explanation = request.explanation;

    // Remove any existing popup
    const existingPopup = document.getElementById('explanation-popup');
    if (existingPopup) {
      existingPopup.remove();
    }

    // Create the popup div
    const popup = document.createElement("div");
    popup.id = 'explanation-popup';
    popup.style.position = "absolute";
    popup.style.left = `${mouseX + 10}px`;  // Offset from the pointer
    popup.style.top = `${mouseY + 10}px`;   // Offset from the pointer
    popup.style.backgroundColor = "white";
    popup.style.border = "1px solid #000";
    popup.style.padding = "10px";
    popup.style.zIndex = 10000;
    popup.style.width = "300px";
    popup.style.maxHeight = "200px";  // Limit height
    popup.style.overflowY = "auto";   // Enable scroll bar if content overflows
    popup.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.1)";

    // Add close button
    const closeButton = document.createElement("span");
    closeButton.innerHTML = "&times;";
    closeButton.style.position = "absolute";
    closeButton.style.top = "5px";
    closeButton.style.right = "10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "16px";
    closeButton.style.fontWeight = "bold";
    closeButton.onclick = function() {
      popup.remove();
    };

    // Add explanation content
    const content = document.createElement("div");
    content.innerText = explanation;

    // Append content and close button to the popup
    popup.appendChild(closeButton);
    popup.appendChild(content);

    // Append popup to the body
    document.body.appendChild(popup);
  }
});
