import React, { Fragment, useState } from "react";
import styled from "styled-components";

import useFormal from "@kevinwolf/formal-web";
import * as yup from "yup";

const formInitialValues = {
  name: "",
  email: "",
  title: "",
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
  title: yup.string().required(),
  bio: yup.string().required(),
  notes: yup.string(),
  abstract: yup.string().required()
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
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const Error = styled.small`
  font-famiy: sans-serif;
  color: #fc6e47;
  font-size: 1rem;
`;

function Field({ id, label, description, error, ...props }) {
  return (
    <FieldContainer>
      <Label htmlFor={id}>{label}</Label><span>{description}</span>
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
      const body = encode({
        "form-name": "contact",
        ...values
      });

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body
      })
        .then(() => setFormFilled(true))
        .catch(error => console.log(error));
    }
  });

  const submitButtonProps = formal.getSubmitButtonProps();
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
        <Field label="Name*" {...formal.getFieldProps("name")} />
        <Field label="Email*" {...formal.getFieldProps("email")} />
        <Field label="Title*" description="A short sentence or phrase to grab the imagination" {...formal.getFieldProps("title")} />
        <Field
          label="Abstract*"
          description="This will be used as the description on the meetup.com notice"
          {...formal.getFieldProps("abstract")}
          textArea
        />
        <Field label="Notes" description="Anything you want to tell the organizers, but not have included in the event notice" {...formal.getFieldProps("notes")} textArea />
        <Field label="Bio*" description="Give us a few sentences about yourself (in the third person)." {...formal.getFieldProps("bio")} textArea />
        <Centered>
          {submitButtonProps.disabled && (
            <p>
              <small>Button will be enabled after filling out form</small>
            </p>
          )}
          <Button {...submitButtonProps}>Submit</Button>
        </Centered>
      </form>
    </Fragment>
  );
}
