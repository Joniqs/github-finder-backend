const express = require('express');
const cors = require('cors');
const axios = require('axios');
const axiosRetry = require('axios-retry');
const querystring = require('querystring');

const app = express();
const PORT = process.env.PORT || 5000;
const GITHUB_API_URL = process.env.GITHUB_API_URL;
const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;

/**
 * Cross-origin resource sharing middleware.
 * @type {function}
 */
app.use(cors({
  origin: 'https://jonatan-kwiatkowski-github-finder.vercel.app',
  credentials: true
}));

/**
 * Middleware to set the Authorization header for requests to the GitHub API.
 * @type {function}
 */
const setAuthHeader = (req, res, next) => {
  if (req.path.startsWith('/user')) {
    req.headers.authorization = `token ${GITHUB_API_TOKEN}`;
  }
  next();
};

app.use(setAuthHeader);

/**
 * Helper function to handle errors.
 * @type {function}
 */
const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Server error' });
};

/**
 * Axios HTTP client instance for the GitHub API.
 * @type {object}
 */
const github = axios.create({
  baseURL: GITHUB_API_URL,
  withCredentials: true
});

/**
 * Add retry functionality to the Axios HTTP client for the GitHub API.
 */
axiosRetry(github, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay
});

/**
 * Search for GitHub users.
 *
 * @name GET /search/users
 * @function
 * @memberof app
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {string} req.url - The URL of the search query.
 * @return {object} - The search results.
 */
app.get('/search/users', async (req, res) => {
  try {
    const response = await github.get(`/search/users?${req.url.split('?')[1]}`);
    const data = response.data;
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * Get information about a GitHub user.
 *
 * @name GET /user/:login
 * @function
 * @memberof app
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {string} req.params.login - The username of the user to retrieve.
 * @return {object} - The user information.
 */

/**
 * GET request to retrieve the repositories of a specific user on GitHub.
 *
 * @function
 * @async
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @param {string} req.params.login - The GitHub username of the user whose repositories are to be retrieved.
 * @returns {Promise<void>} - A Promise that resolves when the response is sent.
 */
app.get('/user/:login/repos', async (req, res) => {
  try {
    const { login } = req.params;
    const query = querystring.stringify({ sort: 'created', per_page: 10 });
    const response = await github.get(`/users/${login}/repos?${query}`);
    const data = response.data;
    console.log(data)
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

/**
 * Start the server.
 *
 * @function
 * @param {number} PORT - The port number to listen on.
 * @returns {void}
 */
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});