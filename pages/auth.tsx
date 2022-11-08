import AuthForm from "../components/auth-page/auth-forms";
import { useState } from "react";

export default function Auth() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AuthForm />
    </main>
  );
}
