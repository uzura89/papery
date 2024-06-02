export function toggleCheckboxInBody(
  body: string,
  startOfline: number,
  endOfLine: number
) {
  const thisLine = body.slice(startOfline, endOfLine);
  const newLine = toggleCheckboxInLine(thisLine);

  return body.slice(0, startOfline) + newLine + body.slice(endOfLine);
}

function toggleCheckboxInLine(line: string) {
  const checkedText = "[x]";
  const uncheckedText = "[ ]";
  const checkedRegex = /\[x\]/g;
  const uncheckedRegex = /\[\s*\]/g;

  if (checkedRegex.test(line)) {
    return line.replace(checkedRegex, uncheckedText);
  } else if (uncheckedRegex.test(line)) {
    return line.replace(uncheckedRegex, checkedText);
  }

  return line;
}
