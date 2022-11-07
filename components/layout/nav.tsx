import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import DarkThemeIcon from "../icons/DarkTheme";
import styles from "./nav.module.css";
import { app } from "../../firebase";

export default function Navigation() {
  const router = useRouter();

  async function LogOut() {
    const auth = getAuth(app);
    await signOut(auth);
    router.replace("/auth");
  }

  return (
    <nav className={styles.nav}>
      <div>
        <h2 className={styles.logo}>Lista de cumparaturi</h2>
      </div>
      <div className={styles.container}>
        <ul className={styles["nav-list"]}>
          <li className={styles["nav-item"]}>
            <Link href="/">Lista</Link>
          </li>
          <li className={`${styles["nav-item"]} ${styles.active}`} onClick={LogOut}>
            <Link href="/">Log out</Link>
          </li>
        </ul>
        <DarkThemeIcon />
      </div>
    </nav>
  );
}
