import userEvent from "@testing-library/user-event";
import { Route } from "react-router-dom";
import { screen } from "@testing-library/react";

import { LoginForm } from "../components/LoginForm/LoginForm";

import { renderWithRouter } from "./testUtil";
import { fetchDataUtil } from "../utils/utils";

jest.mock("../utils/utils");

describe("LoginForm", () => {
  const user = userEvent.setup();
  let renderedValue;

  beforeEach(() => {
    renderedValue = renderWithRouter(
      () => (
        <>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<div />} />
        </>
      ),
      "/login",
    );
  });

  it("두개의 LOGIN 글자와 id, password 글자의 Placeholder가 있어야 한다.", () => {
    const { getAllByText } = renderedValue;

    expect(getAllByText("LOGIN").length).toBe(2);
    expect(screen.getByPlaceholderText("ID"));
    expect(screen.getByPlaceholderText("Password"));
  });

  it("LOGIN 버튼을 누르면 입력하지 않은 정보에 관한 에러메시지가 표시되어야 한다.", async () => {
    const { getByText } = renderedValue;

    const idInput = screen.getByPlaceholderText("ID");
    const button = screen.getByRole("button");

    await user.click(button);

    expect(getByText("Please enter your ID")).toBeInTheDocument();

    await userEvent.type(idInput, "testId");

    await user.click(button);

    expect(getByText("Please enter your password.")).toBeInTheDocument();
  });

  it("존재하지 않는 아이디라면 에러메시지가 표시되어야 한다.", async () => {
    fetchDataUtil.mockImplementation(() => {
      return { status: 400, message: "Incorrect Id." };
    });

    const { getByText } = renderedValue;

    const button = screen.getByRole("button");

    await userEvent.type(screen.getByPlaceholderText("ID"), "testId");

    await userEvent.type(screen.getByPlaceholderText("Password"), "Password");

    await user.click(button);

    expect(getByText("Incorrect Id.")).toBeInTheDocument();
  });

  it("잘못된 비밀번호라면 에러메시지가 표시되어야 한다.", async () => {
    fetchDataUtil.mockImplementation(() => {
      return { status: 400, message: "Incorrect Password." };
    });

    const { getByText } = renderedValue;

    const button = screen.getByRole("button");

    await userEvent.type(screen.getByPlaceholderText("ID"), "testId");

    await userEvent.type(screen.getByPlaceholderText("Password"), "Password");

    await user.click(button);

    expect(getByText("Incorrect Password.")).toBeInTheDocument();
  });

  it("서버에러가 나면 해당 status와 에러메시지가 표시되어야 한다.", async () => {
    fetchDataUtil.mockImplementation(() => {
      return { status: 500, message: "Internal server error." };
    });

    const { getByText } = renderedValue;

    const button = screen.getByRole("button");

    await userEvent.type(screen.getByPlaceholderText("ID"), "testId");

    await userEvent.type(screen.getByPlaceholderText("Password"), "Password");

    await user.click(button);

    expect(getByText(/500/i)).toBeInTheDocument();
    expect(getByText(/Internal server error./i)).toBeInTheDocument();
  });

  it("로그인에 성공하면 / 로 이동한다.", async () => {
    fetchDataUtil.mockImplementation(() => {
      return { status: 200, message: "Login success." };
    });

    const { history } = renderedValue;

    const button = screen.getByRole("button");

    await userEvent.type(screen.getByPlaceholderText("ID"), "testId");

    await userEvent.type(screen.getByPlaceholderText("Password"), "Password");

    await user.click(button);

    expect(history.location.pathname).toEqual("/");
  });
});
