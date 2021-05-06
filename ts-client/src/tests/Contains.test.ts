import { Contains as contains } from "../controller/Contains";
import { noneUniqueEntry, numbers, uniqueEntry } from "./testsdata";

test("unique number", () => {
  expect(contains(numbers, uniqueEntry)).toBe(false);
});

test("number is already in list", () => {
  expect(contains(numbers, noneUniqueEntry)).toBe(true);
});
