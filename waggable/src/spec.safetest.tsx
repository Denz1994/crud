import { describe, it, expect } from "safetest/jest";
import { render } from "safetest/react";
import Home from "./app/page";

describe("Home", () => {
  it("can render a regular header", async () => {
    const { page } = await render(<Home />);
    await expect(page.locator("text=Quiz")).toBeVisible();
    expect(await page.screenshot()).toMatchImageSnapshot();
  });
  it("can render a header with a question", async () => {
    const { page } = await render(<Home />);
    await expect(page.locator("text=What color is the sky?")).toBeVisible();
    expect(await page.screenshot()).toMatchImageSnapshot();
  });
  it("can render a header with a question and choices", async () => {
    const { page } = await render(<Home />);
    await expect(page.locator("text=blue")).toBeVisible();
    await expect(page.locator("text=green")).toBeVisible();
    await expect(page.locator("text=red")).toBeVisible();
    await expect(page.locator("text=orange")).toBeVisible();
    expect(await page.screenshot()).toMatchImageSnapshot();
  });
});
``;
