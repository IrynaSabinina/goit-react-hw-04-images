export const mapper = images => {
  return images.map(({ id, webformatURL, largeImageURL, total }) => ({
    id,
    webformatURL,
    largeImageURL,
  }));
};
