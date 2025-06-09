# vscode-json-formatter-knd

A Visual Studio Code extension that formats JSON using `JSON.stringify()`. This extension allows users to customize the formatting of their JSON files with options for indentation, key order, and the ability to keep specific keys on one line.

## Features

- **Custom Indentation**: Choose between spaces or tabs for indentation.
- **Key Order**: Specify the order of JSON keys in the output.
- **Single Line Keys**: Define which JSON keys should be kept in one line for better readability.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/khoand7/vscode-json-formatter-knd.git
   ```
2. Navigate to the project directory:
   ```
   cd vscode-json-formatter-knd
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

1. Open a JSON file in Visual Studio Code.
2. Use the command palette (Ctrl+Shift+P or Cmd+Shift+P) and type `Format JSON`.
3. Configure the formatter settings in your `settings.json` file:
   ```json
   {
     "jsonFormatter.indentation": "  ", // or "\t" for tabs
     "jsonFormatter.keyOrder": ["key1", "key2", "key3"],
     "jsonFormatter.singleLineKeys": ["keyToKeepOnOneLine"]
   }
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.