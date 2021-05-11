import { Gender } from "./Gender";
import { Salutation } from "./Salutation";
import { Title } from "./Title";

export interface Contact{
    id: string;
    salutation?: Salutation;
    title?: string;
    gender?: Gender;
    firstname?: string;
    lastname?: string;
    unformatted?: string;
    formatted?: string;
    language?: string;
}