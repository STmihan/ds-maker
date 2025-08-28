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
