import type {AvatarDecoration} from "~/types/avatarDecoration";
import type {ProfileEffect} from "~/types/profileEffect";
import type {Nameplate} from "~/types/nameplate";
import type {ServerTag} from "~/types/serverTag";

export interface Profile {
    username: string;
    displayName: string;
    pronouns: string;
    
    avatar: string;
    profileBanner: string;
    
    profileThemePrimary: string;
    profileThemeAccent: string;
    
    aboutMe: string;
    
    serverTag: ServerTag | null;
    
    avatarDecoration: AvatarDecoration | null;
    profileEffect: ProfileEffect | null;
    nameplate: Nameplate | null;
}