export interface Nameplate {
    id: string;
    sku_id: string;
    asset: string;
    label: string;
    palette: string;
}

// TODO: fill in palette values
export const nameplatePaletteMap: {
    [key: string]: string;
} = {
    "default": "",
    "crimson": "",
    "cobalt": "",
    "berry": "",
    // background-image: linear-gradient(90deg, #00000000 -30%, #730BC8 200%)
    "violet": "linear-gradient(90deg, #00000000 -30%, #730BC8 200%)",
    "teal": "",
    "lemon": "",
    "forest": "",
    "bubble_gum": "",
    "sky": "",
    "clover": "",
} 
