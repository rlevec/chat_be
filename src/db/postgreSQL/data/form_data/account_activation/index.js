export const accountActivation= {
    header: {
      title: "Account Activation",
      icon: null
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
    description: "To activate your account, click the button below.",
    button: {
      title: "Activate",
      successIcon: "/images/form/checkmark.png",
      errorIcon: "/images/form/xmark.png",
    },
    renderConditions: {
        activation: true,
        header: true,
        description: true,
        button: true,
        statuses: true,
        inputs: false,
      },
};