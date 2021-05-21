import { db, fb } from "../backend/firebase";
import { Contact } from "../model/Contact";
import { DataProcessor } from "../model/DataProcessor";
import { Gender } from "../model/Gender";
import { Language } from "../model/Language";
import { Salutation } from "../model/Salutation";
import { Title } from "../model/Title";

class ContactProcessor implements DataProcessor {
  async convert(str: string): Promise<Contact | undefined> {
    let salutations: Salutation[] = await this.getSalutations();
    let titles: Title[] = await this.getTitles();
    let contact: Contact = {};
    let stringElements: string[] = str.split(" ");
    let titlePattern: RegExp = /(([\w]+[.]))/;
    let namePattern: RegExp =
      /([a-zA-Z|ä|ö|ü]{2,})*([a-zA-Z|ä|ö|ü]{1,3}'?-?[a-zA-Z|ä|ö|ü]{2,})?(\s?[a-zA-Z|ä|ö|ü]{1,}'?-?[a-zA-Z|ä|ö|ü]{2,})?/;

    //Set default gender
    contact.gender = Gender.Other;

    //Extract salutation
    salutations.forEach((salutation) => {
      if (
        stringElements.find(
          (element) => salutation.value.toLowerCase() === element.toLowerCase()
        )
      ) {
        contact.gender = salutation.gender;
        contact.salutation = salutation;
        contact.language = salutation.lang;

        //remove the salutation from the string elements to reduce search time for future functions
        stringElements.splice(
          stringElements.indexOf(contact.salutation.value),
          1
        );
      }
    });

    //Extract titles
    let titleString: string[] = [];
    stringElements.forEach((element) => {
      if (
        element.match(titlePattern) ||
        titles.find((title) => title.value === element)
      ) {
        titleString.push(element);
      }
    });

    //Remove all titles from the title string array
    stringElements = stringElements.filter(
      (element) => !titleString.includes(element)
    );

    //Set the contacts title
    if (titleString.length !== 0 && !titleString.includes("")) {
      //Store titles to string
      let title: string = titleString.join(" ");

      //Set contact tilte
      contact.title = title;

      //Store the title to firebase if its a new one
      let newTitle: Title = {
        value: title,
        lang: contact.language ? contact.language : Language.DE,
      };

      if (
        !titles.find((title) => title.value === newTitle.value) &&
        title !== ""
      ) {
        await db.collection("title").add(newTitle);
      }
    }

    //Extract the first and lastname
    let rest: string = stringElements.join(" ");
    let match: RegExpMatchArray | null = rest.match(namePattern);
    console.log("match", match)

    //if match length for look if its a simple name or last name
    if (stringElements.length === 1 || match?.length === 1) {
      //Only last name left
      contact.lastname = stringElements.join("");
    } else if (match && !match.input?.includes(",")) {
      //Object with index 1 is always first name
      contact.firstname = match[1];
      contact.lastname = match
        .splice(2, match.length - 1)
        .filter((element) => element !== undefined)
        .join("");

      //validate everything because of problems when lastnames have several whitespaces
      if(contact.firstname.concat(" ").concat(contact.lastname) !== match.input){
        contact.lastname = stringElements.slice(1,stringElements.length).join(" ")
      }
    } else {
      //Look if last name after first name
      if (stringElements[0].includes(",")) {
        contact.lastname = stringElements[0];
        contact.firstname = stringElements[1];
      } else if (stringElements[1].includes(",")) {
        contact.lastname = stringElements[0]
          .concat(" ")
          .concat(stringElements[1]);
        contact.firstname = stringElements[1];
      } else {
        contact.firstname = stringElements[0];
        contact.lastname = rest;
      }

      //Replace commas
      contact.lastname = contact.lastname.replace(",", "");
    }

    return contact;
  }

  async getSalutations(): Promise<Salutation[]> {
    let salutations: Salutation[] = [];

    //Get all salutation
    let docs = await db.collection("salutation").get();
    docs.forEach((doc: any) => salutations.push(doc.data()));

    return salutations;
  }

  async getTitles(): Promise<Title[]> {
    let titles: Title[] = [];

    //Get all titles
    let docs = await db.collection("title").get();
    docs.forEach((doc: any) => titles.push(doc.data()));

    return titles;
  }
}

export default ContactProcessor;
