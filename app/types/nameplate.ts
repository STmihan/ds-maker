export interface Nameplate {
    id: string;
    sku_id: string;
    asset: string;
    label: string;
    palette: string;
}

// TODO: fill in palette with right values
export const nameplatePaletteMap: {
    [key: string]: string;
} = {
    crimson: "linear-gradient(90deg, #0000 -30%, #ED4245 200%)",
    cobalt: "linear-gradient(90deg, #0000 -30%, #1D4ED8 200%)",
    berry: "linear-gradient(90deg, #0000 -30%, #EB459E 200%)",
    violet: "linear-gradient(90deg, #0000 -30%, #730BC8 200%)",
    teal: "linear-gradient(90deg, #0000 -30%, #00AFA1 200%)",
    lemon: "linear-gradient(90deg, #0000 -30%, #FEE75C 200%)",
    forest: "linear-gradient(90deg, #0000 -30%, #2F855A 200%)",
    bubble_gum: "linear-gradient(90deg, #0000 -30%, #FF73FA 200%)",
    sky: "linear-gradient(90deg, #0000 -30%, #00B0F4 200%)",
    clover: "linear-gradient(90deg, #0000 -30%, #57F287 200%)",
} 
