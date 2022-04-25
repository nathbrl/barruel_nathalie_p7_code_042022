const limiter = require("express-rate-limit");

const loginLimiter = limiter({
  windowMs: 1 * 60 * 1000,
  max: 3,
  standardHeaders: true,
  legacyHeaders: false,
  message:
    "Vous avez utilisé toutes vos tentatives de connections, veuillez réessayer dans 1 minute.",
});

module.exports = loginLimiter;