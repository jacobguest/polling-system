import logo from "./assets/logo.png";
import "./App.css";
import { useState, useEffect } from "react";
import Poll from "./components/Poll";
import Results from "./components/Results";

function App() {
  
  // Track the current screen.
  const [currentScreen, setCurrentScreen] = useState("pollingScreen");
  // Toggle between the screens.
  const handleScreenChange = () => {
    if (currentScreen === "pollingScreen")
      setCurrentScreen("resultsScreen");
    else
      setCurrentScreen("pollingScreen");
  }

  const [pollData, setPollData] = useState(null);
  // Fetching poll data of example poll 1.
  useEffect(() => {
    fetch("/polls/1")
      .then((response) => response.json())
      .then((data) => {
        setPollData(data); // Store the data with useState.
      })
  }, []);

  return (
    <div className="App">
      {/* Header with logo. */}
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      {/* Conditional rendering based on the current screen. */}
      {currentScreen === "pollingScreen" && (<Poll pollData={pollData} handleScreenChange={handleScreenChange}/>)}
      {currentScreen === "resultsScreen" && (<Results pollData={pollData}/>)}
    </div>
  );
}

export default App;
