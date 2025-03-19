import AddFieldBtn from "./_comps/AddFieldBtn";
import FormFields from "./_comps/FormFields";

export default function Page() {
  return (
    <main className="mx-auto w-5xl space-y-10 p-5">
      <FormFields />

      <div className="mx-auto w-fit">
        <AddFieldBtn />
      </div>
    </main>
  );
}
