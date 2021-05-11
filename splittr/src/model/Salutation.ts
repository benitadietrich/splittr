import { Gender } from "./Gender";

export interface Salutation{
    id: string;
    gender: Gender;
    value: string;
    lang: string;
}