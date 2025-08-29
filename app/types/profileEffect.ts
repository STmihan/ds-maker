export enum ProfileEffectAnimationType {
    Static = 1,
    Looping = 2,
}

export interface ProfileAnimationEffect {
    src: string;
    loop: boolean;
    height: number;
    width: number;
    duration: number;
    start: number;
    loopDelay: number;
    position: { x: number; y: number };
    zIndex: number;
    randomizedSources: { src: string }[];
}

export interface ProfileEffect {
    id: string;
    sku_id: string;
    title: string;
    description: string;
    accessibilityLabel: string;
    animationType: ProfileEffectAnimationType;
    staticFrameSrc: string;
    thumbnailPreviewSrc: string;
    reducedMotionSrc: string;
    effects: ProfileAnimationEffect[];
}
