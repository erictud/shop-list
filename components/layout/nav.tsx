import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import DarkThemeIcon from "../icons/DarkTheme";
import styles from "./nav.module.css";
import { app } from "../../firebase";
import { useRecoilState } from "recoil";
import { authState } from "../../data/authData";
import LogoIcon from "../icons/LogoIcon";

export default function Navigation() {
  const router = useRouter();
  const [authData, setauthData] = useRecoilState(authState);

  async function LogOut() {
    const auth = getAuth(app);
    await signOut(auth);
    setauthData({ uid: "", email: "", username: "" });
    router.replace("/auth");
  }
  if (!authData.email) {
    return null;
  }

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles["logo-container"]}>
        <LogoIcon />
        <h2 className={styles.logo}>Lista</h2>
      </Link>
      <div className={styles.container}>
        <ul className={styles["nav-list"]}>
          <li className={styles["nav-item"]}>
            <Link href="/">Lista</Link>
          </li>
          <li className={styles["nav-item"]}>
            <Link href="/">Account</Link>
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
