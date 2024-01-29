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
  totalVotes: 6,
  votes: [
    {
      optionId: 1,
      count: 1,
    },
    {
      optionId: 2,
      count: 3,
    },
    {
      optionId: 3,
      count: 2,
    },
  ],
};

export { mockPollData, mockVotesData };
