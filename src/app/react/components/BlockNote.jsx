import React from "react";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

const BlockNote = () => {
  const editor = useCreateBlockNote();
  return (
    <div className="textEditor">
      <h1>Welcome to Note Block</h1>
      <BlockNoteView editor={editor} style={{ backgroundColor: "#fff" }} />
    </div>
  );
};

export { BlockNote };
