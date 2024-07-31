import { test, expect } from "@playwright/test";

/** @param page {import("@playwright/test").Page} */
const standardChecks = async (page) => {
  // Trigger the information notification (sporadically fails with mocked time)
  await Promise.all([
    expect
      .soft(page.getByText("You clicked on the info button."))
      .toBeVisible(),
    page.getByTestId("info").click(),
  ]);

  // Open the dialog (never fails)
  await page.getByRole("button", { name: "Click to open the Dialog" }).click();

  // Check the select list values (always fails when time is mocked)
  await page.getByTestId("select").click();
  for (let option = 1; option <= 5; option++) {
    await expect
      .soft(page.getByRole("listitem").getByText(`Option${option}`))
      .toBeVisible();
  }
};

test("works without mock clock", async ({ page }) => {
  await page.goto("/");
  await standardChecks(page);
});

test.fail("fails with mock clock", async ({ page }) => {
  await page.clock.install();
  await page.goto("/");
  await page.clock.fastForward("30:00");
  await standardChecks(page);
});
