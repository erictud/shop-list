import styles from "./auth-form.module.css";
import Image from "next/image";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";
import { FormEvent, useRef, useState } from "react";
import ErrorIcon from "../icons/ErrorIcon";
import HidePassword from "../icons/HidePassword";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useRouter } from "next/router";

export default function AuthForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [emailHasError, setEmailHasError] = useState(false);
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const passwordInputRef = useRef<any>();

  const sumbitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password.trim() || password.length < 7) {
      setPasswordHasError(true);
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setEmailHasError(true);
      return;
    }

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        router.replace("/");
      })
      .catch((err) => console.log(err));
    setPassword("");
    setEmail("");
  };

  const toggleVisibility = (e: any) => {
    if (password.trim()) {
      setPasswordIsShown((prevState) => !prevState);
      if (passwordIsShown === true) passwordInputRef.current.type = "password";
      else passwordInputRef.current.type = "text";
    }
  };
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h4>Log in</h4>
        <form className={styles.form} onSubmit={sumbitForm}>
          <div className={styles["input-container"]}>
            <div className={styles["input-group"]}>
              <label htmlFor="email">Email</label>
              <div className={styles["input-div"]}>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {emailHasError && (
                <div className={styles["error-div"]}>
                  <ErrorIcon />
                  <p>Invalid email!</p>
                </div>
              )}
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="password">Password</label>
              <div className={styles["input-div"]}>
                <input
                  type="password"
                  id="password"
                  ref={passwordInputRef}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div onClick={toggleVisibility}>
                  {!passwordIsShown && <ShowPasswordIcon />}
                  {passwordIsShown && <HidePassword />}
                </div>
              </div>
              {passwordHasError && (
                <div className={styles["error-div"]}>
                  <ErrorIcon />
                  <p>Invalid password!</p>
                </div>
              )}
            </div>
          </div>
          <button>Log in</button>
        </form>
      </div>
      <div className={styles["image-container"]}>
        <Image src="/background-auth.jpg" alt="vegetables img" width={800} height={400} />
      </div>
    </div>
  );
}
