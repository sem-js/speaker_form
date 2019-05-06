import React, { Fragment, useState } from "react";
import styled from "styled-components";

import useFormal from "@kevinwolf/formal-web";
import * as yup from "yup";

const formInitialValues = {
  name: "",
  email: "",
  bio: "",
  abstract: "",
  notes: "",
  "bot-field": ""
};

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  bio: yup.string().required(),
  notes: yup.string(),
  abstract: yup.string().required(),
  message: yup.string().required()
});

const Label = styled.label`
  display: block;
  width: 100%;
  font-family: sans-serif;
  font-weight: 800;
`;

const Input = styled.input`
  width: 100%;
  border: none;
  padding: 8px;
  margin: 4px 0;
`;

const FieldContainer = styled.div`
  width: 100%;
  padding: 0 0 1rem 0;
  font-family: sans-serif;
`;

const Button = styled.button`
  text-transform: uppercase;
  padding: 5px 10px;
  font-family: sans-serif;

  width: 90%;
  border: 2px solid #fcd947;
  color: #fcd947;
  font-size: 3rem;
  background-color: rgba(0, 0, 0, 0);

  &:focus {
    border: none;
  }
`;

const Centered = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Error = styled.small`
  font-famiy: sans-serif;
  color: #fc6e47;
  font-size: 1rem;
`;

function Field({ id, label, error, ...props }) {
  return (
    <FieldContainer>
      <Label htmlFor={id}>{label}</Label>
      {props.textArea ? (
        <Input id={id} name={id} rows={4} {...props} as="textarea" />
      ) : (
        <Input id={id} type="text" {...props} placeholder={label} />
      )}

      {error && <Error>{error}</Error>}
    </FieldContainer>
  );
}

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default function Form() {
  const [formFilled, setFormFilled] = useState(false);

  const formal = useFormal(formInitialValues, {
    schema,
    onSubmit: values => {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...values
        })
      })
        .then(() => setFormFilled(true))
        .catch(error => console.log(error));
    }
  });

  return formFilled ? (
    <h2>
      Thanks for your proposed talk - we'll be back with you once we've had a
      chance to review!
    </h2>
  ) : (
    <Fragment>
      <h2>Submit your lightning talk proposal</h2>
      <form
        {...formal.getFormProps()}
        name="contact"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <div hidden>
          <Field
            label="Do not fill this out"
            {...formal.getFieldProps("bot-field")}
          />
        </div>
        <Field label="Name" {...formal.getFieldProps("name")} />
        <Field label="Email" {...formal.getFieldProps("email")} />
        <Field
          label="Abstract"
          {...formal.getFieldProps("abstract")}
          textArea
        />
        <Field label="Notes" {...formal.getFieldProps("notes")} textArea />
        <Field label="Bio" {...formal.getFieldProps("bio")} textArea />
        <Centered>
          <Button {...formal.getSubmitButtonProps()}>Submit</Button>
        </Centered>
      </form>
    </Fragment>
  );
}