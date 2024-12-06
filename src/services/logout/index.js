import { handleThrowNewErrorAction } from "../../utils/index.js";

export const handleLogoutAction = async (req, res) => {
  return await new Promise((resolve, reject) => {
    req.session.destroy((err) => {
      if (err) {
        reject(
          handleThrowNewErrorAction(500, "Could not log out, please try again.")
        );
      } else {
        res.clearCookie("connect.sid"); // Clear the session cookie
     
        resolve({
          status: 200,
          success: true,
          message: "You have successfully logged out",
          redirect: "/login",
          disablePointerEvents: true
        });
      }
    });
  });
};
