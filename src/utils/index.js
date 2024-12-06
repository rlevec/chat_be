import bcrypt from "bcrypt";



export const handleHashPasswordAction = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  if (hashedPassword) {
    return {
      status: 200,
      success: true,
      message: "Password hashed successfully",
      data: hashedPassword,
    };
  } else {
    handleThrowNewErrorAction(500, "Error hashing password");
  }
};

export const handleComparePasswordAction = async (password, hashedPassword) => {
  const match = await bcrypt.compare(password, hashedPassword);

  if (match) {
    return {
      status: 200,
      success: true,
      message: "Passwords match",
    };
  } else {
    handleThrowNewErrorAction(401, "Invalid credentials");
  }
};

export const handleThrowNewErrorAction = (status, message, redirect) => {
  const error = new Error(message);
  error.status = status;
  if (redirect) {
    error.redirect = redirect;
  }
  throw error;
};
