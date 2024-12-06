export const deleteAccount= {
    header: {
      title: "Delete Account",
      icon: null
    },
    button: {
      title: "Delete",
      successIcon: "/images/form/checkmark.png",
      errorIcon: "/images/form/xmark.png",
    },
    description: "Deleting your account is permanent and cannot be undone. You will lose access to all your data and any associated services. Are you sure you want to proceed?",
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
    },
  };
