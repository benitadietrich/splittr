import { Gender } from "./Gender";
import { Salutation } from "./Salutation";
import { Title } from "./Title";

export interface Contact{
    id?: string;
    salutation?: Salutation;
    title?: string;
    gender?: Gender;
    firstname?: string;
    lastname?: string;
    unformatted?: string;
    formatted?: string;
    language?: string;
}

// <th>Salutation</th>
// <th>Title</th>
// <th>Gender</th>
// <th>Firstname</th>
// <th>Lastname</th>
// <th>Language</th>
// <th>Unformatted</th>