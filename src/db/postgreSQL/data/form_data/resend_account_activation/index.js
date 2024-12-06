export const resendAccountActivationEmail = {
    header: {
      title: "Resend Account Activation Email",
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
    ],
    button: {
      title: "Send",
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
      button: true,
      statuses: true,
      inputs: true,
    },
  };