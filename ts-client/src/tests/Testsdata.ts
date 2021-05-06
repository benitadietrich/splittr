import FormattedNumber from "../model/FormattedNumber";

export const uniqueEntry: FormattedNumber = {
    id: "1",
    countryCode: "49",
    ortsvorwahl: "7443",
    number: "172907 ",
    durchwahl: "",
    possibility: true,
    regionCode: "DE",
    unformatted: "+4907443172907",
    checked: false,
  };

export const noneUniqueEntry: FormattedNumber = {
    id: "5",
    countryCode: "+49",
    ortsvorwahl: "07448",
    number: "596321",
    durchwahl: "4",
    possibility: true,
    regionCode: "DE",
    unformatted: "+4907448596321-4",
    checked: false,
}
  
export const numbers: FormattedNumber[] = [
    {
      id: "2",
      countryCode: "+49",
      ortsvorwahl: "07441",
      number: "951828",
      durchwahl: "",
      possibility: true,
      regionCode: "DE",
      unformatted: "+4907441951828",
      checked: false,
    },
    {
      id: "3",
      countryCode: "+49",
      ortsvorwahl: "07448",
      number: "596321",
      durchwahl: "4",
      possibility: true,
      regionCode: "DE",
      unformatted: "+4907448 596321-4",
      checked: false,
    },
  ];