import html2canvas from 'html2canvas';
import GIF from 'gif.js';
import gifWorker from 'gif.js/dist/gif.worker.js?url';

const defaultOptions = {
    selector: '#render-content',
    durationMs: 5000,
    fps: 5
};

export async function generateProfileGif(
    options: typeof defaultOptions = defaultOptions
) {
    const el = document.querySelector(options.selector) as HTMLElement;
    if (!el) {
        alert('Element not found: ' + options.selector);
        return;
    }
    
    const frames = options.durationMs / 1000 * options.fps;
    const gif = new GIF({
        workers: 2,
        quality: 10,
        width: el.offsetWidth,
        height: el.offsetHeight,
        workerScript: gifWorker,
    });

    for (let i = 0; i < frames; i++) {
        const canvas = await html2canvas(el);
        gif.addFrame(canvas, {copy: true, delay: 1000 / options.fps});
        await new Promise(r => setTimeout(r, 1000 / options.fps));
    }
    
    gif.on('finished', function (blob: Blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'profile.gif';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
    
    gif.render();
}
