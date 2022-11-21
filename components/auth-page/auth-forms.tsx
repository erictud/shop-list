import styles from "./auth-form.module.css";
import Image from "next/image";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";
import { FormEvent, useRef, useState } from "react";
import HidePassword from "../icons/HidePassword";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { useRouter } from "next/router";
import { authState } from "../../data/authData";
import { useRecoilState } from "recoil";
import Modal from "react-modal";
import ExclamationIcon from "../icons/ExclamationIcon";
import ErrorIcon from "../icons/ErrorIcon";
import Spinner from "../layout/spinner";

export default function AuthForm() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authData, setauthData] = useRecoilState(authState);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHasError, setPasswordHasError] = useState(false);
  const [emailHasError, setEmailHasError] = useState(false);
  const [passwordIsShown, setPasswordIsShown] = useState(false);
  const passwordInputRef = useRef<any>();

  const sumbitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setauthData({
        uid: data.user.uid,
        email: data.user.email,
        username: data.user.email,
      });
      router.push("/");
    } catch (err) {
      setModalIsOpen(true);
    }
    setIsLoading(false);
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
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {emailHasError && (
                <div className={styles["error-div"]}>
                  <ErrorIcon />
                  <p>Email invalid!</p>
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
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div onClick={toggleVisibility}>
                  {!passwordIsShown && <ShowPasswordIcon />}
                  {passwordIsShown && <HidePassword />}
                </div>
              </div>
              {passwordHasError && (
                <div className={styles["error-div"]}>
                  <ExclamationIcon />
                  <p>Parola invalida!</p>
                </div>
              )}
            </div>
          </div>
          <button className={styles["button-div"]}>
            Log in
            {isLoading && <Spinner />}
          </button>
        </form>
      </div>

      <Modal
        className={styles.modal}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        ariaHideApp={false}
      >
        <div className={styles["modal-closeBtn"]}>
          <button onClick={() => setModalIsOpen(false)}>X</button>
        </div>
        <ExclamationIcon />
        <div className={styles["modal-textContainer"]}>
          <p>Something went wrong! Please try again!</p>
          <button onClick={() => setModalIsOpen(false)}>Go to auth page</button>
        </div>
      </Modal>
    </div>
  );
}
