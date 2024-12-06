export const changePassword = {
  header: {
    title: "Change Password",
    icon: null
  },
  formFields: [
    {
      id: 1,
      order: 1,
      frontendSlug: "newPassword",
      label: "New Password",
      placeholder: "Enter your new password...",
      name: "newPassword",
      type: "password",
      inputType: "textInput",
      initialValue: "",
      validation: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{8,}$",
      validationMessage:
        "New password must be at least 8 characters long and contain at least one letter and one number.",
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
    {
      id: 2,
      order: 2,
      frontendSlug: "confirmNewPassword",
      label: "Confirm New Password",
      placeholder: "Confirm your new password...",
      name: "confirmNewPassword",
      type: "password",
      inputType: "textInput",
      initialValue: "",
      validation: "",
      validationMessage: "Passwords do not match.",
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
    button: true,
    statuses: true,
    inputs: true,
  },
};
