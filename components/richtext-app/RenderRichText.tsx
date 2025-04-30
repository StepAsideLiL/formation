"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RenderRichText({ content }: { content: string }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editorProps: {
      attributes: {
        class:
          "prose-sm prose-ul:prose-p:my-0 prose-ol:prose-p:my-0 prose-ul:list-disc prose-ol:list-decimal text-foreground prose-headings:text-foreground w-full",
      },
    },
  });

  return <EditorContent editor={editor} />;
}
