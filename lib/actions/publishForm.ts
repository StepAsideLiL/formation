import { TFormObj } from "@/lib/store";
import { TResponse } from "@/lib/types";

export async function publishForm(formObj: TFormObj[]): Promise<TResponse> {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const formObjDB = {
    id: "1",
    formObj: formObj,
  };

  return {
    error: null,
    data: formObjDB,
  };
}
