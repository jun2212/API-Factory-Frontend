import { screen, render } from "@testing-library/react";

import { GuideContent } from "../components/GuideContent/GuideContent";

describe("GuideContent", () => {
  const content = { __html: "hello word" };

  render(<GuideContent content={content}/>);

  it("prop으로 받은 html이 화면에 표시되어야 한다.", () => {
    expect(screen.getByText("hello word")).toBeInTheDocument();
  });
});
