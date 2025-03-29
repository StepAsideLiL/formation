"use client";

import atoms, { TFormObj } from "@/lib/store";
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

export default function FormFields() {
  const [formObj, setFromObj] = useAtom(atoms.formObjAtom);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!active || !over || active.id === over.id) return;

    const oldIndex = formObj.findIndex((item) => item.id === active.id);
    const newIndex = formObj.findIndex((item) => item.id === over.id);
    setFromObj(arrayMove(formObj, oldIndex, newIndex));
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={formObj.map((f) => f.id as UniqueIdentifier)}
        strategy={verticalListSortingStrategy}
      >
        <section className="space-y-5">
          {formObj.map((field) => (
            <SortableItem key={field.id} field={field} />
          ))}
        </section>
      </SortableContext>
    </DndContext>
  );
}

function SortableItem({ field }: { field: TFormObj }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id as UniqueIdentifier });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex items-start gap-5"
    >
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
  );
}
