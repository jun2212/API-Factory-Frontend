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

export const validationCode = () => {
  const [modalMessage, setModalMessage] = useState({});

  const validation = (code, name, onValidateValues) => {
    setModalMessage({});

    const indexOfFunctionName = code.indexOf("APIFunction");

    if (
      indexOfFunctionName === -1 ||
      (code[indexOfFunctionName + 11] !== " " &&
        code[indexOfFunctionName + 11] !== "(")
    ) {
      setModalMessage({
        title: "입력 오류",
        content: "함수 이름은 APIFunction 이어야 합니다.",
      });
      return false;
    }

    if (name === "") {
      setModalMessage({
        title: "생성  될 api의 이름을 입력해 주세요",
        content: "enter your function name",
      });

      return false;
    }

    if (onValidateValues !== null && onValidateValues !== 0) {
      const result = onValidateValues.filter(
        (markers) => markers.code !== "80001" && markers.code !== "6133",
      );

      if (result.length !== 0) {
        setModalMessage({
          title: `Start Line : ${result[0].startLineNumber}, Start Column : ${result[0].startColumn} `,
          content: result[0].message,
        });

        return false;
      }
    }

    return true;
  };

  return [modalMessage, setModalMessage, validation];
};
