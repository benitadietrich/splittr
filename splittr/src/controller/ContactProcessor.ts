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
    let namePattern: RegExp = /([a-zA-Z]{2,}\s?[a-zA-Z]{1,})(\s)([a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?[a-zA-Z]{1,})?/;
    let simpleNamePattern: RegExp = /([A-Z][a-z]*[\s]?)/

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
      if (element.match(titlePattern)) {
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
    let rest : string = stringElements.join(' ');
    let match: RegExpMatchArray|null = rest.match(namePattern);

    //if match length for look if its a simple name or last name
    if(match?.length===4 && rest.match(simpleNamePattern)){
      //first and last name
      contact.firstname = match[1];
      contact.lastname = match[3];
    } else if(match?.length===4){
      //last name with prefix
      contact.lastname = match[1].concat(" ").concat(match[3]);
    } else if(stringElements.length=1){
      //Only last name left
      contact.lastname = stringElements[0];
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
