import fs from 'fs';
import {fetchAvatarDecorations, fetchCollectiblesCategories, fetchNameplates, fetchProfileEffects} from "./fetchData";


async function main() {
    try {
        const categories = await fetchCollectiblesCategories();
        fs.writeFileSync('../app/assets/collectibles-categories.json', JSON.stringify(categories, null, 2), 'utf8');

        const profileEffects = await fetchProfileEffects();
        fs.writeFileSync('../app/assets/profile-effects.json', JSON.stringify(profileEffects, null, 2), 'utf8');
        
        const avatarDecorations = await fetchAvatarDecorations(categories);
        fs.writeFileSync('../app/assets/avatar-decorations.json', JSON.stringify(avatarDecorations, null, 2), 'utf8');
        
        const nameplates = await fetchNameplates(categories);
        fs.writeFileSync('../app/assets/nameplates.json', JSON.stringify(nameplates, null, 2), 'utf8');
    } catch (e) {
        console.error("An error occurred while fetching data:", e.message);
        return;
    }
}

main().catch(error => {
    console.error("An unexpected error occurred:", error.message);
});