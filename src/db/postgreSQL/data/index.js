import {registration} from "./form_data/registration/index.js"
import { login } from "./form_data/login/index.js"
import { accountActivation } from "./form_data/account_activation/index.js"
import {changeEmail} from "./form_data/change_email/index.js"
import { changePassword } from "./form_data/change_password/index.js"
import { changeUsername } from "./form_data/change_username/index.js"
import { deleteAccount } from "./form_data/delete_account/index.js"
import { forgotPassword } from "./form_data/forgot_password/index.js"
import { privacyPolicy } from "./form_data/privacy_policy/index.js"
import { resendAccountActivationEmail } from "./form_data/resend_account_activation/index.js"
import { resetPassword } from "./form_data/reset_password/index.js"
import { termsOfUse } from "./form_data/terms_of_use/index.js"
import { chat } from "./form_data/chat/index.js"
import { uploadProfilePicture } from "./form_data/upload_profile_picture/index.js"
import { error } from "./form_data/error/index.js"

export const formData = [
        {
          id: 1,
          key: "registration",
          content: registration
        },
        {
          id: 2,
          key: "login",
          content: login
        },
        {
          id: 3,
          key: "account_activation",
          content: accountActivation
        },
        {
          id: 4,
          key: "change_email",
          content: changeEmail
        },
        {
          id: 5,
          key: "change_password",
          content: changePassword
        },
        {
          id: 6,
          key: "change_username",
          content: changeUsername
        },
        {
          id: 7,
          key: "delete_account",
          content: deleteAccount
        },
        {
          id: 8,
          key: "forgot_password",
          content: forgotPassword
        },
        {
          id: 9,
          key: "privacy_policy",
          content: privacyPolicy
        },
        {
          id: 10,
          key: "resend_account_activation_email",
          content: resendAccountActivationEmail
        },
        {
          id: 11,
          key: "reset_password",
          content: resetPassword
        },
        {
          id: 12,
          key: "terms_of_use",
          content: termsOfUse
        },
        {
          id: 13,
          key: "chat",
          content: chat
        },
        {
          id: 14,
          key: "upload_profile_picture",
          content: uploadProfilePicture
        },
        {
          id: 15,
          key: "error",
          content: error
        }
    ]