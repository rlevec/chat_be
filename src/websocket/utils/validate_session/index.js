import { sessionConfig } from "../../../config/session/index.js"; 
 
 const handleGetSessionAction = (sessionId) => {
    return new Promise((resolve, reject) => {
      sessionConfig.store.get(sessionId, (err, session) => {
        if (err) {
          return reject(handleThrowNewErrorAction); // Reject with the error if it occurs
        }
        resolve(session); // Resolve with the session
      });
    });
  };

  
  // Function to get the session ID from cookie headers
  const handleGetSessionIdFromCookiesAction = (rawCookies) => {
    const cookies = handleParseCookiesAction(rawCookies);
    const sessionCookie = cookies["connect.sid"];
  
    // Return the extracted session ID or undefined if not present
    return sessionCookie
      ? sessionCookie.split(".")[0].replace("s:", "")
      : undefined;
  };
  

  export  const handleValidateSessionAction = async(socket) => {
    const rawCookies = socket.request.headers.cookie

    const sessionId = await handleGetSessionIdFromCookiesAction(rawCookies);
    
    const session = await handleGetSessionAction(sessionId);

    return session
}



  const handleParseCookiesAction = (cookieHeader) => {
  const parsedCookies = {};

  if (!cookieHeader) return parsedCookies;

  cookieHeader.split(";").forEach((cookie) => {
    const [key, value] = cookie
      .split("=")
      .map((part) => decodeURIComponent(part.trim()));
    parsedCookies[key] = value;
  });

  return parsedCookies;
};