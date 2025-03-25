import AddFieldBtn from "./_comps/AddFieldBtn";
import FormFields from "./_comps/FormFields";
import FormPreview from "./_comps/FormPreview";

export default function Page() {
  return (
    <main className="mx-auto w-5xl p-5">
      <div className="flex items-start gap-5">
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
      </div>

      <div className="min-h-96"></div>
    </main>
  );
}
