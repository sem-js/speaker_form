import React from "react";

import Layout from "./Layout";

import Form from "./Form";

export default function Main() {
  return (
    <Layout>
      <div className="container">
        <p>
          Help us celebrate SEMjs' birthday by submitting a lightning talk!
          Lightning talks are quick tech talks (approx. 5 minutes). This allows
          us cover a wide variety of topics in a short amount of time.{" "}
          <a href="https://software.ac.uk/home/cw11/giving-good-lightning-talk">
            See more on lightning talks here
          </a>
        </p>
        <Form />
      </div>
    </Layout>
  );
}
