export function determineUser(email: string) {
  const name = email.slice(0, email.indexOf("@"));
  if (name === "aldana") {
    return "Alina";
  } else if (name === "adinelos") {
    return "Adinel";
  } else if (name === "iasmina") {
    return "Iasmina";
  } else {
    return "user";
  }
}
