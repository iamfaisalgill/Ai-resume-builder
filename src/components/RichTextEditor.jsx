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

export default function RichTextEditor({onRichTextEditorChange, defaultValue}) {
  const [value, setValue] = useState(defaultValue? defaultValue: '');

  function onChange(e) {
    setValue(e.target.value);
    onRichTextEditorChange(e)
  }

  return (
    <EditorProvider>
      <Editor value={value} onChange={onChange} className='min-h-48 max-h-48 overflow-auto'>
        <Toolbar >
        <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <Separator />
          <BtnBulletList /> 
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}