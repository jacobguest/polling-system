import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import Results from "./components/Results";
import Poll from "./components/Poll";
// Data used for testing.
import { mockPollData, mockVotesData } from "./mockPollData.js";

// Reset mocks before each test runs.
beforeEach(() => {
  fetch.resetMocks();
})

// Rendering results page.
it ("should show results page", async () => {
  // Mocking fetch using mockVotesData object.
  fetch.mockResponseOnce(JSON.stringify(mockVotesData));

  // Render the results page and expect to see specific text.
  render(<Results pollData={mockPollData} />);
  // As the fetch may take time, we must wait for the correct text.
  await waitFor(() => expect(screen.getByText("Thank you for your response.")).toBeInTheDocument());
});

// Rendering poll page.
it("should show the poll page", async () => {
    // Mocking fetch using mockPollData object.
    fetch.mockResponseOnce(JSON.stringify(mockPollData));
    render(<App />);

    // Logo should initially display.
    const logoElement = screen.getByAltText('logo');
    expect(logoElement).toBeInTheDocument();

    // The following assertions are all asynchronous as the pollData takes time to load.
    await waitFor(() => expect(screen.getByText(mockPollData.question)).toBeInTheDocument());
    for (let i = 0; i < mockPollData.options.length; i++) {
      await waitFor(() => expect(screen.getByText(mockPollData.options[i].optionText)).toBeInTheDocument());
    }
    await waitFor(() => expect(screen.getByText("Submit")).toBeInTheDocument());
});

// The loading page should be displayed if no pollData is provided.
it ("should show 'Loading...' if there is no pollData", () => {
  fetch.mockResponseOnce(JSON.stringify(null))
  render(<Poll pollData={null} />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

