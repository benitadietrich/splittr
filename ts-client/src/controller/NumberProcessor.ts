import FormattedNumber from "../model/FormattedNumber";
import { v4 as uuidv4 } from "uuid";

import parsePhoneNumber from "libphonenumber-js";
var PhoneNumber = require("awesome-phonenumber");

export function formatPhoneNumber(
  unformattedNumber: string
): FormattedNumber | undefined {
  let formattedNumbers: FormattedNumber;
  let durchwahl: string = "";
  let formattedString: string = unformattedNumber;

  // eliminate brackets
  formattedString = eliminateSymbols(formattedString);
  console.log("formattedSring", formattedString);

  //Check if country starts with 00 and replace it by + or look for missing country code
  if (formattedString.startsWith("00")) {
    formattedString = "+".concat(formattedString.substring(2));
    console.log("00", formattedString);
  } else if (!formattedString.startsWith("+")) {
      //add default country code
    formattedString = "+49".concat(formattedString);
    console.log("+49", formattedString);
  }

  //look for a durchwahl, store it
  if (formattedString.includes("-")) {
    let parts: string[] = formattedString.split("-");
    console.log("parts", parts)
    if (parts.length === 3) {
      // - marks vorwahl and hauptwahl and hauptwahl and durchwahl
      durchwahl = parts[2];
      console.log("durchwahl", durchwahl)
    } else if (parts.length === 2 && parts[0].substring(3).length >= parts[1].length) {
      // - marks durchwahl
      durchwahl = parts[1];
    }
    formattedString = formattedString.replace("-", "");
  }

  // parse the formatted string
  const pn = new PhoneNumber(formattedString);
  console.log("pn", pn);
  if (pn.isPossible()) {
    let num: string[] = pn.getNumber("international").split(" ");
    let vorwahl: string = "";
    let number: string = "";

    //store item with index 1 as vorwahl
    if (num[1] !== undefined) vorwahl = num[1];

    //store rest of items as number
    for (let index = 2; index < num.length; index++) {
      if (num[index] !== undefined) {
        number = number.concat(num[index]).concat(" ");
      }
    }

    //cut the durchwahl out, because the parser stores it inside the number
    number = number.replace(durchwahl, "");

    formattedNumbers = {
      id: uuidv4(),
      countryCode: pn.getCountryCode(),
      ortsvorwahl: vorwahl,
      number: number,
      durchwahl: durchwahl,
      possibility: pn.isPossible(),
      regionCode: pn.getRegionCode(),
      unformatted: unformattedNumber,
      checked: false,
    };
  } else {
    return undefined;
  }

  return formattedNumbers;
}

function eliminateSymbols(number: string): string {
  number = number.replace("(", "");
  number = number.replace(")", "");
  number = number.replace("[", "");
  number = number.replace("]", "");
  number = number.replace("/","")
  return number;
}
