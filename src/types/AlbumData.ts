import {Song} from "./Song.ts";

export interface AlbumData {
    title: string;
    label: string;
    date: string;
    cover: string;
    heightCover : string;
    songs: Song[];
}

