import { handleRequestBodyValidatationAction } from "../../validators/index.js";
import { handleThrowNewErrorAction } from "../../utils/index.js";
import { handleComparePasswordAction } from "../../utils/index.js";

export const handleLoginAction = async (client, body, req) => {
    // Validate request body
    await handleRequestBodyValidatationAction(body);
    
    const { email, password } = body;

    // Query to get the user by email
    const selectUserQuery = `SELECT * FROM users WHERE email = $1`;
    const selectUserResponse = await client.query(selectUserQuery, [email]);
    const user = selectUserResponse?.rows[0];

    // Check if user exists
    if (!user) {
        return handleThrowNewErrorAction(401, "Invalid credentials");
    }

    // Compare passwords
    const userPassword = user?.password;
    await handleComparePasswordAction(password, userPassword);

    // Check if account is activated
    if (!user?.activated) {
        return handleThrowNewErrorAction(401, "Account inactive! Please check your email for activation link!");
    }

        // Regenerate the session
        await new Promise((resolve, reject) => {
            req.session.regenerate((err) => {
                if (err) {
                    reject(handleThrowNewErrorAction(500,"Failed to regenerate session"));
                } else {
                    resolve();
                }
            });
        });

        req.session.userId = user.id;

        // Save the session
        await new Promise((resolve, reject) => {
            req.session.save((err) => {
                if (err) {
                    reject(handleThrowNewErrorAction(500,"Failed to save session"));
                } else {
                    console.log("trigger_session_save");
                    resolve();
                }
            });
        });

        // Returning the response as a promise
        return new Promise((resolve) => {
            resolve({
                status: 200,
                success: true,
                message: "You have successfully logged in",
                data: {
                    username: user.username,
                    profile_picture: user.profile_picture,
                },
                setUser: true,
                redirect: "/chat",
            });
        });
    
};
