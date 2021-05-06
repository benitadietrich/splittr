import FormattedNumber from "../model/FormattedNumber";

export function Contains(list: FormattedNumber[], entry: FormattedNumber): boolean {

    let contains: boolean = false;

    let templist = list.filter(item => item.id !== entry.id)

    if ((templist.find(s => s.countryCode === entry.countryCode 
        && s.durchwahl === entry.durchwahl 
        && s.number === entry.number
        && s.ortsvorwahl === entry.ortsvorwahl
        ) !== undefined)) {
        contains = true;
    }


    return contains;

}