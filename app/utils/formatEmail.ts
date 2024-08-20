export const formatEmail = (email: string) => {
  const formattedEmail = email.replace("@", "--").replace("%40", "--");
  return formattedEmail;
};
