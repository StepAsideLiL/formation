import FormEditor from "./_comps/FormEditor";
import FormPreview from "./_comps/FormPreview";

export default function Page() {
  return (
    <main className="mx-auto flex w-5xl items-start gap-5 p-5">
      <FormEditor />

      <FormPreview />
    </main>
  );
}
