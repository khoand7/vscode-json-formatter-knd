export type JsonKeyOrder = string[];

export interface FormatterConfig {
  indentation: 'spaces' | 'tabs';
  keyOrder: JsonKeyOrder;
  keysInOneLine: string[];
}
