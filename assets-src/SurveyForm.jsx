import React, { useState } from "react";

export function SurveyForm({ onSubmit }) {
  const [hasErrorMessage, setHasErrorMessage] = useState(false);
  const [formState, setFormState] = useState({
    firstName: "",
    phoneNumber: "",
  });

  function handleInput({ target: { name, value } }) {
    setHasErrorMessage(false);
    setFormState((state) => ({
      ...state,
      [name]: value,
    }));
  }

  function onFormSubmit(e) {
    setHasErrorMessage(false);
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
          console.error(errorText);
          setHasErrorMessage(true);
        });
      }
    });
  }

  return (
    <form onSubmit={onFormSubmit}>
      {hasErrorMessage && (
        <p className="alert alert-warning">
          Unfortunately we were not able to store your contact information.
          Please try again later or contact us by email
        </p>
      )}
      <div className="mb-3">
        <label htmlFor="customerFirstName" className="form-label">
          First name
        </label>
        <input
          name="firstName"
          id="customerFirstName"
          className="form-control"
          type="text"
          minLength="2"
          required
          onChange={handleInput}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="customerPhoneNumber" className="form-label">
          Phone number
        </label>
        <input
          name="phoneNumber"
          id="customerPhoneNumber"
          className="form-control"
          type="tel"
          required
          onChange={handleInput}
        />
      </div>

      <div className="d-grid d-md-block">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
