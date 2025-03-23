import { atomWithStorage } from "jotai/utils";

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

export type TFormObj<T = TInputMetadata> = {
  id: string;
  label: string;
  fieldType: TFieldsType;
  required: boolean;
  metadata?: T;
};

const formObjAtom = atomWithStorage<TFormObj[]>("formObj", []);

const atoms = {
  formObjAtom,
};

export default atoms;
