import type {AvatarDecoration} from "~/types/avatarDecoration";
import type {ProfileEffect} from "~/types/profileEffect";
import type {Nameplate} from "~/types/nameplate";

export interface Profile {
    username: string;
    displayName: string;
    pronouns: string;
    
    avatar: string;
    profileBanner: string;
    
    profileThemePrimary: string;
    profileThemeAccent: string;
    
    aboutMe: string;
    
    avatarDecoration: AvatarDecoration | null;
    profileEffect: ProfileEffect | null;
    nameplate: Nameplate | null;
}