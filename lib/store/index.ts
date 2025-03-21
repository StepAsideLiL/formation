import { atomWithStorage } from "jotai/utils";

export type TFieldsType =
  | "input"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox";

export type TFormObj = {
  id: string;
  label: string;
  fieldType: TFieldsType;
  required: boolean;
};

const formObjAtom = atomWithStorage<TFormObj[]>("formObj", []);

const atoms = {
  formObjAtom,
};

export default atoms;
