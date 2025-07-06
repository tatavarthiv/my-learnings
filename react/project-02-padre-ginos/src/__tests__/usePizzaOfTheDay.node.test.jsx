import { expect, test, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import createFetchMock from "vitest-fetch-mock";
import { usePizzaOfTheDay } from "../hooks/usePizzaOfTheDay.jsx";

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

const testPizza = {
  id: "calabrese:",
  name: "Calabrese",
  category: "Supreme",
  description: "A pizza with calabrese",
  image: "/public/pizzas/calabrese.webp",
  size: { S: 12.25, M: 14.5, L: 16.5 },
};

test("gives null when first called", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  expect(result.current).toBeNull();
});

test("to call the api and give back pizza of the day", async () => {
  fetchMocker.mockResponseOnce(JSON.stringify(testPizza));
  const { result } = renderHook(() => usePizzaOfTheDay());
  await waitFor(() => {
    expect(result.current).toEqual(testPizza);
  });
  expect(fetchMocker).toBeCalledWith("/api/pizza-of-the-day");
});
