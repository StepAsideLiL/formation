"use client";

import atoms, { atomSet, TFormSchema } from "@/lib/store";
import { useAtom } from "jotai";
import FieldOptionsForm from "./FieldOptionsForm";
import {
  CheckboxField,
  InputField,
  RadioField,
  SelectField,
  TextareaField,
} from "@/components/render-field";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  UniqueIdentifier,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Icons from "@/lib/icons";
import { Button } from "@/components/ui/button";

export default function FormFields() {
  const [formSchema, setFromSchema] = useAtom(atoms.formSchemaAtom);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    const oldIndex = formSchema.findIndex((item) => item.id === active.id);
    const newIndex = formSchema.findIndex((item) => item.id === over.id);
    setFromSchema(arrayMove(formSchema, oldIndex, newIndex));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={formSchema.map((f) => f.id as UniqueIdentifier)}
        strategy={verticalListSortingStrategy}
      >
        <section className="space-y-5 overflow-hidden">
          {formSchema.map((field) => (
            <SortableItem key={field.id} field={field} />
          ))}
        </section>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({ field }: { field: TFormSchema }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id as UniqueIdentifier });
  const insertFieldAfterFieldId = atomSet.NewFieldAfterFieldId();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="group">
      <div className="relative mx-auto flex w-5xl items-start gap-5">
        <div className="absolute top-0 -left-10 hidden flex-col group-hover:flex">
          <Button
            variant={"ghost"}
            size={"icon"}
            className="cursor-pointer"
            {...attributes}
            {...listeners}
          >
            <Icons.Grip size={16} />
          </Button>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="cursor-pointer"
            onClick={() => insertFieldAfterFieldId(field.id)}
          >
            <Icons.Plus size={16} />
          </Button>
        </div>

        <div className="w-1/2">
          <FieldOptionsForm options={field} />
        </div>

        <div className="w-1/2">
          {field.fieldType === "input" && (
            <InputField key={field.id} field={field} />
          )}

          {field.fieldType === "textarea" && (
            <TextareaField key={field.id} field={field} />
          )}

          {field.fieldType === "select" && (
            <SelectField key={field.id} field={field} />
          )}

          {field.fieldType === "checkbox" && (
            <CheckboxField key={field.id} field={field} />
          )}

          {field.fieldType === "radio" && (
            <RadioField key={field.id} field={field} />
          )}
        </div>
      </div>
    </div>
  );
}
