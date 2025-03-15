import { useState } from 'react';
import {
    EditorProvider, 
    BtnBold,
    BtnBulletList,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnStyles,
    BtnUnderline,
    BtnUndo,
    HtmlButton,
    Separator,
    Toolbar,
    Editor,
  } from 'react-simple-wysiwyg';

export default function RichTextEditor({onRichTextEditorChange}) {
  const [value, setValue] = useState();

  function onChange(e) {
    setValue(e.target.value);
    onRichTextEditorChange(e)
  }

  return (
    <EditorProvider>
      <Editor value={value} onChange={onChange}  >
        <Toolbar>
        <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <BtnLink />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}