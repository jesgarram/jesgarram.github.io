export function slug(id: string) {
  return id.replace(/\/index\.md$/, '').replace(/\.md$/, '');
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function readingTime(body: string | undefined) {
  const words = body ? body.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 230));
}
