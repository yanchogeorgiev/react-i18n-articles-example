import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export const FormRow = (props) => {
  return (
    <Form.Row className={props.required ? 'required' : ''}>
      <Form.Label column lg="2">
        {props.label}
      </Form.Label>
      <InputGroup className="col" hasValidation>
        {props.children}
      </InputGroup>
    </Form.Row>
  );
};
