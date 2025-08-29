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
    crimson:    "linear-gradient(90deg, #0000 -30%, #ED4245 200%)", // красный
    cobalt:     "linear-gradient(90deg, #0000 -30%, #1D4ED8 200%)", // глубокий синий
    berry:      "linear-gradient(90deg, #0000 -30%, #EB459E 200%)", // розово-фуксия
    violet:     "linear-gradient(90deg, #0000 -30%, #730BC8 200%)", // как у тебя
    teal:       "linear-gradient(90deg, #0000 -30%, #00AFA1 200%)", // бирюзовый
    lemon:      "linear-gradient(90deg, #0000 -30%, #FEE75C 200%)", // жёлтый
    forest:     "linear-gradient(90deg, #0000 -30%, #2F855A 200%)", // тёмно-зелёный
    bubble_gum: "linear-gradient(90deg, #0000 -30%, #FF73FA 200%)", // «жвачка»
    sky:        "linear-gradient(90deg, #0000 -30%, #00B0F4 200%)", // небесно-голубой
    clover:     "linear-gradient(90deg, #0000 -30%, #57F287 200%)", // ярко-зелёный
} 
