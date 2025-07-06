import { render } from "vitest-browser-react";
import { expect, test } from "vitest";
import Pizza from "../components/Pizza.jsx";

test("alt text renders on pizza images", async () => {
  const screen = render(
    <Pizza
      name="My Favorite Pizza"
      description="super cool pizza"
      image="https://picsum.photos/200"
    />
  );

  const img = await screen.getByRole("img");

  await expect.element(img).toBeInTheDocument();
  await expect.element(img).toHaveAttribute("alt", "My Favorite Pizza");
  await expect.element(img).toHaveAttribute("src", "https://picsum.photos/200");
});
