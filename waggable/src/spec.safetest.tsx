import { describe, it, expect } from "safetest/jest";
import { render } from "safetest/react";
import Home from "./app/page";

describe("Home", () => {
  it("can render a regular header", async () => {
    const { page } = await render(<Home />);
    await expect(page.locator("text=Quiz")).toBeVisible();
    expect(await page.screenshot()).toMatchImageSnapshot();
  });
});
