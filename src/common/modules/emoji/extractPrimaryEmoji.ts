export function extractPrimaryEmoji(body: string): string {
  const emojis = body.match(/\p{Emoji_Presentation}/u);
  const emojisNoSharp = emojis?.filter((emoji) => !emoji.includes("#"));
  const emojisNoNumber = emojisNoSharp?.filter((emoji) => !emoji.match(/\d+/g));

  if (emojisNoNumber) {
    const emoji = emojisNoNumber[0];
    // convert to string
    if (!emoji) return "";
    return emoji.toString();
  }

  return "";
}
