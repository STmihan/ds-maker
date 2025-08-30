import imagesMap from '~/assets/images-map.json'

export function globalUrlToLocalPath(url: string): string {
    const imageName = (imagesMap as Record<string, string>)[url];
    if (imageName) {
        return `/images/${imageName}`;
    }
    return url;
}
