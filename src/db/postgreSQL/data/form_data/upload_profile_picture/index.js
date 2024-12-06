export const uploadProfilePicture= {
    header: {
      title: "Upload profile picture",
      icon: null
    },
    formFields: [
      {
        id: 1,
        order: 1,
        frontendSlug: "uploadProfilePicture",
        label: "Upload profile picture",
        placeholder: "Select your profile picture...",
        name: "uploadProfilePicture",
        type: "file",
        inputType: "fileInput",
        initialValue: null,
        validation: "",
        accept: "image/jpeg, image/jpg, image/png, image/webp",
        fieldIcon: "/images/form/file_upload_icon.png",
        maxFileSize: 10485760,
        validationMessage: "Please select a valid file type!",
        fieldIcon: "/images/form/upload.png",  
        deleteImageIcon: "/images/form/trash.png",
      }
    ],
    button: {
        title: "Upload",
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
      fileInput: true,
    },
  };
  