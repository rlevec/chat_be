import dotenv from 'dotenv';


dotenv.config();



const { 
  GMAIL_ACCOUNT,
  GMAIL_PASSWORD,
  ACCOUNT_ACTIVATION_ROUTE,
  RESET_PASSWORD_ROUTE
} = process.env;


export const nodemailerConfig = {
    user: GMAIL_ACCOUNT,
    pass: GMAIL_PASSWORD,
    accountActivationRoute: ACCOUNT_ACTIVATION_ROUTE,
    resetPasswordRoute: RESET_PASSWORD_ROUTE
}