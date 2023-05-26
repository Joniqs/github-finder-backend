# Github Finder Backend

This is the backend server for the GitHub Finder application. It provides an API to search for GitHub users and retrieve their repositories.

# Prerequisites

Before running the backend server, make sure you have the following:

- Node.js installed on your machine
- Environment variables set up:
  - **PORT** : The port number on which the server will listen (optional, default is 5000)
  - **GITHUB_API_URL**: The base URL for the GitHub API
  - **GITHUB_API_TOKEN**: Your personal access token for the GitHub API

## Installation

1. Clone the repository:

```bash
    git clone git@github.com:Joniqs/github-finder-backend.git
```

2. Install the dependencies:

```bash
    git clone git@github.com:Joniqs/Feedback-app.git
    npm install
```

## Usage

1. Set the required environment variables in a .env file or through your preferred method.
2. Start the server:

```bash
    npm start
```

The server will start on the specified port or the default port (5000).

3. The server is now running and ready to accept requests.

## API Endpoints

**GET /search/users**

Search for GitHub users.

- Request URL: **/search/users?query=example**
- Response: JSON object containing search results

**GET /user/:login/repos**

Retrieve the repositories of a specific user on GitHub.

- Request URL: **/user/:login/repos**
- Parameters:
  - **:login** - The GitHub username of the user whose repositories are to be retrieved
- Response: JSON object containing the user's repositories

# Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
