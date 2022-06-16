
import React from "react";
import { getIn, useFormikContext } from "formik";
import Form from "react-bootstrap/Form";

export const TextField = (props) => {
  const { values, errors, handleChange } = useFormikContext();
  const err = getIn(errors, props.name);
    return (<>
        <Form.Control
            type="text"
            value={getIn(values, props.name) || ''}
            onChange={handleChange}
            isInvalid={!!err}
            {...props}
          />
          <Form.Control.Feedback type="invalid">
            {err}
          </Form.Control.Feedback>
    </>);
}
