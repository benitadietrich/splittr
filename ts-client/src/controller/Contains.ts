import { Contact } from "../model/Contact";

export function Contains(list: Contact[], entry: Contact): boolean {

    let contains: boolean = false;

    let templist = list.filter(item => item.id !== entry.id)

    if (
        (templist.find( contact => 
            contact.salutation === entry.salutation && 
            contact.title === entry.title && 
            contact.gender === entry.gender && 
            contact.firstname === entry.firstname && 
            contact.lastname === entry.lastname
        ) !== undefined)) {
        contains = true;
    }

    return contains;
}