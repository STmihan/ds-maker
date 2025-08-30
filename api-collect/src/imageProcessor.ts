import axios from "axios";
import {promises as fs} from "node:fs";
import * as path from "node:path";
import {createHash} from "node:crypto";
import {createWriteStream} from "node:fs";

function hashUrl(u: string): string {
    return createHash("sha256").update(u).digest("hex");
}

function extFromUrl(u: string): string {
    const parsed = new URL(u);
    const pathname = parsed.pathname;
    const lastDotIndex = pathname.lastIndexOf('.');
    if (lastDotIndex === -1) return '';
    return pathname.substring(lastDotIndex);
}

async function download(url: string, outputFolder: string): Promise<string> {
    const filename = hashUrl(url);
    const ext = extFromUrl(url);
    const fullFilename = `${filename}${ext}`;
    const fullPath = path.join(outputFolder, fullFilename);
    await fs.mkdir(outputFolder, {recursive: true});
    if (await fs.stat(fullFilename).then(() => true).catch(() => false)) {
        return fullFilename;
    }
    
    const response = await axios.get(url, {responseType: "stream"});
    const writer = createWriteStream(fullPath);
    await new Promise((resolve, reject) => {
        response.data.pipe(writer);
        writer.on("finish", () => resolve(undefined));
        writer.on("error", reject);
    });

    return fullFilename;
}

export async function processImages(profileEffects: any, avatarDecorations: any, nameplates: any) {
    const imagesToProcess = [];

    for (const config of profileEffects.profile_effect_configs) {
        imagesToProcess.push(config.thumbnailPreviewSrc);
        imagesToProcess.push(config.reducedMotionSrc)
        if (config.staticFrameSrc) {
            imagesToProcess.push(config.staticFrameSrc)
        }
        for (const effect of config.effects) {
            imagesToProcess.push(effect.src)
            if (effect.randomizedSources) {
                for (const rand of effect.randomizedSources) {
                    imagesToProcess.push(rand.src)
                }
            }
        }
    }
    
    for (const config of avatarDecorations.avatar_decoration_configs) {
        const url = `https://cdn.discordapp.com/avatar-decoration-presets/${config.asset}.png?size=160`;
        imagesToProcess.push(url);
    }
    
    for (const config of nameplates.nameplate_configs) {
        const assetUrl = `https://cdn.discordapp.com/assets/collectibles/${config.asset}asset.webm`;
        imagesToProcess.push(assetUrl);
        const staticUrl = `https://cdn.discordapp.com/assets/collectibles/${config.asset}static.png`;
        imagesToProcess.push(staticUrl);
    }

    const imagesMap = {}
    for (const img of imagesToProcess) {
        try {
            const path = await download(img, "../public/images");
            imagesMap[img] = path;
            console.log("Downloaded image:", img, "to", path);
        } catch (e) {
            console.error("Failed to download image:", img, e.message);
        }
    }

    return imagesMap;
}