export function markdownToHtml(markdown: string): string {
  const richTextDescription: string = markdown.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
  const textByParagraphs: string[] = richTextDescription.split("\n");
  const htmlByParagraphs: string = textByParagraphs.map(t => "<p>" + t + "</p>").join("");

  return htmlByParagraphs;
}