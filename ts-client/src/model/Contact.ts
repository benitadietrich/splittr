import { Gender } from "./Gender";

export interface Contact{
    id: string;
    salutation?: string;
    title?: string;
    gender?: Gender;
    firstname?: string;
    lastname?: string;
}