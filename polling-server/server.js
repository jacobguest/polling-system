const express = require('express');
const app = express();

// Example poll data
const polls = [{
    "pollId": 1,
    "pollName": "Premier League Winner",
    "question": "Who will win the Premier League?",
    "options": [
        {
            "optionId": 1,
            "optionText": "Manchester City"
        },
        {
            "optionId": 2,
            "optionText": "Arsenal"
        },
        {
            "optionId": 3,
            "optionText": "Liverpool"
        }
    ]
}];

// Example initial vote data
const votes = [{
    "pollId": 1,
    "totalVotes": 0,
    "votes": [
        {
            "optionId": 1,
            "count": 0
        },
        {
            "optionId": 2,
            "count": 0
        },
        {
            "optionId": 3,
            "count": 0
        }
    ]
}];

// Endpoint to get a specific poll using pollId
app.get("/polls/:pollId", (req, res) => {
    const pollId = parseInt(req.params.pollId);
    // Must be a valid integer.
    if (!Number.isInteger(pollId) || pollId <= 0) {
        return res.status(400).json({ error: "Invalid pollId."})
    }
    // If the poll doesn't exist in polls, return error.
    const poll = polls.find(p => p.pollId === pollId);
    if (!poll) {
        return res.status(404).json({ error: "Poll does not exist."});
    } 
    
    // Return the correct poll.
    res.json(poll);
});

// Endpoint to get the votes data for a specific poll pollId.
app.get("/votes/:pollId", (req, res) => {
    const pollId = parseInt(req.params.pollId);
    // Must be a valid integer.
    if (!Number.isInteger(pollId) || pollId <= 0) {
        return res.status(400).json({ error: "Invalid pollId."})
    }

    // If the poll doesn't exist in polls, return an error message.
    const poll = polls.find(p => p.pollId === pollId);
    if (!poll) {
        return res.status(404).json({ error: "Poll does not exist."});
    }

    // Look to see if the votes for that poll exist already.
    let pollVotes = votes.find(p => p.pollId === pollId);
    // Create a new votes record for that poll
    if (!pollVotes) {
        // Creating the pollVotes object.
        pollVotes = {
            pollId: pollId,
            totalVotes: 0,
            votes: poll.options.map(option => ({
                optionId: option.optionId,
                count: 0
            }))
        };
        votes.push(pollVotes);
    }
    // Return the correct votes information.
    res.json(pollVotes);
});

// Endpoint to add a vote for a specific poll and option.
app.post("/votes/:pollId/:optionId", (req, res) => {
    const pollId = parseInt(req.params.pollId);
    const optionId = parseInt(req.params.optionId);

    // Must be a valid integer and must be a valid optionId.
    if (!Number.isInteger(pollId) || pollId <= 0) {
        return res.status(400).json({ error: "Invalid pollId."})
    }
    if (!Number.isInteger(optionId) || optionId <= 0 || optionId > 5) {
        return res.status(400).json({ error: "Invalid optionId."})
    }

    // Check if the poll specified exists, if not, return an error message.
    const poll = polls.find(p => p.pollId === pollId);
    if (!poll) {
        return res.status(404).json({ error: "Poll does not exist" });
    }

    // Check if the votes info exists.
    let pollVotes = votes.find(p => p.pollId === pollId);
    if (!pollVotes) {
        // Create a new entry for votes that has a count of 0 for all options.
        pollVotes = {
            pollId: pollId,
            totalVotes: 0,
            votes: poll.options.map(option => ({ optionId: option.optionId, count: 0 }))
        };
        votes.push(pollVotes);
    }

    // Find the option in the votes entry.
    const optionVotes = pollVotes.votes.find(o => o.optionId === optionId);
    // Return error message if option doesn't exist.
    if (!optionVotes) {
        return res.status(400).json({ error: "Option not found for the specified poll" });
    }
    
    // Increment the counter for that option and the total counter.
    optionVotes.count++;
    pollVotes.totalVotes++;

    // Return success message.
    return res.json({message: "Vote succesfully added."});
});

module.exports = app;
app.listen(5000, () => {console.log("Server started on port 5000.")});
