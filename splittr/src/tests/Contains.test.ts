import { Contains as contains } from "../controller/Contains";
import { uniqueEntry, entrys, nonUniqueEntry } from "./Testdata";

test("unique number", () => {
  expect(contains(entrys, uniqueEntry)).toBe(false);
});

test("number is already in list", () => {
  expect(contains(entrys, nonUniqueEntry)).toBe(true);
});