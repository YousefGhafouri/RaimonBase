'use client'
import {Editor, IAllProps} from '@tinymce/tinymce-react';
import { createUploadHandler, EditorProps } from 'Base/utils/Editor';


const RaiRichTextEditor = ({editor_ref,...props}:IAllProps&{editor_ref:any}) => {
  

  return (
    <Editor
    tinymceScriptSrc={'/tinymce/tinymce.min.js'}
    {...props}
// @ts-ignore
    init={{
      ...EditorProps,
      // tinymceScriptSrc:process.env.PUBLIC_URL + "/tinymce/tinymce.min.js",
      images_upload_handler: createUploadHandler(),
      setup: function (editor) {
        editor_ref.current = editor
      },
      ...props?.init
    }}
  />
  );
}

export default RaiRichTextEditor