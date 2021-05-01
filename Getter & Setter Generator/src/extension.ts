// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let getter_setter_generator = vscode.commands.registerCommand('getter-and-setter.generate', () => {
		// The code you place here will be executed every time your command is executed

		var editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
		var selection = editor.selection;
		var text = editor.document.getText(selection);
		var new_selection = new vscode.Position(
			selection.end.line + 1,
			selection.start.character - Number(editor.options.tabSize)
		);

		var tab_required = new_selection.character/Number(editor.options.tabSize);
		var tabs = "\t".repeat(tab_required);
        if (text.length < 1)
        {
            vscode.window.showErrorMessage('No selected properties.');
            return;
        }
        try 
        {
            var getterAndSetter = generateGetterAndSetter(text, tabs, true, true);
            editor.edit(
                edit => editor!.selections.forEach(
                  selection => 
                  {
                    edit.insert(new_selection, getterAndSetter);
                  }
                )
              );
            vscode.commands.executeCommand('editor.action.formatSelection');
        } 
        catch (error) 
        {
            console.log(error);
            vscode.window.showErrorMessage('Something Went Wrong');
        }
	});

	let setter_generator = vscode.commands.registerCommand('getter-and-setter.generate_setter', () => {
		// The code you place here will be executed every time your command is executed

		var editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
		var selection = editor.selection;
		var text = editor.document.getText(selection);
		var new_selection = new vscode.Position(
			selection.end.line + 1,
			selection.start.character - Number(editor.options.tabSize)
		);

		var tab_required = new_selection.character/Number(editor.options.tabSize);
		var tabs = "\t".repeat(tab_required);
        if (text.length < 1)
        {
            vscode.window.showErrorMessage('No selected properties.');
            return;
        }
        try 
        {
            var getterAndSetter = generateGetterAndSetter(text, tabs, true, false);
            editor.edit(
                edit => editor!.selections.forEach(
                  selection => 
                  {
                    edit.insert(new_selection, getterAndSetter);
                  }
                )
              );
            vscode.commands.executeCommand('editor.action.formatSelection');
        } 
        catch (error) 
        {
            console.log(error);
            vscode.window.showErrorMessage('Something Went Wrong');
        }
	});

	let getter_generator = vscode.commands.registerCommand('getter-and-setter.generate_getter', () => {
		// The code you place here will be executed every time your command is executed

		var editor = vscode.window.activeTextEditor;
        if (!editor)
            return;
		var selection = editor.selection;
		var text = editor.document.getText(selection);
		var new_selection = new vscode.Position(
			selection.end.line + 1,
			selection.start.character - Number(editor.options.tabSize)
		);

		var tab_required = new_selection.character/Number(editor.options.tabSize);
		var tabs = "\t".repeat(tab_required);
        if (text.length < 1)
        {
            vscode.window.showErrorMessage('No selected properties.');
            return;
        }
        try 
        {
            var getterAndSetter = generateGetterAndSetter(text, tabs, false, true);
            editor.edit(
                edit => editor!.selections.forEach(
                  selection => 
                  {
                    edit.insert(new_selection, getterAndSetter);
                  }
                )
              );
            vscode.commands.executeCommand('editor.action.formatSelection');
        } 
        catch (error) 
        {
            console.log(error);
            vscode.window.showErrorMessage('Something Went Wrong');
        }
	});


	context.subscriptions.push(getter_setter_generator);
	context.subscriptions.push(setter_generator);
	context.subscriptions.push(getter_generator);
}

function generateGetterAndSetter(text: String, tabs: String, setter: Boolean, getter: Boolean)
{
    var properties = text.split(/\r?\n/).map(x=>x.replace(" ", ""));
	var generatedCode = ``;
	
	for (let p of properties)
	{
		let word = p.split(".")[1].split("=")[0].replace(" ", "");
		let attribute, Attribute = "";
		if (word)
		{
			attribute = word;
			Attribute = (word.startsWith("_")) ? word.replace("_", "") : word;
			let setter_code = `\n\n${tabs}@${Attribute}.setter\n${tabs}def ${Attribute}(self, ${Attribute}):\n${tabs}\tself.${attribute} = ${Attribute}`;
			let getter_code = `\n\n${tabs}@property\n${tabs}def ${Attribute}(self):\n${tabs}\treturn self.${attribute}`;
			if (getter){
				generatedCode += getter_code;
			}
			if (setter){
				generatedCode += setter_code;
			}
		}
	}
    return generatedCode;
}


// this method is called when your extension is deactivated
export function deactivate() {}
