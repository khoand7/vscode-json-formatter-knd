import type { FormatterConfig } from './types';

/**
 * Formats a JSON object according to the specified configuration.
 * 
 * @param input - The JSON object to format.
 * @param config - The configuration for formatting.
 * @returns A formatted JSON string.
 */
function formatJson(input: string, config: FormatterConfig): string {
    const { indentation, keyOrder, keysInOneLine } = config;

    const indentStr = indentation === 'tabs' ? '\t' : ' '.repeat(typeof indentation === 'number' ? indentation : 2);

    let jsonString: string;

    if (keyOrder && Array.isArray(keyOrder)) {
        let parsedJson: Record<string, any> = JSON.parse(input);
        let orderedJson: Map<string, any> = new Map();
        // Add keys in the specified order
        keyOrder.forEach(key => {
            if (Object.prototype.hasOwnProperty.call(parsedJson, key)) {
                orderedJson.set(key, parsedJson[key]);
                delete parsedJson[key];
            }
        });
        // Add any remaining keys that were not specified in keyOrder
        Object.keys(parsedJson).forEach(key => {
            orderedJson.set(key, parsedJson[key]);
        });
        jsonString = JSON.stringify(Object.fromEntries(orderedJson), null, indentStr);
    }else{
        jsonString = JSON.stringify(input, null, indentStr);
    }

    if (!keyOrder || !Array.isArray(keyOrder) || keyOrder.length === 0) {
        // If no keyOrder is specified, we can just return the JSON string with indentation
        return jsonString;
    }

    // Split the JSON string into lines
    const lines = jsonString.split('\n');

    const pairOfKeys: string[][] = [];
    // Split keysInOneLine to have 2 keys in each element separated by a comma and store them to pairOfKeys
    if (Array.isArray(keysInOneLine)) {
        keysInOneLine.forEach(key => {
            if (typeof key === 'string' && key.includes(',')) {
                const keys = key.split(',').map(k => k.trim());
                if (keys.length === 2) {
                    pairOfKeys.push(keys);
                }
            }
        });
    }
    // Handle pairs of keys in one line
    if (pairOfKeys.length > 0) {
        for (let index = 0; index < lines.length - 1; index++) {
            const line = lines[index];
            const nextLine = lines[index + 1];
            pairOfKeys.forEach(pair => {
            const key1 = `"${pair[0]}":`;
            const key2 = `"${pair[1]}":`;
            if (line.includes(key1) && nextLine.trim().startsWith(key2)) {
                // Merge the two lines for this pair of keys
                lines[index] = line.replace(/\r?\n$/, '') + ' ' + nextLine.trim();
                lines.splice(index + 1, 1);
                // Adjust index to re-check the merged line
                index--;
            }
            });
        }
    }

    // Join the lines back into a single string with the specified indentation
    jsonString = lines.join('\n');

    return jsonString;
}

export { formatJson };