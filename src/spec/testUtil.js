import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import {
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";

export const renderWithRouter = (renderComponent, route) => {
  const history = createMemoryHistory();

  if (route) {
    history.push(route);
  }

  return {
    ...render(
      <HistoryRouter history={history}>
        <Routes>{renderComponent()}</Routes>
      </HistoryRouter>,
    ),
    history,
  };
};
