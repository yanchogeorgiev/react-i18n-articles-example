import React, { useRef } from "react";
import { getIn, useField, useFormikContext } from "formik";
import { Editor } from "@tinymce/tinymce-react";
import Form from "react-bootstrap/Form";

export const EditorField = (props) => {
    return <Form.Control as={_EditorField} {...props} />;
};

const _EditorField = (props) => {
  const { label, name, ...otherProps } = props;
  const [field] = useField(name);
  const editorRef = useRef(null);
  const { errors } = useFormikContext();
  const err = getIn(errors, props.name);
  return (
    <>
      <div className={err ? "editor-invalid" : ""}>
        {label && <label>{label}</label>}
        <Editor
          {...otherProps}
          value={field.value}
          onEditorChange={(value, _editor) => {
            field.onChange({ target: { type: "text", name, value } });
          }}
          onBlur={(e, editor) => {
            field.onBlur({ target: { name } });
          }}
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          onInit={(evt, editor) => (editorRef.current = editor)}
          init={{
            height: 500,
            width: "100%",
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount anchor",
            ],
            toolbar: `undo redo | bold italic underline strikethrough blockquote | fontselect fontsizeselect formatselect |
            alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor |
            paste pastetext removeformat | charmap insertfile image media link | fullscreen  preview code | table anchor`,
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        ></Editor>
      </div>
      {err ? (
        <div className="invalid-feedback d-block">{err}</div>
      ) : ''}
    </>
  );
};
