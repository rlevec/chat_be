export const login= {
  header: {
    title: "Login",
    icon: null
  },
  formFields: [
    {
      id: 1,
      order: 1,
      frontendSlug: "email",
      label: "Email",
      placeholder: "Enter your email...",
      name: "email",
      type: "email",
      inputType: "textInput",
      initialValue: "",
      validation:
        '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
      validationMessage: "Please enter a valid email address.",
      fieldIcons: {
        valid: "/images/form/email.png",
        error: "/images/form/email_error.png",
      }

    },
    {
      id: 2,
      order: 2,
      frontendSlug: "password",
      label: "Password",
      placeholder: "Enter your password...",
      name: "password",
      type: "password",
      inputType: "textInput",
      initialValue: "",
      validation: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$",
      validationMessage:
        "Password must be at least 8 characters long and contain at least one letter and one number.",
        fieldIcons: {
          valid: "/images/form/password.png",
          error: "/images/form/password_error.png",
        },
        passwordTypeIcons: {
          show: {
            valid: "/images/form/password_show.png",
            error: "/images/form/password_show_error.png",
          },
          hide: {
            valid: "/images/form/password_hide.png",
            error: "/images/form/password_hide_error.png",
          }
        },
        isPassword: true
    },
  ],
  button: {
    title: "Log In",
    successIcon: "/images/form/checkmark.png",
    errorIcon: "/images/form/xmark.png",
  },
  statuses: [
    {
      id: 1,
      frontendSlug: "registration",
      label: "Not Registered?",
      labelWithLink: "Create an account!",
      linkRoute: "/registration",
    },
    {
      id: 2,
      frontendSlug: "forgot_password",
      label: "Forgot password?",
      labelWithLink: "Reset it!",
      linkRoute: "/forgot_password",
    },
    {
      id: 3,
      frontendSlug: "resend_activation_token",
      label: "Account not activated?",
      labelWithLink: "Resend account activation email!",
      linkRoute: "/resend_account_activation_email",
    },
  ],
  renderConditions: {
    header: true,
    button: true,
    statuses: true,
    inputs: true,
  },
};
