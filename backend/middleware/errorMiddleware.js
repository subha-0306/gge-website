/**
 * Global Error Handling Middleware
 *
 * Catches all errors thrown in route handlers and returns
 * structured JSON error responses. Handles common Mongoose
 * errors (validation, cast, duplicate key) and JWT errors.
 */

// ── 404 Not Found handler ──
const notFound = (req, res, next) => {
  const error = new Error(`Not found — ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// ── Global error handler ──
const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || res.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // ── Mongoose bad ObjectId (CastError) ──
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // ── Mongoose validation error ──
  if (err.name === "ValidationError") {
    statusCode = 400;
    const messages = Object.values(err.errors).map((e) => e.message);
    message = messages.join(". ");
  }

  // ── Mongoose duplicate key error ──
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue).join(", ");
    message = `Duplicate value for field: ${field}`;
  }

  // ── JWT errors ──
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  }

  // ── Send response ──
  res.status(statusCode).json({
    success: false,
    message,
    // Include stack trace only in development
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };
