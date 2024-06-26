export function formatLink(link?: string): string {
  if (!link) return '';
  if (link.includes('http')) {
    return link;
  }
  return `http://${link}`;
}
