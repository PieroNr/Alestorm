import {Song} from "./Song.ts";

export interface AlbumData {
    title: string;
    label: string;
    date: string;
    cover: string;
    songs: Song[];
}

