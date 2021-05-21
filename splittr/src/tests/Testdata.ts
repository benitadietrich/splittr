import { Contact } from "../model/Contact";
import { Gender } from "../model/Gender";
import { Language } from "../model/Language";

export const uniqueEntry: Contact = {
    id: "id3",
    salutation: {
        id: "id4",
        gender: Gender.Female,
        value: "Senor",
        lang: Language.EN,
    },
    title: "Dr.",
    gender: Gender.Female,
    firstname: "Benita",
    lastname: "Espanol",
    language: Language.ES,
}

export const nonUniqueEntry: Contact = {
    id: "id1",
    salutation: {
        id: "id2",
        gender: Gender.Male,
        value: "Herr",
        lang: Language.DE,
    },
    title: "Dr.",
    gender: Gender.Male,
    firstname: "Paul",
    lastname: "Finkbeiner",
    language: Language.DE,
}

export const entrys: Contact[] = [
    {
        id: "id1",
        salutation: {
            id: "id2",
            gender: Gender.Male,
            value: "Herr",
            lang: Language.DE,
        },
        title: "Dr.",
        gender: Gender.Male,
        firstname: "Paul",
        lastname: "Finkbeiner",
        language: Language.DE,
    },
    {
        id: "id5",
        salutation: {
            id: "id6",
            gender: Gender.Female,
            value: "Herr",
            lang: Language.DE,
        },
        title: "Professor",
        gender: Gender.Male,
        firstname: "Max",
        lastname: "Finkbeiner",
        language: Language.DE,
    }
]