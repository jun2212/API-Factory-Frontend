import { useState, useCallback } from "react";

export const useInput = (initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [value],
  );

  return { value, onChange: handleChange };
};

export const useValidationUserData = () => {
  const [idMessage, setIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const validation = (userId, password) => {
    if (userId === "") {
      setIdMessage("Please enter your ID");

      return true;
    }
    if (/^\s+|\s+$/g.test(userId)) {
      setIdMessage("There is a space before or after the ID.");

      return true;
    }
    if (userId.length < 4 || userId.length > 20) {
      setIdMessage("ID must be 4-20 characters");

      return true;
    }
    if (password === "") {
      setPasswordMessage("Please enter your password.");

      return true;
    }
    if (/^\s+|\s+$/g.test(password)) {
      setPasswordMessage("There is a space before or after the password.");

      return true;
    }
    if (password.length < 6 || password.length > 24) {
      setPasswordMessage("password must be 6-24 characters.");

      return true;
    }

    return false;
  };

  return [
    idMessage,
    passwordMessage,
    setIdMessage,
    setPasswordMessage,
    validation,
  ];
};
