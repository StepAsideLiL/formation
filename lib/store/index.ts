import { atomWithStorage } from "jotai/utils";

type TFieldsType = "input" | "textarea" | "select" | "radio" | "checkbox";

export type TFormObj = {
  id: string;
  label: string;
  type: TFieldsType;
  placeholder: string;
  required: boolean;
  default: string;
};

const formObjAtom = atomWithStorage<TFormObj[]>("formObj", []);

const atoms = {
  formObjAtom,
};

export default atoms;
