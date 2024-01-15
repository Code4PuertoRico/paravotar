import { expect, test, it } from "vitest";
import { render } from "@testing-library/react";
import IndexPage from "../practica";

test("Example test", () => {
  it("renders title", () => {
    const { queryAllByText } = render(<IndexPage />);
    expect(queryAllByText("Pratica Tu Voto")).toBeDefined();
  });
});
