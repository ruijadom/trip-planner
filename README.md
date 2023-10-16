# Trip planner

- [Trip planner](#trip-planner)
  - [Description](#description)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Screenshots](#screenshots)


## Description

This project is a responsive web application built with ReactJS functional components and Typescript. It uses ChakraUI for UI components, fetches data asynchronously from a mock server serving JSON files, and implements infinite scrolling for loading new cards as the user scrolls. Data from the server is cached and preserved between pages. Additionally, there's a feature to pull details of a trip from a separate single-trip endpoint.

## Technologies Used
- React
- Typescript
- ChakraUI

## Installation

1. Clone the repository.
   ```bash
   git clone https://github.com/ruijadom/trip-planner.git
   cd trip-planner

2. Install dependencies.
   ```bash
   npm install
   ```

3. Start the development server.

    This command starts the mock server and the client app concurrently.


   ```bash
    npm run dev
    ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Screenshots

Trips view

![Image 1](./resources/trips.png)

Trip details view

![Image 2](./resources/trip-details.png)