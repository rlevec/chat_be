
import { handleThrowNewErrorAction } from "../../utils/index.js";

const formKeysTransformed = {
  registration: "Registration",
  login: "Login",
  forgot_password: "Forgot password",
  reset_password: "Reset password",
  account_activation: "Account activation",
  change_email: "Change email",
  change_password: "Change password",
  change_username: "Change username",
  delete_account: "Delete account",
  privacy_policy: "Privacy policy",
  resend_account_activation_email: "Resend account activation email",
  reset_password: "Reset password",
  terms_of_use: "Terms of use",
  chat: "Chat"
};

export const handleGetFormDataAction = async (client, key) => {
  
  try {
      
      const { rows } = await client.query('SELECT content FROM form_data WHERE key = $1', [key]);
      const formData = rows?.[0]?.content;

      if (!formData) {
          handleThrowNewErrorAction(500, `No data found for key: ${formKeysTransformed[key]}`)
      }

    
  
      return {
        status: 200,
        success: true,
        message: `${formKeysTransformed[key]} form data fetched successfully!`,
        data: formData,
      };
  
      
  } catch (error) {
      console.error(error);
      handleThrowNewErrorAction(500, `Error fetching form data for key: ${key}`)
  }
};
