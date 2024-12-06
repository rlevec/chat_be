export const forgotPassword = {
  header: {
    title: "Forgot Password",
    icon: null
  },
  description: "Provide an email address associated with your account to recover your password.",
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
    }
  ],
  button: {
    title: "Continue",
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
      frontendSlug: "login",
      label: "Already have an account?",
      labelWithLink: "Log In!",
      linkRoute: "/login"
    }
  ],
  renderConditions: {
    header: true,
    description: true,
    button: true,
    statuses: true,
    inputs: true,
  },
};
