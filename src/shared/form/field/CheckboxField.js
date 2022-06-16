import React from "react";
import { useFormikContext } from "formik";
import Form from "react-bootstrap/Form";

export const CheckboxField = (props) => {
  const { values, errors, handleChange } = useFormikContext();
  return (
    <>
      <Form.Check
        checked={!!values[props.name]}
        onChange={handleChange}
        isInvalid={!!errors[props.name]}
        {...props}
      />
      <Form.Control.Feedback type="invalid">
        {errors[props.name]}
      </Form.Control.Feedback>
    </>
  );
};
