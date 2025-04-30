import { Button } from "@/components/ui/button";
import Link from "next/link";
import AppPreview from "./_comps/AppPreview";
import InputFieldPreview from "./_comps/InputFieldPreview";
import TextareaFieldPreview from "./_comps/TextareaFieldPreview";
import SelectFieldPreview from "./_comps/SelectFieldPreview";
import RadioFieldPreview from "./_comps/RadioFieldPreview";
import CheckboxFieldPreview from "./_comps/CheckboxFieldPreview";

export default function Page() {
  return (
    <main className="min-h-screen space-y-20">
      <section className="space-y-10">
        <div className="mx-auto my-12 w-full max-w-5xl space-y-5 px-10">
          <h1 className="text-center text-3xl font-medium text-balance sm:text-left sm:text-5xl">
            Formation is a form building platform for collecting data from user.
          </h1>

          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:justify-start">
            <Button asChild>
              <Link href={"/new"}>Create New Form</Link>
            </Button>
          </div>
        </div>

        <AppPreview />
      </section>

      <section className="relative py-20">
        <div className="to-background from-foreground/5 absolute top-0 left-0 -z-50 h-96 w-full bg-gradient-to-b"></div>

        <div className="mx-auto w-full max-w-5xl">
          <div className="space-y-1 text-center">
            <h1 className="text-4xl font-medium">
              Types of Fields in Formation
            </h1>
            <p className="text-foreground/50">
              You can create a form with these following input type fields.
            </p>
          </div>

          <div className="h-28"></div>

          <div className="flex flex-col items-center justify-center gap-10 px-5 md:px-0">
            <div className="flex w-full flex-col items-start justify-center gap-5 md:flex-row">
              {/* Input */}
              <div className="w-full space-y-5 md:w-1/2">
                <div className="space-y-0.5">
                  <h2 className="text-3xl">One Line Text</h2>
                  <p className="text-muted-foreground">
                    Input field for short text
                  </p>
                </div>

                <div className="relative select-none">
                  <InputFieldPreview />
                  <div
                    className="absolute inset-0 z-50"
                    style={{
                      background:
                        "radial-gradient(circle at top left, #00000000, var(--background))",
                    }}
                  ></div>
                </div>
              </div>

              {/* Textarea */}
              <div className="w-full space-y-5 md:w-1/2">
                <div className="space-y-0.5">
                  <h2 className="text-3xl">Paragraph Text</h2>
                  <p className="text-muted-foreground">
                    Textarea field for long multiline text
                  </p>
                </div>

                <div className="relative select-none">
                  <TextareaFieldPreview />
                  <div
                    className="absolute inset-0 z-50"
                    style={{
                      background:
                        "radial-gradient(circle at top left, #00000000, var(--background))",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-start justify-center gap-5 md:flex-row">
              {/* Radio */}
              <div className="w-full space-y-5 md:w-1/2">
                <div className="space-y-0.5">
                  <h2 className="text-3xl">Multiple Choice</h2>
                  <p className="text-muted-foreground">
                    Select an option from a radio button group
                  </p>
                </div>

                <div className="relative select-none">
                  <RadioFieldPreview />
                  <div
                    className="absolute inset-0 z-50"
                    style={{
                      background:
                        "radial-gradient(circle at top left, #00000000, var(--background))",
                    }}
                  ></div>
                </div>
              </div>

              {/* Checkbox */}
              <div className="w-full space-y-5 md:w-1/2">
                <div className="space-y-0.5">
                  <h2 className="text-3xl">Multiple Choice</h2>
                  <p className="text-muted-foreground">
                    Select an option from a radio button group
                  </p>
                </div>

                <div className="relative select-none">
                  <CheckboxFieldPreview />
                  <div
                    className="absolute inset-0 z-50"
                    style={{
                      background:
                        "radial-gradient(circle at top left, #00000000, var(--background))",
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col items-start justify-center gap-5 md:flex-row">
              {/* Select */}
              <div className="w-full space-y-5 md:w-1/2">
                <div className="space-y-0.5">
                  <h2 className="text-3xl">Dropdown Options</h2>
                  <p className="text-muted-foreground">
                    Select an option from a dropdown list
                  </p>
                </div>

                <div className="relative select-none">
                  <SelectFieldPreview />
                  <div
                    className="absolute inset-0 z-50"
                    style={{
                      background:
                        "radial-gradient(circle at top left, #00000000, var(--background))",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
