import React from "react";
import { useField, useFormikContext } from "formik";
import { default as ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";

export const DatePickerField = (props) => {
  const { touched, errors, values, handleChange } = useFormikContext();
  return (
    <Form.Control
      as={_DatePickerField}
      {...props}
      isInvalid={touched && !!errors[props.name]}
      onChange={handleChange}
      value={values[props.name]}
    />
  );
};

const _DatePickerField = ({ ...props }) => {
  if (props.value) {
    props.value = new Date(props.value);
  }
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(props);
  return (
    <>
      <ReactDatePicker
        {...field}
        {...props}
        autoComplete="off"
        dateFormat="dd.MM.yyyy"
        selected={(field.value && new Date(field.value)) || null}
        onChange={(val) => {
          console.log(val);
          setFieldValue(field.name, val);
        }}
      />
      {meta.touched && meta.error ? (
        <div className="invalid-feedback d-block">{meta.error}</div>
      ) : null}
    </>
  );
};
