export const handleCorsAction = (req, callback) => {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:3000",
    "https://localhost:5173",
    "https://127.0.0.1:5173",
    "https://localhost:3000",
  ];
  const origin = req.header("Origin");

  if (allowedOrigins.includes(origin)) {
    callback(null, {
      origin: origin, // Dynamically set the Origin header,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Content-Disposition",
      ],
      credentials: true, // Allow cookies and credentials
    });
  } else {
    callback(null, {
      origin: false, // Reject if origin is not in the allowed list
    });
  }
};