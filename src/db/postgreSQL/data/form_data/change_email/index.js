export const changeEmail = {
    header: {
      title: "Change Email",
      icon: null
    },
    description: "To update your email address, please enter your new email below. Make sure it's an address you have access to, as it will be used for account verification and important notifications.",
    formFields: [
      {
        id: 1,
        order: 1,
        frontendSlug: "newEmail",
        label: "Email",
        placeholder: "Enter your email...",
        name: "newEmail",
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
      title: "Change",
      successIcon: "/images/form/checkmark.png",
      errorIcon: "/images/form/xmark.png",
    },
    statuses: [
        {
          id: 1,
          frontendSlug: "chat",
          label: "Changed your mind?",
          labelWithLink: "Go back!",
          linkRoute: "/chat"
        },
      ],
      renderConditions: {
        header: true,
        description: true,
        button: true,
        statuses: true,
        inputs: true,
      },
  };
  