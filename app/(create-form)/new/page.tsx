import AddFieldBtn from "@/components/form-app/AddFieldBtn";
import FormFields from "@/components/form-app/FormFields";
import TitleAndDescription from "@/components/form-app/TitleAndDescription";

export default function Page() {
  return (
    <main className="p-5">
      <section className="space-y-2 overflow-x-hidden">
        <div className="mx-auto w-5xl">
          <h1 className="font-medium">Edit Form</h1>
        </div>

        <TitleAndDescription />

        <FormFields />

        <div className="mx-auto w-5xl">
          <AddFieldBtn />
        </div>
      </section>

      <div className="min-h-96"></div>
    </main>
  );
}
