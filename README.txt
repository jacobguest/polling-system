Client/server application with a React frontend and a Node.js/Express backend.

Prerequisites: 
    Node.js [https://nodejs.org/en/download]



To run the application:

Server:
    cd into "polling-server" directory
    run "npm i" to install dependencies
    run "npm start" to start the server

Client (In another terminal whilst the server is running):
    cd into "polling-client" directory
    run "npm i" to install dependencies
    run "npm start" to start the client


Testing
    To run frontend tests, cd into the client directory and run "npm test"
    To run backend tests, cd into the server directory and run "npm test"

Unfinished Work
    Although I made progress on all aspects of the application specified by the brief,
    I could do with more time to increase the testing coverage for both the frontend 
    and backend. Currently, I have implemented a few basic tests for both
    the client and server, but a larger testing suite that tests many different
    edge cases is essential.

    The current frontend tests are unit tests that make use of jest, which helps to mock the API calls
    and allow for the asynchronous nature that occurs in the application.

    The backend tests also use jest to call the API endpoints and ensure that the correct
    response is returned.

Hosting
    The application could be deployed using a platform such as AWS using EC2 virtual machines.

Database
    This application currently stores the polls and votes locally, but a more permanent option could be
    used such as MongoDB, a document-based database.

Potential Security Problems
    The level of error handling and input sanitization within the application would not be of a 
    high enough standard to deploy. As there is an interface between the client and server, all data 
    passing through the interface should be handled in a way that encompasses every different
    possibility to stop attackers.

Technology Choices
    Node.js/Express for backend and React for frontend.
    This allows JavaScript to be used in both ends of the application which simplified the 
    development process as a singular developer. In addition, React's component-based architecture
    encourages simplicity, splitting up the application into its relevant sections.