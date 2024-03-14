// proxy.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// Allow requests from localhost:3000
app.use(cors());