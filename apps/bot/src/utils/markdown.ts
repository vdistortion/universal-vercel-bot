const markdownV2SpecialCharacters = [
  '_',
  '*',
  '[',
  ']',
  '(',
  ')',
  '~',
  '`',
  '>',
  '#',
  '+',
  '-',
  '=',
  '|',
  '{',
  '}',
  '.',
  '!',
];

export function escapeMarkdownV2(text: string): string {
  let escapedText = text;
  for (const char of markdownV2SpecialCharacters) {
    escapedText = escapedText.split(char).join(`\\${char}`);
  }
  return escapedText;
}
