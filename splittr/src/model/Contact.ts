import { Gender } from "./Gender";
import { Salutation } from "./Salutation";

export interface Contact{
    id: string;
    salutation?: Salutation;
    title?: string;
    gender?: Gender;
    firstname?: string;
    lastname?: string;
    unformatted?: string;
}