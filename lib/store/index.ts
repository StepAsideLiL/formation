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

export type TFormData = {
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
const formFieldsAtom = atomWithStorage<TFormSchema[]>("formFields", []);

const insertNewFieldAfterIdAtom = atom(null, (get, set, fieldId: string) => {
  const formFields = get(formFieldsAtom);
  const newFormFields: TFormSchema[] = [];

  for (let i = 0; i < formFields.length; i++) {
    if (formFields[i].id === fieldId) {
      newFormFields.push(formFields[i]);
      newFormFields.push(insertFormField());
    } else {
      newFormFields.push(formFields[i]);
    }
  }

  set(formFieldsAtom, newFormFields);
});

// Form data related atoms
const formDataAtom = atomWithStorage<TFormData[]>("formData", []);

const insertFormValueInFormDataAtom = atom(
  null,
  (get, set, newFormValue: TFormData) => {
    const formData = get(formDataAtom);

    const newFormData = formData.map((formValue) =>
      formValue.id === newFormValue.id ? newFormValue : formValue,
    );

    set(formDataAtom, newFormData);
  },
);

const atoms = {
  formFieldsAtom,
  insertNewFieldAfterIdAtom,
  formDataAtom,
  insertFormValueInFormDataAtom,
};

export default atoms;
