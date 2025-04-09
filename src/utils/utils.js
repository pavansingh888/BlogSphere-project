export function replacePreviewWithView(url) {
    return url.replace('/preview', '/view');
}

export const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() })) // Assign random sort values
      .sort((a, b) => a.sort - b.sort) // Sort by random values
      .map(({ item }) => item); // Extract shuffled items
  };