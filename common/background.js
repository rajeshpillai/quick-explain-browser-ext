chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "explainText",
    title: "Explain this text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "explainText") {
    const selectedText = info.selectionText;
    // Retrieve the API key from local storage
    chrome.storage.local.get(['openaiApiKey'], async (result) => {
      const apiKey = result.openaiApiKey;
      if (apiKey) {
        // Send the selected text to OpenAI API
        const explanation = await fetchExplanation(selectedText, apiKey);

        // Send a message to the content script to show the popup at the correct position
        console.log("About to send message to content scripts...");
        console.log("Current Tab.ID:", tab.id);
        chrome.tabs.sendMessage(tab.id, {
          action: "showExplanationPopup",
          explanation: explanation
        });
      } else {
        alert('Please set your OpenAI API key in the extension settings.');
      }
    });
  }
});

// Call OpenAI API to fetch explanation
async function fetchExplanation(text, apiKey) {
  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`  // Use the API key from local storage
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo-instruct",
      prompt: `Explain the following text: ${text}`,
      max_tokens: 1250
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim(); // Return the explanation
}
