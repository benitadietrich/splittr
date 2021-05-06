import { formatPhoneNumber } from "../controller/NumberProcessor";
import FormattedNumber from "../model/FormattedNumber";
import { uniqueEntry } from "./testsdata";

test("parse a simple german number", () => {
    const result = formatPhoneNumber("+4907443172907")
    expect(result).not.toBe(undefined);
    expect(result?.number).toBe(uniqueEntry.number);
    expect(result?.countryCode).toBe(Number.parseInt(uniqueEntry.countryCode));
    expect(result?.ortsvorwahl).toBe(uniqueEntry.ortsvorwahl);
    expect(result?.regionCode).toBe(uniqueEntry.regionCode);
});
