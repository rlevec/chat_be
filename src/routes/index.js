import registrationRoute from "./registration/index.js";
import loginRoute from "./login/index.js";
import accountActivationRoute from "./account_activation/index.js";
import resendAccountActivationEmailRoute from "./resend_account_activation_email/index.js";
import forgotPasswordRoute from "./forgot_password/index.js";
import resetPasswordRoute from "./reset_password/index.js";
import termsOfUseRoute from "./terms_of_use/index.js";
import privacyPolicyRoute from "./privacy_policy/index.js";
import changeEmailRoute from "./change_email/index.js";
import changeUsernameRoute from "./change_username/index.js";
import changePassword from "./change_password/index.js";
import deleteAccountRoute from "./delete_account/index.js";
import chatRoute from "./chat/index.js";
import logoutRoute from "./logout/index.js";
import uploadProfilePictureRoute from "./upload_profile_picture/index.js"
import errorRoute from "./error/index.js"

import { handleCheckValidSessionAction } from "../middlewares/index.js";

import {Router} from "express"


export const handleInitializeRoutesAction = (app, io) => {
    const apiRouter = Router();

    apiRouter.use("/registration", registrationRoute);
    apiRouter.use("/login", loginRoute);
    apiRouter.use("/account_activation", accountActivationRoute);
    apiRouter.use(
      "/resend_account_activation_email",
      resendAccountActivationEmailRoute
    );
    apiRouter.use("/forgot_password", forgotPasswordRoute);
    apiRouter.use("/reset_password", resetPasswordRoute);
    apiRouter.use("/terms_of_use", termsOfUseRoute);
    apiRouter.use("/privacy_policy", privacyPolicyRoute);

    apiRouter.use("/upload_profile_picture", uploadProfilePictureRoute(io));

    //auth routes
    apiRouter.use("/logout", handleCheckValidSessionAction, logoutRoute);
    apiRouter.use("/change_email", handleCheckValidSessionAction, changeEmailRoute);
    apiRouter.use(
      "/change_username",
      handleCheckValidSessionAction,
      changeUsernameRoute(io)
    );
    apiRouter.use("/change_password", handleCheckValidSessionAction, changePassword);
    apiRouter.use("/delete_account", handleCheckValidSessionAction, deleteAccountRoute(io));
    apiRouter.use("/chat", handleCheckValidSessionAction, chatRoute);

    apiRouter.use("/error", errorRoute)

    app.use("/api", apiRouter)
}