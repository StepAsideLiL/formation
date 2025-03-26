"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import atoms, {
  TCheckboxMetadata,
  TFormObj,
  TInputMetadata,
  TRadioMetadata,
  TSelectMetadata,
} from "@/lib/store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAtom } from "jotai";
import { Label } from "@/components/ui/label";
import Icons from "@/lib/icons";

export function InputMetadateForm({ options }: { options: TFormObj }) {
  const metadata = options?.metadata as TInputMetadata;
  const [formObj, setFormObj] = useAtom(atoms.formObjAtom);

  function updateMetadata(metadata: TInputMetadata) {
    const newFormObj = formObj.map((field) =>
      field.id === options.id ? { ...options, metadata: metadata } : field,
    );

    setFormObj(newFormObj);
  }

  return (
    <div className="space-y-2">
      <Separator />

      <Input
        type="text"
        placeholder="Placeholder Text"
        value={metadata?.placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          updateMetadata({
            placeholder: event.target.value || "",
            description: metadata?.description || "",
          })
        }
      />

      <Input
        type="text"
        placeholder="Field Description"
        value={metadata?.description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          updateMetadata({
            placeholder: metadata.placeholder || "",
            description: event.target.value || "",
          })
        }
      />
    </div>
  );
}

export function SelectMetadateForm({ options }: { options: TFormObj }) {
  const metadata = options?.metadata as TSelectMetadata;
  const [formObj, setFormObj] = useAtom(atoms.formObjAtom);

  function updateMetadata(metadata: TSelectMetadata) {
    const newFormObj = formObj.map((field) =>
      field.id === options.id ? { ...options, metadata: metadata } : field,
    );

    setFormObj(newFormObj);
  }

  return (
    <div className="space-y-2">
      <Separator />

      <Input
        type="text"
        placeholder="Dropdown Placeholder Text"
        value={metadata?.placeholder}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          updateMetadata({
            placeholder: event.target.value || "",
            description: metadata?.description || "",
            options: metadata?.options || [],
            defaultOption: metadata?.defaultOption || "",
          })
        }
      />

      <Input
        type="text"
        placeholder="Field Description"
        value={metadata?.description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          updateMetadata({
            placeholder: metadata?.placeholder || "",
            description: event.target.value || "",
            options: metadata?.options || [],
            defaultOption: metadata?.defaultOption || "",
          })
        }
      />

      <div className="flex w-full gap-2">
        <div className="w-1/2 space-y-1">
          <h2 className="text-xs">Options</h2>
          {metadata.options?.map((option, i) => {
            return (
              <div key={i} className="relative">
                <Input
                  placeholder="Option"
                  className="w-full"
                  value={option}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    updateMetadata({
                      placeholder: metadata?.placeholder || "",
                      description: metadata?.description || "",
                      options: metadata?.options?.map((option, j) =>
                        i === j ? event.target.value : option,
                      ),
                      defaultOption: metadata?.defaultOption || "",
                    })
                  }
                />
                <Button
                  variant={"ghost"}
                  size={"icon"}
                  className="text-destructive size-4 cursor-pointer"
                  asChild
                  onClick={() =>
                    updateMetadata({
                      placeholder: metadata?.placeholder || "",
                      description: metadata?.description || "",
                      options: metadata?.options?.filter((_, j) => i !== j),
                      defaultOption: metadata?.defaultOption || "",
                    })
                  }
                >
                  <Icons.Trash className="absolute top-2 right-2" />
                </Button>
              </div>
            );
          })}
          <Button
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => {
              updateMetadata({
                placeholder: metadata?.placeholder || "",
                description: metadata?.description || "",
                options: [...(metadata?.options || []), "New Option"],
                defaultOption: metadata?.defaultOption || "",
              });
            }}
          >
            Add Option
          </Button>
        </div>

        <div className="w-1/2 space-y-1">
          <h2 className="text-xs">Select default option</h2>

          <RadioGroup
            value={metadata.defaultOption}
            onValueChange={(value: TSelectMetadata["defaultOption"]) =>
              updateMetadata({
                placeholder: metadata?.placeholder || "",
                description: metadata?.description || "",
                options: metadata?.options,
                defaultOption: value,
              })
            }
            className="space-x-2"
          >
            {metadata.options?.map((option, i) => (
              <div key={i} className="flex items-center gap-1">
                <RadioGroupItem
                  value={option}
                  id={option}
                  className="cursor-pointer"
                />
                <Label htmlFor={option} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}

export function CheckboxMetadataForm({ options }: { options: TFormObj }) {
  const metadata = options?.metadata as TCheckboxMetadata;
  const [formObj, setFormObj] = useAtom(atoms.formObjAtom);

  function updateMetadata(metadata: TCheckboxMetadata) {
    const newFormObj = formObj.map((field) =>
      field.id === options.id ? { ...options, metadata: metadata } : field,
    );

    setFormObj(newFormObj);
  }

  return (
    <div className="space-y-2">
      <Separator />

      <Input
        type="text"
        placeholder="Field Description"
        value={metadata?.description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          updateMetadata({
            description: event.target.value || "",
            options: metadata?.options || [],
          })
        }
      />

      <div className="space-y-1">
        <h2 className="text-xs">Checkbox Options</h2>
        {metadata.options?.map((option, i) => {
          return (
            <div key={i} className="relative">
              <Input
                placeholder="Option"
                className="w-full"
                value={option}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  updateMetadata({
                    description: metadata?.description || "",
                    options: metadata?.options?.map((option, j) =>
                      i === j ? event.target.value : option,
                    ),
                  })
                }
              />
              <Button
                variant={"ghost"}
                size={"icon"}
                className="text-destructive size-4 cursor-pointer"
                asChild
                onClick={() =>
                  updateMetadata({
                    description: metadata?.description || "",
                    options: metadata?.options?.filter((_, j) => i !== j),
                  })
                }
              >
                <Icons.Trash className="absolute top-2 right-2" />
              </Button>
            </div>
          );
        })}
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => {
            updateMetadata({
              description: metadata?.description || "",
              options: [...(metadata?.options || []), "New Option"],
            });
          }}
        >
          Add Option
        </Button>
      </div>
    </div>
  );
}

