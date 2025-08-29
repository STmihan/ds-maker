import axios from "axios";

const shopOrigin: string = "https://yapper.shop";
const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Origin": shopOrigin,
    "Referer": shopOrigin
};

export async function fetchCollectiblesCategories() {
    const url = "https://api.yapper.shop/v3/discord-collectibles-categories";

    const response = await axios.get(url, {headers});
    return response.data;
}

export async function fetchProfileEffects() {
    const url = "https://api.yapper.shop/v3/discord-profile-effects";
    const response = await axios.get(url, {headers});
    return response.data;
}

export async function fetchNameplates(categories: any[]) {
    const nameplates = [];
    const nameplatePalettes = [];
    for (let category of categories) {
        for (const product of category.products) {
            for (const item of product.items) {
                if (item.type === 2) {
                    nameplates.push(item);
                    nameplatePalettes.push(item.palette);
                }
            }
        }
    }

    return {
        "nameplate_configs": nameplates.filter((item, index, self) => index === self.findIndex((t) => t.id === item.id)),
        "palettes": [...new Set(nameplatePalettes)]
    };
}


export async function fetchAvatarDecorations(categories: any[]) {
    const avatarDecorations = [];
    for (let category of categories) {
        for (const product of category.products) {
            for (const item of product.items) {
                if (item.type === 0) {
                    avatarDecorations.push(item);
                }
            }
        }
    }

    return {
        "avatar_decoration_configs": avatarDecorations.filter((item, index, self) => index === self.findIndex((t) => t.id === item.id))
    };
}

