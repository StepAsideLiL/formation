import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { fieldId } from "../utils";

export type TFieldsType =
  | "input"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox";

export type TInputMetadata = {
  placeholder?: string;
  description?: string;
};

export type TSelectMetadata = {
  placeholder?: string;
  description?: string;
  options?: string[];
  defaultOption?: string;
};

export type TCheckboxMetadata = {
  description?: string;
  options?: string[];
};

export type TRadioMetadata = {
  description?: string;
  options?: string[];
};

export type TFormObj<
  T = TInputMetadata | TSelectMetadata | TCheckboxMetadata | TRadioMetadata,
> = {
  id: string;
  label: string;
  fieldType: TFieldsType;
  required: boolean;
  metadata?: T;
};

export const insertFormObj = (): TFormObj => {
  return {
    id: fieldId(),
    label: "",
    fieldType: "input",
    required: true,
    metadata: {},
  };
};

const formObjAtom = atomWithStorage<TFormObj[]>("formObj", []);

const insertFieldAfterAtom = atom(null, (get, set, fieldId: string) => {
  const formObj = get(formObjAtom);
  const newFormObj: TFormObj[] = [];

  for (let i = 0; i < formObj.length; i++) {
    if (formObj[i].id === fieldId) {
      newFormObj.push(formObj[i]);
      newFormObj.push(insertFormObj());
    } else {
      newFormObj.push(formObj[i]);
    }
  }

  set(formObjAtom, newFormObj);
});

const atoms = {
  formObjAtom,
  insertFieldAfterAtom,
};

export default atoms;
