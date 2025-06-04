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

  

  return (
    <EditorProvider>
      <Editor value={defaultValue} onChange={e=>onRichTextEditorChange(e)}>
        <Toolbar >
        <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList /> 
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
}