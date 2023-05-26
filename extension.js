const vscode = require('vscode');
const suggestions = require('./ascii-values.json');

function activate(context) {
  let disposable = vscode.commands.registerTextEditorCommand('extension.suggestAsciiCodes', (textEditor) => {
    const selectedText = textEditor.document.getText(textEditor.selection);
    const suggestedAsciiCodes = [];

    for (let i = 0; i < selectedText.length; i++) {
      const character = selectedText[i];
      const asciiCode = suggestions[character];
      if (asciiCode !== undefined) {
        suggestedAsciiCodes.push({character,asciiCode});
      }
    
    if (suggestedAsciiCodes.length > 0) {
      vscode.window.showInformationMessage(
        'Suggested ASCII codes for the selected character:  ' +  asciiCode,
        ...suggestedAsciiCodes.map(code => String(code.asciiCode))).then((asciiCode) => {
          if (asciiCode) {
            const codeToCopy = asciiCode; // ASCII code to copy
            vscode.env.clipboard.writeText(codeToCopy.toString()); // Copy the ASCII code to the clipboard
            vscode.window.showInformationMessage('ASCII code copied to clipboard: ' + codeToCopy);
          }
        });
    } 
    else {
      vscode.window.showWarningMessage('No ASCII code suggestions found for the selected passage.');
    }
  }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};

     