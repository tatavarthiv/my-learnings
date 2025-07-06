import { render, screen, cleanup } from "@testing-library/react";
import { expect, test, vi, afterEach } from "vitest";
import createFetchMock from "vitest-fetch-mock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route } from "../routes/contact.lazy.jsx";

afterEach(cleanup);

const queryClient = new QueryClient();

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

test("can submit a contact form", async () => {
  fetchMocker.mockResponse(JSON.stringify({ status: "ok" }));
  const screen = render(
    <QueryClientProvider client={queryClient}>
      <Route.options.component />
    </QueryClientProvider>
  );

  const nameInput = screen.getByPlaceholderText("Name");
  const emailInput = screen.getByPlaceholderText("Email");
  const messageTextarea = screen.getByPlaceholderText("Message");

  const testData = {
    name: "John Doe",
    email: "john.doe@example.com",
    message: "Hello, world!",
  };

  nameInput.value = testData.name;
  emailInput.value = testData.email;
  messageTextarea.value = testData.message;

  const btn = screen.getByRole("button", { name: "Submit" });
  btn.click();

  const h3 = await screen.findByRole("heading", { level: 3 });

  expect(h3.innerText).toContain("Thank you for your message!");

  const requests = fetchMocker.requests();
  expect(requests.length).toBe(1);
  expect(requests[0].url).toBe("/api/contact");
  expect(fetchMocker).toHaveBeenCalledWith(
    "/api/contact",
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify(testData),
      headers: {
        "Content-Type": "application/json",
      },
    })
  );
});
