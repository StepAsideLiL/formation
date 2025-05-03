/* eslint-disable react/no-children-prop */

"use client";

import { cn } from "@/lib/utils";
import {
  TCheckboxMetadata,
  TFormSchema,
  TInputMetadata,
  TRadioMetadata,
  TSelectMetadata,
} from "@/lib/store";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import submitForm from "@/lib/actions/submitForm";
import { useState } from "react";
import Icons from "@/lib/icons";
import { toast } from "sonner";

export function RenderForm({
  formSchema,
  currentFromSchemaVariantId,
  className,
}: {
  formSchema: TFormSchema[];
  currentFromSchemaVariantId: string;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: formSchema.reduce(
      (acc, curr) => {
        acc[curr.id] = "";
        return acc;
      },
      {} as Record<string, string>,
    ),
    onSubmit: async (values) => {
      setLoading(true);

      const { error, data } = await submitForm(
        values.value,
        currentFromSchemaVariantId,
      );

      if (error) {
        toast.error(error.message);
        setLoading(false);
      }

      if (data) {
        toast.success("Form Submitted Successfully");
        setLoading(false);
      }
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
      className={cn("space-y-4", className)}
    >
      {formSchema.map((schema) => {
        if (schema.label === "") {
          return null;
        }

        return (
          <form.Field
            key={schema.id}
            name={schema.id}
            children={(field) => {
              if (schema.fieldType === "input") {
                const metadata = schema.metadata as TInputMetadata;

                return (
                  <div>
                    <Label htmlFor={schema.id} className="mb-2">
                      {schema.label}
                      {schema.required ? (
                        <span className="text-destructive">*</span>
                      ) : (
                        ""
                      )}
                    </Label>
                    <Input
                      id={schema.id}
                      type="text"
                      placeholder={metadata.placeholder}
                      required={schema.required}
                      className="mb-1"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                    <p className="text-xs">{metadata.description}</p>
                  </div>
                );
              }

              if (schema.fieldType === "textarea") {
                const metadata = schema.metadata as TInputMetadata;

                return (
                  <div>
                    <Label htmlFor={schema.id} className="mb-2">
                      {schema.label}
                      {schema.required ? (
                        <span className="text-destructive">*</span>
                      ) : (
                        ""
                      )}
                    </Label>
                    <Textarea
                      id={schema.id}
                      placeholder={metadata.placeholder}
                      rows={5}
                      required={schema.required}
                      className="mb-1"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) =>
                        field.handleChange(event.target.value)
                      }
                    />
                    <p className="text-xs">{metadata.description}</p>
                  </div>
                );
              }

              if (schema.fieldType === "select") {
                const metadata = schema.metadata as TSelectMetadata;

                return (
                  <div>
                    <Label htmlFor={schema.id} className="mb-2">
                      {schema.label}
                      {schema.required ? (
                        <span className="text-destructive">*</span>
                      ) : (
                        ""
                      )}
                    </Label>
                    <Select
                      required={schema.required}
                      value={field.state.value}
                      onValueChange={field.handleChange}
                    >
                      <SelectTrigger
                        id={schema.id}
                        className="w-full cursor-pointer"
                      >
                        <SelectValue
                          id={schema.id}
                          placeholder={metadata.placeholder}
                        />
                      </SelectTrigger>

                      <SelectContent id={schema.id}>
                        {metadata.options?.map((option, i) => (
                          <SelectItem
                            key={i}
                            value={option}
                            className="cursor-pointer"
                          >
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs">{metadata.description}</p>
                  </div>
                );
              }

              if (schema.fieldType === "checkbox") {
                const metadata = schema.metadata as TCheckboxMetadata;

                if (schema.label === "") {
                  return null;
                }

                return (
                  <div>
                    <div className="mb-2">
                      <Label htmlFor={schema.id}>
                        {schema.label}
                        {schema.required ? (
                          <span className="text-destructive">*</span>
                        ) : (
                          ""
                        )}
                      </Label>
                      {(metadata?.description ||
                        metadata?.description?.length !== 0) && (
                        <p className="text-xs">{metadata.description}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      {metadata.options?.map((option, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <Checkbox
                            id={`${i}`}
                            required={schema.required}
                            className="cursor-pointer"
                          />
                          <Label
                            htmlFor={`${i}`}
                            className="cursor-pointer font-normal"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (schema.fieldType === "radio") {
                const metadata = schema.metadata as TRadioMetadata;

                if (schema.label === "") {
                  return null;
                }

                return (
                  <div>
                    <div className="mb-2">
                      <Label htmlFor={schema.id}>
                        {schema.label}
                        {schema.required ? (
                          <span className="text-destructive">*</span>
                        ) : (
                          ""
                        )}
                      </Label>
                      {(metadata?.description ||
                        metadata?.description?.length !== 0) && (
                        <p className="text-xs">{metadata.description}</p>
                      )}
                    </div>
                    <div className="space-y-1">
                      <RadioGroup required={schema.required}>
                        {metadata.options?.map((option, i) => (
                          <div key={i} className="flex items-center gap-1">
                            <RadioGroupItem
                              value={option}
                              id={`${i}`}
                              className="cursor-pointer"
                            />
                            <Label
                              htmlFor={`${i}`}
                              className="cursor-pointer font-normal"
                            >
                              {option}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  </div>
                );
              }
            }}
          />
        );
      })}

      <form.Subscribe
        children={() => (
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Icons.Loading
                  className="-ms-1 animate-spin"
                  size={16}
                  aria-hidden="true"
                />
                Submitting
              </>
            ) : (
              "Submit"
            )}
          </Button>
        )}
      />
    </form>
  );
}
