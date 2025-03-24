import AddFieldBtn from "./AddFieldBtn";
import FormFields from "./FormFields";

export default function FormEditor() {
  return (
    <section className="w-full space-y-5">
      <h1 className="font-medium">Edit Form</h1>

      <FormFields />

      <div className="mx-auto w-fit">
        <AddFieldBtn />
      </div>
    </section>
  );
}
