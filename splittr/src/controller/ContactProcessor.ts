import { db, fb } from "../backend/firebase";
import { Contact } from "../model/Contact";
import { DataProcessor } from "../model/DataProcessor";
import { Gender } from "../model/Gender";
import { Salutation } from "../model/Salutation";
import { Title } from "../model/Title";

class ContactProcessor implements DataProcessor {
  async convert(str: string): Promise<Contact | undefined> {
    let salutations: Salutation[] = await this.getSalutations();
    let titles: Title[] = await this.getTitles();
    let contact: Contact = { id: "aha" };
    let stringElements: string[] = str.split(" ");

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

        //remove the salutation from the string elements to reduce search time for future functions
        stringElements.splice(stringElements.indexOf(contact.salutation.value),1);
      }
    });

    //Extract titles
    let titleString: string = "";
    stringElements.forEach((element) => {
      //Add all found title elements to the string
      let match: Title | undefined = titles.find(
        (title) => element.toLowerCase() === title.value.toLowerCase()
      );

      titleString = titleString.concat(match === undefined ? "" : match.value);

      //remove the title from the string elements
      if (match?.value !== undefined) {
        stringElements.splice(stringElements.indexOf(match?.value),1);
      }
    });

    console.log("title", titleString)

    //Add a space between dots to beautify
    titleString = titleString.replace(".", ". ");

    //Set the contacts title
    contact.title = titleString === "" ? undefined : titleString;

    titles.forEach((title) => {
      if (str.toLowerCase().includes(title.value.toLowerCase())) {
      }
    });

    //Extract the first and lastname
    if (stringElements.length === 1) {
      contact.lastname = stringElements[0];
    } else {
      contact.firstname = stringElements[0];
      contact.lastname = stringElements[1];
    }

    console.log("contact", contact);

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
