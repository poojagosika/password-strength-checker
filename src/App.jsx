import React, { useState } from "react";
import Hooks from "./hooks";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [nameIsValid, setNameIsValid] = useState(true);
  const [emailIsValid, setEmailIsValid] = useState(true);

  const checkPasswordStrength = (password) => {
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()\-+]/.test(password);
    const hasDigit = /\d/.test(password);
    const isLengthValid = password.length >= 8;

    const conditions = [
      hasLowerCase,
      hasUpperCase,
      hasSpecialChar,
      hasDigit,
      isLengthValid,
    ].filter(Boolean).length;

    if (conditions <= 2) {
      setStrength("weak");
    } else if (conditions >= 3 && conditions <= 4) {
      setStrength("medium");
    } else if (conditions === 5) {
      setStrength("strong");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    setEmailIsValid(emailPattern.test(email));
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameIsValid(name.length >= 3);
  };

  return (
    <div className="container mt-5">
      <h1>Password Strength Checker</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={handleNameChange}
          />
          {!nameIsValid && (
            <p style={{ color: "red" }}>Name must be at least 3 characters.</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleEmailChange}
          />
          {!emailIsValid && (
            <p style={{ color: "red" }}>Enter a valid email address.</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              checkPasswordStrength(e.target.value);
            }}
          />
          <p
            style={{
              color:
                strength === "weak"
                  ? "red"
                  : strength === "medium"
                  ? "yellow"
                  : "green",
            }}
          >
            {strength ? `Password is ${strength}` : ""}
          </p>
        </div>

        {name && email && password && strength === "strong" ? (
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!nameIsValid || !emailIsValid}
          >
            Register
          </button>
        ) : (
          <button type="submit" className="btn btn-primary" disabled>
            Register
          </button>
        )}
      </form>
      <Hooks />
    </div>
  );
};

export default App;



// login and signup using usereducer
