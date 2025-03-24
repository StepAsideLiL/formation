import AddFieldBtn from "./_comps/AddFieldBtn";
import FormFields from "./_comps/FormFields";
import FormPreview from "./_comps/FormPreview";

export default function Page() {
  return (
    <main className="mx-auto flex w-5xl items-start gap-5 p-5">
      <section className="w-1/2 space-y-5">
        <h1 className="font-medium">Edit Form</h1>

        <FormFields />

        <div className="mx-auto w-fit">
          <AddFieldBtn />
        </div>
      </section>

      <section className="w-1/2 space-y-5">
        <h1 className="font-medium">Form Preview</h1>

        <FormPreview />
      </section>
    </main>
  );
}
