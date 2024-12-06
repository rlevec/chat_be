export const registration= {
  header: {
    title: "Registration",
    icon: null
  },
  formFields: [
    {
      id: 1,
      order: 1,
      frontendSlug: "username",
      label: "Username",
      placeholder: "Enter your username...",
      name: "username",
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
    
    },
    {
      id: 2,
      order: 2,
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
      id: 3,
      order: 3,
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
    {
      id: 4,
      order: 4,
      frontendSlug: "confirmPassword",
      label: "Confirm Password",
      placeholder: "Confirm your password...",
      name: "confirmPassword",
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
  termsInput: {
    id: 1,
    order: 1,
    frontendSlug: "terms",
    labels: [
      {
        id: 1,
        frontendSlug: "termsOfUse",
        label: "Terms of Use",
        isLink: true,
        route: "terms_of_use",
      },
      {
        id: 2,
        frontendSlug: "$",
        label: "&",
        isLink: false,
      },
      {
        id: 3,
        frontendSlug: "privacyPolicy",
        label: "Privacy Policy",
        isLink: true,
        route: "privacy_policy",
      },
      {
        id: 4,
        frontendSlug: "agreement",
        label: "agreement",
        isLink: false,
      },
    ],
    name: "terms",
    type: "checkbox",
    inputType: "checkboxInput",
    initialValue: false,
    validation: true,
    validationMessage:
      "You must agree to the terms of service and privacy policy.",
  },
  button: {
    title: "Register",
    successIcon: "/images/form/checkmark.png",
    errorIcon: "/images/form/xmark.png",
  },
  statuses: [
    {
      id: 1,
      frontendSlug: "login",
      label: "Already have an account?",
      labelWithLink: "Log In!",
      linkRoute: "/login",
    },
  ],
  renderConditions: {
    header: true,
    button: true,
    statuses: true,
    inputs: true,
    terms: true,
  },
};
