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

export type TFormSchema<
  T = TInputMetadata | TSelectMetadata | TCheckboxMetadata | TRadioMetadata,
> = {
  id: string;
  label: string;
  fieldType: TFieldsType;
  required: boolean;
  metadata?: T;
};

export type TFormSubmissionData = {
  id: string;
  value: string;
};

export const insertFormField = (): TFormSchema => {
  return {
    id: fieldId(),
    label: "",
    fieldType: "input",
    required: true,
    metadata: {},
  };
};

// formFields related atoms
const formObjAtom = atomWithStorage<TFormSchema[]>("formFields", []);

const insertFieldAfterAtom = atom(null, (get, set, fieldId: string) => {
  const formFields = get(formObjAtom);
  const newFormObj: TFormSchema[] = [];

  for (let i = 0; i < formFields.length; i++) {
    if (formFields[i].id === fieldId) {
      newFormObj.push(formFields[i]);
      newFormObj.push(insertFormField());
    } else {
      newFormObj.push(formFields[i]);
    }
  }

  set(formObjAtom, newFormObj);
});

// Form submission data related atoms
const formSubmissionDataAtom = atomWithStorage<TFormSubmissionData[]>(
  "formSub",
  [],
);

const insertFormSubmissionDataAtom = atom(
  null,
  (get, set, newFormSubmissionData: TFormSubmissionData) => {
    const formSubmissionDatas = get(formSubmissionDataAtom);

    const newFormSubmissionDatas = formSubmissionDatas.map(
      (formSubmissionData) =>
        formSubmissionData.id === newFormSubmissionData.id
          ? newFormSubmissionData
          : formSubmissionData,
    );

    set(formSubmissionDataAtom, newFormSubmissionDatas);
  },
);

const atoms = {
  formObjAtom,
  insertFieldAfterAtom,
  formSubmissionDataAtom,
  insertFormSubmissionDataAtom,
};

export default atoms;
