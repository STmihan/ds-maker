import imagesMap from '~/assets/images-map.json'

export function globalUrlToLocalPath(url: string): string {
    return `/images/${(imagesMap as Record<string, string>)[url]}` || url;
}
