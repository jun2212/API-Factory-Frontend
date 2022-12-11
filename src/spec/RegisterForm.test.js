import userEvent from "@testing-library/user-event";
import { Route } from "react-router-dom";
import { screen } from "@testing-library/react";

import { RegisterForm } from "../components/RegisterForm/RegisterForm";

import { renderWithRouter } from "./testUtil";
import { fetchDataUtil } from "../utils/utils";

jest.mock("../utils/utils");

describe("RegisterForm", () => {
  const user = userEvent.setup();
  let renderedValue;

  beforeEach(() => {
    renderedValue = renderWithRouter(
      () => (
        <>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<div />} />
        </>
      ),
      "/register",
    );
  });

  it("두개의 REGISTER 글자와 id, password, Confirm Password 글자의 Placeholder가 있어야 한다.", () => {
    const { getAllByText } = renderedValue;

    expect(getAllByText("REGISTER").length).toBe(2);
    expect(screen.getByPlaceholderText("ID"));
    expect(screen.getByPlaceholderText("Password"));
    expect(screen.getByPlaceholderText("Confirm Password"));
  });

  it("REGISTER 버튼을 눌렀을 때 입력하지 않은 정보가 있거나 두 비밀번호가 일치하지 않으면 에러메시지가 표시되어야 한다.", async () => {
    const { getByText } = renderedValue;

    const idInput = screen.getByPlaceholderText("ID");
    const passwordInput = screen.getByPlaceholderText("Password");
    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");
    const button = screen.getByRole("button");

    await user.click(button);

    expect(getByText("Please enter your ID")).toBeInTheDocument();

    await userEvent.type(idInput, "testId");

    await user.click(button);

    expect(getByText("Please enter your password.")).toBeInTheDocument();

    await userEvent.type(passwordInput, "password");

    await user.click(button);

    expect(getByText("The two passwords do not match.")).toBeInTheDocument();

    await userEvent.type(confirmPasswordInput, "different password");

    await user.click(button);

    expect(getByText("The two passwords do not match.")).toBeInTheDocument();
  });

  it("이미 존재하는 아이디라면 에러메시지가 표시되어야 한다.", async () => {
    fetchDataUtil.mockImplementation(() => {
      return { status: 400, message: "The ID already exists" };
    });

    const { getByText } = renderedValue;

    const button = screen.getByRole("button");

    await userEvent.type(screen.getByPlaceholderText("ID"), "testId");

    await userEvent.type(screen.getByPlaceholderText("Password"), "Password");

    await userEvent.type(screen.getByPlaceholderText("Confirm Password"), "Password");

    await user.click(button);

    expect(getByText("The ID already exists")).toBeInTheDocument();
  });

  it("서버 에러가 나면 해당 status와 에러메시지가 표시되어야 한다.", async () => {
    fetchDataUtil.mockImplementation(() => {
      return { status: 500, message: "Internal server error." };
    });

    const { getByText } = renderedValue;

    const button = screen.getByRole("button");

    await userEvent.type(screen.getByPlaceholderText("ID"), "testId");

    await userEvent.type(screen.getByPlaceholderText("Password"), "Password");

    await userEvent.type(screen.getByPlaceholderText("Confirm Password"), "Password");

    await user.click(button);

    expect(getByText(/500/i)).toBeInTheDocument();
    expect(getByText(/Internal server error./i)).toBeInTheDocument();
  });

  it("회원가입에 성공하면 /login 으로 이동한다.", async () => {
    fetchDataUtil.mockImplementation(() => {
      return { status: 200, message: "register success." };
    });

    const { history } = renderedValue;

    const button = screen.getByRole("button");

    await userEvent.type(screen.getByPlaceholderText("ID"), "testId");

    await userEvent.type(screen.getByPlaceholderText("Password"), "Password");

    await userEvent.type(screen.getByPlaceholderText("Confirm Password"), "Password");

    await user.click(button);

    expect(history.location.pathname).toEqual("/login");
  });
});
