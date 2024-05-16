
export default function convertToEmbedURL(url: string): string {
  // Extract video ID
  const videoIDMatch = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))((\w|-){11})/);
  const videoID = videoIDMatch ? videoIDMatch[1] : null;

  // Extract timestamp
  const timestampMatch = url.match(/t=(\d+)/);
  const timestamp = timestampMatch ? timestampMatch[1] : null;

  if (videoID) {
    let embedURL = `https://www.youtube.com/embed/${videoID}`;
    if (timestamp) {
      embedURL += `?start=${timestamp}`;
    }
    return embedURL;
  } else {
    return url; // Return original URL if not a YouTube video link or if the format is unrecognized
  }
};
