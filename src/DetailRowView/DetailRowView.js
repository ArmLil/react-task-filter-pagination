import React from "react";

export default ({ person }) => (
  <h1>
    <p>{person.firstName + " " + person.lastName}</p>
    Описание: <br />
    <textarea defaultValue={person.email} />
  </h1>
);
