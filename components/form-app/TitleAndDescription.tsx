"use client";

import { Input } from "@/components/ui/input";
import atoms from "@/lib/store";
import { useAtom } from "jotai";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function TitleAndDescription() {
  const [formInfo, setFormInfo] = useAtom(atoms.formAtom);
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          "prose-sm prose-ul:prose-p:my-0 prose-ol:prose-p:my-0 prose-ul:list-disc prose-ol:list-decimal text-foreground prose-headings:text-foreground border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 mb-2 field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus:outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
      },
    },
    onUpdate: (event) => {
      setFormInfo({ ...formInfo, description: event.editor.getHTML() });
    },
  });

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      <Input
        placeholder="Title"
        className="mb-2"
        value={formInfo.title}
        onChange={(event) =>
          setFormInfo({ ...formInfo, title: event.target.value })
        }
      />
      {editor && (
        <EditorContent placeholder="Write some description" editor={editor} />
      )}
    </div>
  );
}
