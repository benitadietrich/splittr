import { Contact } from "../model/Contact";
import { Error, ErrorCode } from "../model/Error";

export default class ContactDatabase {
  store: Contact[] = [];

  async get(id: string): Promise<Contact | Error> {
    let rtn: Contact | undefined = this.store.find((item) => item.id === id);
    return rtn !== undefined
      ? rtn
      : {
          code: ErrorCode.error,
          msg: "Object was not Found",
        };
  }

  async set(ctn: Contact): Promise<Error | Contact> {
    this.store.push(ctn);

    let check: Contact | undefined = this.store.find(c => c.id === ctn.id);
    return (check !== undefined) ? check : {
        code: ErrorCode.error,
        msg: "Saving Object to database was not successfull!",
      }
  }
}
