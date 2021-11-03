import React, { useState } from "react";

export function SurveyForm({ onSubmit }) {
  const [formState, setFormState] = useState({
    firstName: "",
    phoneNumber: "",
  });

  function handleInput({ target: { name, value } }) {
    setFormState((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function onFormSubmit(e) {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);
    const pageToken = searchParams.get("pageToken");

    fetch("/call", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ customer: formState, pageToken }),
    }).then((res) => {
      if (res.ok) {
        onSubmit();
      } else {
        res.text().then((errorText) => {
          console.log(errorText);
        });
      }
    });
  }

  return (
    <form onSubmit={onFormSubmit}>
      <p>
        <label htmlFor="customerFirstName">First name</label>
        <input
          name="firstName"
          id="customerFirstName"
          type="text"
          required
          onChange={handleInput}
        />
      </p>

      <p>
        <label htmlFor="customerPhoneNumber">Phone number</label>
        <input
          name="phoneNumber"
          id="customerPhoneNumber"
          type="tel"
          required
          onChange={handleInput}
        />
      </p>

      <button type="submit">Submit</button>
    </form>
  );
}
