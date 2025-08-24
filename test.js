const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

// Secret key for signing JWT (in production, use environment variable)
const JWT_SECRET = "your-secure-secret-key";

// Middleware to parse JSON bodies and cookies
app.use(express.json());
app.use(cookieParser());

// Simulated user database (replace with real database in production)
const users = [
  { id: 1, username: "user1", password: "password123" },
];

// Middleware to sign and save JWT in a cookie
const signAndSaveJwt = (req, res, next) => {
  const { username, password } = req.body;

  // Find user (simplified authentication logic)
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create JWT payload
  const payload = {
    sub: user.id,
    username: user.username,
    iat: Math.floor(Date.now() / 1000), // Issued at
    exp: Math.floor(Date.now() / 1000) + (15 * 60), // Expires in 15 minutes
  };

  // Sign JWT
  const token = jwt.sign(payload, JWT_SECRET);

  // Set JWT in a secure cookie
  res.cookie("jwt", token, {
    httpOnly: true, // Prevents JavaScript access
    secure: true, // Requires HTTPS (set to false for local development without HTTPS)
    sameSite: "Strict", // Prevents CSRF
    maxAge: 15 * 60 * 1000, // Cookie expires in 15 minutes (matches JWT)
  });

  req.user = payload; // Attach user data to request for downstream use
  next();
};

// Middleware to verify JWT from cookie
const verifyJwt = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded payload to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Login route to authenticate and set JWT cookie
app.post("/login", signAndSaveJwt, (req, res) => {
  res.json({ message: "Login successful", user: req.user });
});

// Protected route requiring JWT authentication
app.get("/protected", verifyJwt, (req, res) => {
  res.json({ message: "Access granted to protected resource", user: req.user });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
