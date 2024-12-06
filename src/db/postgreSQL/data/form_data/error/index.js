export const error = {
  invalid_route: {
    headerTitle: "Invalid Route",
    buttonTitle: "Login",
    redirect: "/login",
    image: "/images/form/404.png",
  },
  invalid_data: {
    reset_password: {
        headerTitle: "Missing Password Token",
        buttonTitle: "Forgot Password",
        redirect: "/forgot_password",
        image: "/images/form/no_data.png",
    },
    account_activation: {
        headerTitle: "Missing Activation Token",
        buttonTitle: "Registration",
        redirect: "/registration",
        image: "/images/form/no_data.png",
    }
  },
  invalid_device: {
    headerTitle: "Non Desktop Device Detected",
    buttonTitle: "Refresh",
    image: "/images/form/device.png",
  },
};
