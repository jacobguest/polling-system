import { useState, useEffect } from "react";
import "./Results.css";

// Results page displays the current percentage votes for each option in a poll.
const Results = (props) => {
  // State to store the vote data from a specific poll.
  const [votesData, setVotesData] = useState(null);

  // Fetch vote data from the server from the specified example poll 1.
  useEffect(() => {
    fetch("/votes/1")
      .then((response) => response.json())
      .then((data) => {
        // Create a new array to store the percentage and name of the option.
        // This is the information being displayed on the results screen.
        const results = [];
        // The percentage is calculated for each option.
        data.votes.forEach((vote, i) => {
          results.push({
            optionText: props.pollData.options[i].optionText,
            percentage: Math.round((vote.count / data.totalVotes) * 100) 
          });
        });

        // Sort the array by descending order of percentage and update state.
        results.sort((a, b) => b.percentage - a.percentage);
        setVotesData(results);
      });
  }, []);

  return (
    <div className="App-poll">
      {/* votesData may not be loaded yet. */}
      {!votesData ? (
        <p className="loading">Loading...</p>
      ) : (
        // Display the voting results.
        <div className="data">
          <div className="data-heading">Thank you for your response.</div>
          <div className="data-list">
          {/* Display each option and its percentage */}
          {votesData.map((result, i) => (
              <div key={i} className="data-item">
                {/* Fill a horizontal bar based on the percentage. */}
                <div className="percentage-fill" style={{width: `${result.percentage}%`}}></div>
                <div className="percentage-label">{result.optionText}</div>
                <div className="percentage-num">{result.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
