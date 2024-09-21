document.getElementById('save').addEventListener('click', () => {
  const apiKey = document.getElementById('apiKey').value;

  // Save the API key to local storage
  chrome.storage.local.set({ openaiApiKey: apiKey }, () => {
    document.getElementById('status').innerText = 'API Key saved!';
    setTimeout(() => {
      document.getElementById('status').innerText = '';
    }, 2000);
  });
});

// Load the saved API key when the options page is opened
chrome.storage.local.get(['openaiApiKey'], (result) => {
  if (result.openaiApiKey) {
    document.getElementById('apiKey').value = result.openaiApiKey;
  }
});
