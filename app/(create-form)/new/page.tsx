import AddFieldBtn from "./_comps/AddFieldBtn";
import FormFields from "./_comps/FormFields";

export default function Page() {
  return (
    <main className="p-5">
      <section className="mx-auto w-5xl space-y-2">
        <h1 className="font-medium">Edit Form</h1>
        <FormFields />
        <AddFieldBtn />
      </section>

      <div className="min-h-96"></div>
    </main>
  );
}
