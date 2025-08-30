import fs from 'fs';
import {fetchAvatarDecorations, fetchCollectiblesCategories, fetchNameplates, fetchProfileEffects} from "./fetchData";
import {processImages} from "./imageProcessor";


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
        
        const imagesMap = await processImages(profileEffects, avatarDecorations, nameplates);
        fs.writeFileSync('../app/assets/images-map.json', JSON.stringify(imagesMap, null, 2), 'utf8');
        
        console.log("Data fetching and processing completed successfully.");
    } catch (e) {
        console.error("An error occurred while fetching data:", e.message);
        return;
    }
}

main().catch(error => {
    console.error("An unexpected error occurred:", error.message);
});