import * as vscode from 'vscode';
import { formatJson } from './formatter';
import { FormatterConfig } from './types';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('jsonFormatterKnd.formatJson', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const selection = editor.selection;
            const jsonText = document.getText(selection);

            // Get configuration and build formatterConfig
            const config = vscode.workspace.getConfiguration('jsonFormatterKnd');
            const formatterConfig: FormatterConfig = {
                indentation: config.get<'spaces' | 'tabs'>('indentation', 'spaces'),
                keyOrder: config.get<string[]>('keyOrder', []),
                keysInOneLine: config.get<string[]>('keysInOneLine', [])
            };

            // Format JSON
            const formattedJson = formatJson(jsonText, formatterConfig);

            editor.edit(editBuilder => {
                editBuilder.replace(selection, formattedJson);
            });
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}