export function RadioMetadataForm({ options }: { options: TFormObj }) {
  const metadata = options?.metadata as TRadioMetadata;
  const [formObj, setFormObj] = useAtom(atoms.formObjAtom);

  function updateMetadata(metadata: TCheckboxMetadata) {
    const newFormObj = formObj.map((field) =>
      field.id === options.id ? { ...options, metadata: metadata } : field,
    );

    setFormObj(newFormObj);
  }

  return (
    <div className="space-y-2">
      <Separator />

      <Input
        type="text"
        placeholder="Field Description"
        value={metadata?.description}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          updateMetadata({
            description: event.target.value || "",
            options: metadata?.options || [],
          })
        }
      />

      <div className="space-y-1">
        <h2 className="text-xs">Multiple Choice Options</h2>
        {metadata.options?.map((option, i) => {
          return (
            <div key={i} className="relative">
              <Input
                placeholder="Option"
                className="w-full"
                value={option}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  updateMetadata({
                    description: metadata?.description || "",
                    options: metadata?.options?.map((option, j) =>
                      i === j ? event.target.value : option,
                    ),
                  })
                }
              />
              <Button
                variant={"ghost"}
                size={"icon"}
                className="text-destructive size-4 cursor-pointer"
                asChild
                onClick={() =>
                  updateMetadata({
                    description: metadata?.description || "",
                    options: metadata?.options?.filter((_, j) => i !== j),
                  })
                }
              >
                <Icons.Trash className="absolute top-2 right-2" />
              </Button>
            </div>
          );
        })}
        <Button
          variant={"outline"}
          className="cursor-pointer"
          onClick={() => {
            updateMetadata({
              description: metadata?.description || "",
              options: [...(metadata?.options || []), "New Option"],
            });
          }}
        >
          Add Option
        </Button>
      </div>
    </div>
  );
}
