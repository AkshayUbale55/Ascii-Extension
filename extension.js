
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
        suggestedAsciiCodes.push(asciiCode);
      }
    }

    if (suggestedAsciiCodes.length > 0) {
      vscode.window.showInformationMessage(
        'Suggested ASCII codes for the selected passage:',
        ...suggestedAsciiCodes.map(code => String(code))
      );
    } else {
      vscode.window.showWarningMessage('No ASCII code suggestions found for the selected passage.');
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};

      // const items = suggestedAsciiCodes.map(({character,asciiCode}) => ({
      //   label : character,
      //   description: `ASCII code: ${asciiCode}`,
      //   detail: 'Click to insert',
      // }));
    //   vscode.window.showQuickPick(items).then(item => {
    //     if (item) {
    //       const { character } = suggestedAsciiCodes.find(obj => obj.character === item.description);
    //       const currentPosition = textEditor.selection.active;
    //       edit.insert(currentPosition,character);
    //     }
    //   });