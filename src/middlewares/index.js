export const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging

    // Create a structured response object
    const response = {
        error: true,
        status: err.status || 500, // Use err.status if available, otherwise default to 500
        message: err.message || "Internal Server Error" // Default message
    };

    // Include custom properties like redirect if they exist
    if (err.redirect) {
        response.redirect = err.redirect; // Add the redirect property
    }

    if(err.removeUser) {
        response.removeUser = err.removeUser
    }
    if(err.invalidSession) {
        response.invalidSession = err.invalidSession
    }

    // Send the structured response
    res.status(err.status || 500).json(response);
};
  
export const handleCheckValidSessionAction = (req, res, next) => {
    // Check if session exists and is valid
    if (!req.session || !req.session.userId) {
        const error = new Error('Invalid session');
        error.status = 403; // Forbidden status code
        error.removeUser = true
        error.redirect = "/login"
        error.invalidSession = true
        return next(error); // Pass the error to the next middleware
    }
    
    // If the session is valid, proceed to the next middleware
    next(); 
}



export const handleRequestTimeoutAction = (time) => (req, res, next) => {
    // Set a timeout for the request
    res.setTimeout(time, () => {
      if (!res.headersSent) {
        res.status(408).json({ error: true, message: "Request timed out" });
      }
    });
    next(); // Proceed to the next middleware or route
  };