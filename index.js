require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const querystring = require('querystring');

const app = express();
const PORT = process.env.PORT || 5000;
const GITHUB_API_URL = process.env.GITHUB_API_URL;
const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN;

app.use(cors({
  origin: 'https://jonatan-kwiatkowski-github-finder.vercel.app/',
  credentials: true
}));

const setAuthHeader = (req, res, next) => {
  if (req.path.startsWith('/user')) {
    req.headers.authorization = `token ${GITHUB_API_TOKEN}`;
  }
  next();
};

app.use(setAuthHeader);

const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: 'Server error' });
};

app.get('/search/users', async (req, res) => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/search/users?${req.url.split('?')[1]}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/user/:login', async (req, res) => {
  try {
    const { login } = req.params;
    const response = await fetch(`${GITHUB_API_URL}/users/${login}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

app.get('/user/:login/repos', async (req, res) => {
  try {
    const { login } = req.params;
    const query = querystring.stringify({ sort: 'created', per_page: 10 });
    const response = await fetch(`${GITHUB_API_URL}/users/${login}/repos?${query}`);
    const data = await response.json();
    console.log(data)
    res.json(data);
  } catch (error) {
    handleError(res, error);
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});