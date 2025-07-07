// Simple Caesar cipher for demo (shifts chars by 3)
export function cipher(text) {
  return btoa(
    text
      .split('')
      .map((c) => String.fromCharCode(c.charCodeAt(0) + 3))
      .join('')
  );
}
export function decipher(text) {
  return atob(text)
    .split('')
    .map((c) => String.fromCharCode(c.charCodeAt(0) - 3))
    .join('');
}
