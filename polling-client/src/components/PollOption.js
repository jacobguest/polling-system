// PollOption component represents a single option in a poll.
const PollOption = (props) => {
  return (
    <div className="data-item">
      {/* Apply "selected" class to the label if the user has selected this option. */}
      <label
        className={props.option.optionId === props.selectedOption ? "selected" : ""}
        htmlFor={props.option.optionId}
      >
        {props.option.optionText}
      </label>
      {/* Uses a custom styled version of radio inputs. */}
      <input
        type="radio"
        id={props.option.optionId}
        name={"poll-option"}
        onChange={() => props.handleOptionChange(props.option.optionId)} // Update state on change.
      ></input>
    </div>
  );
};

export default PollOption;
