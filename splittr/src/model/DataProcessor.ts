import ContactProcessor from "../controller/ContactProcessor";
import { Contact } from "./Contact";

export interface DataProcessor {
  convert(str: string): Promise<Contact | undefined>;
}
