import { Contact } from "../model/Contact";
import { DataProcessor } from "../model/DataProcessor";


class ContactProcessor implements DataProcessor{

    private input: string;

    constructor(input: string){
        this.input = input;
    }

    convert(str: string): Contact | undefined{
        return undefined;
    }

}


export default ContactProcessor;