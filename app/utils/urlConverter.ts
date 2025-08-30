import imagesMap from '~/assets/images-map.json'

export function globalUrlToLocalPath(url: string): string {
    const baseUrl = (typeof useRuntimeConfig === 'function' ? useRuntimeConfig().app?.baseURL : '/');
    const local = (imagesMap as Record<string, string>)[url];
    if (local) {
        return `${baseUrl.replace(/\/$/, '')}/images/${local}`;
    }
    return url;
}
