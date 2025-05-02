import { atom, useAtom } from "jotai";
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

export type TForm = {
  title: string;
  description: string;
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

// Form title and description related atoms
const formAtom = atomWithStorage<TForm>("form", {
  title: "",
  description: "",
});

// Form schema related atoms
const formSchemaAtom = atomWithStorage<TFormSchema[]>("formSchema", []);

const insertNewFieldAfterFieldIdAtom = atom(
  null,
  (get, set, fieldId: string) => {
    const formSchema = get(formSchemaAtom);
    const newFormSchema: TFormSchema[] = [];

    for (let i = 0; i < formSchema.length; i++) {
      if (formSchema[i].id === fieldId) {
        newFormSchema.push(formSchema[i]);
        newFormSchema.push(insertFormField());
      } else {
        newFormSchema.push(formSchema[i]);
      }
    }

    set(formSchemaAtom, newFormSchema);
  },
);

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

function NewSchema() {
  const [, set] = useAtom(formSchemaAtom);
  return set;
}

function NewFieldAfterFieldId() {
  const [, set] = useAtom(insertNewFieldAfterFieldIdAtom);
  return set;
}

function FormValueInFormData() {
  const [, set] = useAtom(insertFormValueInFormDataAtom);
  return set;
}

const atoms = {
  formAtom,
  formSchemaAtom,
  formDataAtom,
};

export const atomSet = {
  NewSchema,
  NewFieldAfterFieldId,
  FormValueInFormData,
};

export default atoms;
