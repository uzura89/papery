export function extractTagsFromBody(body: string): string[] {
  const tags = body.match(/#[^\s^\.#]+/g) || [];
  const uniqueTags = Array.from(new Set(tags));
  return uniqueTags.map((tag) => tag.replace("#", ""));
}
