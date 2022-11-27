import userEvent from "@testing-library/user-event";
import { Route } from "react-router-dom";

import { NavBar } from "../components/NavBar/NavBar";
import { Error } from "../pages/Error/Error";

import { renderWithRouter } from "./testUtil";
import { fetchDataUtil } from "../utils/utils";

jest.mock("../utils/utils");

describe("NavBar", () => {
  const user = userEvent.setup();
  let renderedValue;

  describe("/login", () => {
    beforeEach(() => {
      renderedValue = renderWithRouter(
        () => (
          <>
            <Route path="/login" element={<NavBar />} />
            <Route path="/guide" element={<div />} />
            <Route path="/register" element={<div />} />
          </>
        ),
        "/login",
      );
    });

    it("API FACTORY LOGO와 GUIDE버튼 REGISTER버튼이 보여야 한다.", () => {
      const { getByText } = renderedValue;

      expect(getByText("API FACTORY")).toBeInTheDocument();
      expect(getByText("GUIDE")).toBeInTheDocument();
      expect(getByText("REGISTER")).toBeInTheDocument();
    });

    it("LOGO를 클릭해도 다른 주소로 이동하지 않아야 한다.", async () => {
      const { getByText, history } = renderedValue;

      await user.click(getByText("API FACTORY"));

      expect(history.location.pathname).toEqual("/login");
    });

    it("GUIDE 버튼을 누르면 /guide로 이동해야 한다.", async () => {
      const { getByText, history } = renderedValue;

      await user.click(getByText("GUIDE"));

      expect(history.location.pathname).toEqual("/guide");
    });

    it("REGISTER 버튼을 누르면 /register로 이동해야 한다.", async () => {
      const { getByText, history } = renderedValue;

      await user.click(getByText("REGISTER"));

      expect(history.location.pathname).toEqual("/register");
    });
  });

  describe("/register", () => {
    beforeEach(() => {
      renderedValue = renderWithRouter(
        () => (
          <>
            <Route path="/register" element={<NavBar />} />
            <Route path="/guide" element={<div />} />
            <Route path="/login" element={<div />} />
          </>
        ),
        "/register",
      );
    });

    it("API FACTORY LOGO와 GUIDE버튼 LOGIN버튼이 보여야 한다.", () => {
      const { getByText } = renderedValue;

      expect(getByText("API FACTORY")).toBeInTheDocument();
      expect(getByText("GUIDE")).toBeInTheDocument();
      expect(getByText("LOGIN")).toBeInTheDocument();
    });

    it("LOGO를 클릭해도 다른 주소로 이동하지 않아야 한다.", async () => {
      const { getByText, history } = renderedValue;

      await user.click(getByText("API FACTORY"));

      expect(history.location.pathname).toEqual("/register");
    });

    it("GUIDE 버튼을 누르면 /guide로 이동해야 한다.", async () => {
      const { getByText, history } = renderedValue;

      await user.click(getByText("GUIDE"));

      expect(history.location.pathname).toEqual("/guide");
    });

    it("REGISTER 버튼을 누르면 /register로 이동해야 한다.", async () => {
      const { getByText, history } = renderedValue;

      await user.click(getByText("LOGIN"));

      expect(history.location.pathname).toEqual("/login");
    });
  });

  describe("/etc", () => {
    beforeEach(() => {
      renderedValue = renderWithRouter(
        () => (
          <>
            <Route path="/etc" element={<NavBar />} />
            <Route path="/guide" element={<div />} />
            <Route path="/" element={<div />} />
            <Route path="/login" element={<div />} />
            <Route path="/error" element={<Error />} />
          </>
        ),
        "/etc",
      );
    });

    it("API FACTORY LOGO와 GUIDE버튼 LOGOUT버튼이 보여야 한다.", () => {
      const { getByText } = renderedValue;

      expect(getByText("API FACTORY")).toBeInTheDocument();
      expect(getByText("GUIDE")).toBeInTheDocument();
      expect(getByText("LOGOUT")).toBeInTheDocument();
    });

    it("LOGO를 클릭하면 메인 페이지(/)로 이동해야 한다.", async () => {
      const { getByText, history } = renderedValue;

      await user.click(getByText("API FACTORY"));

      expect(history.location.pathname).toEqual("/");
    });

    it("GUIDE 버튼을 누르면 /guide로 이동해야 한다.", async () => {
      const { getByText, history } = renderedValue;

      await user.click(getByText("GUIDE"));

      expect(history.location.pathname).toEqual("/guide");
    });

    it("LOGOUT 버튼을 누르고 LOGOUT이 성공하면 /login으로 이동 한다.", async () => {
      fetchDataUtil.mockImplementation(() => {
        return {status: 200, message: ""};
      })

      const { getByText, history } = renderedValue;

      await user.click(getByText("LOGOUT"));

      expect(history.location.pathname).toEqual("/login");
    });

    it("LOGOUT 버튼을 누르고 LOGOUT이 실패하면 /error로 이동 하고 화면에 status, message를 표시한다.", async () => {
      fetchDataUtil.mockImplementation(() => {
        return {status: 400, message: "bad request"};
      })

      const { getByText, history } = renderedValue;

      await user.click(getByText("LOGOUT"));

      expect(history.location.pathname).toEqual("/error");
      expect(getByText("status : 400")).toBeInTheDocument();
      expect(getByText("bad request")).toBeInTheDocument();
    });
  });
});
