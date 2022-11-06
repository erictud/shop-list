import styles from "./auth-form.module.css";
import Image from "next/image";
import ShowPasswordIcon from "../icons/ShowPasswordIcon";

export default function AuthForm() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h4>Log in</h4>
        <form className={styles.form}>
          <div className={styles["input-container"]}>
            <div className={styles["input-group"]}>
              <label htmlFor="email">Email</label>
              <div className={styles["input-div"]}>
                <input type="email" placeholder="Email" id="email" />
              </div>
            </div>
            <div className={styles["input-group"]}>
              <label htmlFor="password">Password</label>
              <div className={styles["input-div"]}>
                <input type="password" placeholder="Password" id="password" />
                <ShowPasswordIcon />
              </div>
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
