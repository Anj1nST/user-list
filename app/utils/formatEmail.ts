export const formatEmail = (email: string) => {
  const formattedEmail = email.replace(/@|%40/g, "--");
  return formattedEmail;
};
