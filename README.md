# Quick Explain AI Extension

This browser extension allows users to select text on any webpage and quickly get an explanation for the selected text using OpenAI's API. The extension works in both Google Chrome and Mozilla Firefox.
Features

    Right-click on any selected text to get an explanation using the OpenAI API.
    Supports both Chrome and Firefox.
    Easy API key management via the extension's options page.

# Installation
## For Chrome:

    Clone the repository or download the ZIP file.

    ```git clone https://github.com/your-repo/quick-explain-ai.git

    Open Chrome and navigate to chrome://extensions/.

    Enable Developer mode by toggling the switch in the top right corner.

    Click on Load unpacked and select the root folder of the project.

    The extension will now be installed, and you can see the icon in the browser's toolbar.

## For Firefox:

    Clone the repository or download the ZIP file.

    ```git clone https://github.com/rajeshpillai/quick-explain-browser-ext

    Open Firefox and navigate to about:debugging#/runtime/this-firefox.

    Click on Load Temporary Add-on and select the manifest.json file inside the root folder of the project.

    The extension will be temporarily installed. To install it permanently, package it as an .xpi file and submit it to Mozilla Add-ons (AMO).

# Usage
Setting the OpenAI API Key:
Chrome:

    Right-click on the extension icon in the toolbar and select Options.
    Enter your OpenAI API key and click Save.

Firefox:

    Navigate to the Add-ons Manager by typing about:addons in the address bar.
    Locate the Quick Explain AI extension and click on Preferences.
    Enter your OpenAI API key and click Save.

# Getting an Explanation:

    Select any text on a webpage.
    Right-click on the selected text and choose Explain this text from the context menu.
    The explanation will appear in a small popup on the screen.

# Development Setup

To set up the project for development:
Prerequisites:

    Node.js and npm installed on your system.
    Gulp for building the project.

# Install Dependencies:

```npm install

Build the Extension:

The following tasks will clean the dist/ directory, copy necessary files for Chrome and Firefox, and package the extension as .zip files.


```npm run build

This will:

    Clean the dist/ folder.
    Copy the common and browser-specific files to dist/chrome/ and dist/firefox/.
    Package the extensions into chrome-extension.zip and firefox-extension.zip inside the dist/ folder.

Available Gulp Tasks:

    ```
    npm run build: Clean the dist folder and build the extensions for both Chrome and Firefox.
    npm run clean: Clean the dist folder.
    ```