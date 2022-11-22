export function determineUser(email: string) {
  const name = email.slice(0, email.indexOf("@"));
  if (name === "aldanatudorica") {
    return "Alina";
  } else if (name === "adinelos") {
    return "Adinel";
  } else if (name === "iasminatudorica") {
    return "Iasmina";
  } else if (name === "erik17242") {
    return "Eric";
  } else {
    return "user";
  }
}
