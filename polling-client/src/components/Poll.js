import { useState } from "react";
import PollOption from "./PollOption";
import "./Poll.css";

// Poll page allows the user to select and submit a vote on a poll.
const Poll = (props) => {
  // Keep track of selected poll option.
  const [selectedOption, setSelectedOption] = useState(null);
  // Change the option to the user selected option.
  const handleOptionChange = (optionId) => {setSelectedOption(optionId);};

  // Handler to submit a vote.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Post request to submit the vote with pollId and the selectedOption as params.
    fetch(`/votes/${props.pollData.pollId}/${selectedOption}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
    // Switch to the results screen.
    props.handleScreenChange();
  };

  return (
    <div className="App-poll">
      {/* pollData may not be loaded yet. */}
      {!(props.pollData) || !(props.pollData.options) ? (
        <p className="loading">Loading...</p>
      ) : (
        // Display the poll question and options.
        <div className="data">
          <div className="data-heading">{props.pollData.question}</div>
          <form className="data-list" onSubmit={handleSubmit}>
            {props.pollData.options.map((option) => (
              <PollOption
                key={option.optionId}
                option={option}
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
              />
            ))}
            {/* User must click to submit. */}
            <input className="poll-submit" type="submit" value="Submit"></input>
          </form>
        </div>
      )}
    </div>
  );
};

export default Poll;
