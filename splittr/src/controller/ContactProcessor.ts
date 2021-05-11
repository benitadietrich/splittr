import { db, fb } from "../backend/firebase";
import { Contact } from "../model/Contact";
import { DataProcessor } from "../model/DataProcessor";
import { Salutation } from "../model/Salutation";

class ContactProcessor implements DataProcessor {
  async convert(str: string): Promise<Contact | undefined> {
    let salutations: Salutation[] = [];
    let contact: Contact = {id: "aha"};

    //Get all salutation
    let docs = await db.collection("salutation").get();
    docs.forEach((doc: any) => salutations.push(doc.data()));

    //Extract salutation
    salutations.forEach((salutation) => {
      if (str.toLowerCase().match(salutation.value.toLowerCase())) {
        contact.gender = salutation.gender;
        contact.salutation = salutation;
      }
    });

    console.log("contact", contact);

    return undefined;
  }
}

export default ContactProcessor;
