export const changeUsername = {
  header: {
    title: "Change Username",
    icon: null
  },
  description: "To update your username, please enter your new username below. Usernames must be between 3 and 15 characters long and can include letters, numbers, and underscores.",
  formFields: [
    {
      id: 1,
      order: 1,
      frontendSlug: "newUsername",
      label: "Username",
      placeholder: "Enter your new username...",
      name: "newUsername",
      type: "text",
      inputType: "textInput",
      initialValue: "",
      validation: "^[a-zA-Z0-9_]{3,15}$",
      validationMessage:
        "Username must be between 3 and 15 characters and can only contain letters, numbers, and underscores.",
      fieldIcons: {
        valid: "/images/form/username.png",
        error: "/images/form/username_error.png",
      }
    }
  ],
  button: {
    title: "Update Username",
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
