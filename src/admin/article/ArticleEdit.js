import React from "react";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import config from "./../../config.json";
import { Formik } from "formik";
import * as yup from "yup";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import Button from "react-bootstrap/Button";
import { DatePickerField } from "shared/form/field/DatePickerField";
import { EditorField } from "shared/form/field/EditorField";
import { FormRow } from "shared/form/FormRow";
import { TextField } from "shared/form/field/TextField";
import { CheckboxField } from "shared/form/field/CheckboxField";
import { useHistory, useParams } from "react-router-dom";
import ArticleModel from "models/article.model";

export default function ArticleEdit() {
  const history = useHistory();
  const { locale, id } = useParams();
  const model = new ArticleModel();
  let initialValues = {
    active: true,
  };
  if (id) {
    initialValues = model.get(id);
  }
  
  
  return (
    <>
      <h2>{id ? 'Edit' : 'Add'} Article</h2>
      <Formik
        validationSchema={validationSchema()}
        onSubmit={(v) => {
          model.save(v, id);
          history.push(`/admin/${locale}/articles`);
        }}
        initialValues={initialValues}
      >
        {({ handleSubmit }) => (
          <Form className="admin-form" noValidate onSubmit={handleSubmit}>
            <Tabs>
              {config.languages.map((lang) => (
                <Tab key={lang.locale} eventKey={lang.locale} title={lang.name}>
                  <LocalisedFields lang={lang} />
                </Tab>
              ))}
            </Tabs>
            <CommonFields />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </>
  );
}

function validationSchema() {
  const i18nSchema = {};
  config.languages.forEach(lang => {
    i18nSchema[lang.locale] = yup.object({
      title: yup.string().required(),
      content: yup.string().required(),
    });
  });
  return yup.object().shape({
    i18n: yup.object({...i18nSchema}),
    date: yup.string().required().nullable(),
  });
}

function LocalisedFields({ lang }) {
  return (
    <>
      <FormRow label="Title:" required>
        <TextField
          placeholder="Enter article title"
          name={`i18n.${lang.locale}.title`}
        />
      </FormRow>
      <FormRow label="Content:" required>
        <EditorField name={`i18n.${lang.locale}.content`} />
      </FormRow>
    </>
  );
}

function CommonFields() {
  return (
    <>
      <FormRow label="Date:" required>
        <DatePickerField name="date" />
      </FormRow>
      <Form.Row>
        <Form.Group className="col offset-lg-2">
          <CheckboxField name="active" label="Is Active" />
        </Form.Group>
      </Form.Row>
    </>
  );
}
