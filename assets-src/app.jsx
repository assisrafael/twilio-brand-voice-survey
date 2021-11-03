import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SurveyForm } from "./SurveyForm";
import { SurveyMessage } from "./SurveyMessage";

import styles from "./app.css";

const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function onSubmit() {
    setIsSubmitted(true);
  }

  return (
    <div>
      <header className="mb-5 text-center">
        <h1 className="h2">Welcome to {process.env.BRAND_NAME}</h1>
      </header>

      <main className={styles.main}>
        {!isSubmitted ? (
          <>
            <h2 className="h5 mb-4 text-center">
              Partipate in a survey with us to get an incredible promotion!
            </h2>
            <SurveyForm onSubmit={onSubmit} />
          </>
        ) : (
          <SurveyMessage />
        )}
      </main>

      <footer className="mt-5">
        <p>Copyright {process.env.BRAND_NAME} Inc</p>
      </footer>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
