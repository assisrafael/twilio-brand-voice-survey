import React, { useState } from "react";
import ReactDOM from "react-dom";
import { SurveyForm } from "./SurveyForm";
import { SurveyMessage } from "./SurveyMessage";

const App = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function onSubmit() {
    setIsSubmitted(true);
  }

  return (
    <React.Fragment>
      <header>
        <h1>Welcome to {process.env.BRAND_NAME}</h1>
      </header>

      <main>
        <p>Partipate in a survey with us to get an incredible promotion!</p>

        {!isSubmitted ? <SurveyForm onSubmit={onSubmit} /> : <SurveyMessage />}
      </main>

      <footer>
        <p>Copyright {process.env.BRAND_NAME} Inc</p>
      </footer>
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
