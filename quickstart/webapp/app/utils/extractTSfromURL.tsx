export default function extractTimeStampFromUrl(url: string): string | null {
  const timestampMatch = url.match(/t=(\d+)/);
  return timestampMatch ? timestampMatch[1] : null;
}
