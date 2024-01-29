const request = require("supertest");
const app = require("./server");

// Mock data for testing.
const mockPollData = {
  pollId: 1,
  pollName: "Premier League Winner",
  question: "Who will win the Premier League?",
  options: [
    {
      optionId: 1,
      optionText: "Manchester City",
    },
    {
      optionId: 2,
      optionText: "Arsenal",
    },
    {
      optionId: 3,
      optionText: "Liverpool",
    },
  ],
};

const mockVotesData = {
  pollId: 1,
  totalVotes: 0,
  votes: [
    {
      optionId: 1,
      count: 0,
    },
    {
      optionId: 2,
      count: 0,
    },
    {
      optionId: 3,
      count: 0,
    },
  ],
};

// Endpoint returns a poll.
describe("polls endpoint", () => {
  test("poll endpoint returns poll", async () => {
    const response = await request(app).get("/polls/1");
    expect(response.body).toEqual(mockPollData);
    expect(response.statusCode).toBe(200);
  });
});

// Endpoint returns current votes for a poll.
describe("votes endpoint", () => {
  test("votes endpoint returns current votes", async () => {
    const response = await request(app).get("/votes/1");
    expect(response.body).toEqual(mockVotesData);
    expect(response.statusCode).toBe(200);
  });
});
