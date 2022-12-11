import userEvent from "@testing-library/user-event";
import { screen, render } from "@testing-library/react";

import { TableOfContents } from "../components/TableOfContents/TableOfContents";
import { GUIDE_CONTENT } from "../config/constants";

describe("TableOfContents", () => {
  const user = userEvent.setup();

  it("GUIDE_CONTENT 인자들의 TITLE이 화면에 표시되어야 한다.", async () => {
    const setContent = jest.fn();

    render(<TableOfContents setContent={setContent} />);

    GUIDE_CONTENT.forEach((item) => {
      expect(screen.getByText(item["TITLE"])).toBeInTheDocument();
    });
  });

  it("TITLE을 클릭하면 setContent함수를 해당 TITLE의 CONTENT를 파라미터로 실행한다.", async () => {
    const setContent = jest.fn();

    render(<TableOfContents setContent={setContent} />);

    GUIDE_CONTENT.forEach(async (item, index) => {
      const TITLE = screen.getByText(item["TITLE"]);

      await user.click(TITLE);

      expect(setContent).toBeCalledWith({
        __html: GUIDE_CONTENT[index]["CONTENT"],
      });
    });
  });
});
