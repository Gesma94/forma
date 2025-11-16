export function getImageAltText(image: { altText?: string }): string {
  return image.altText ?? 'Forma Artwork';
}
