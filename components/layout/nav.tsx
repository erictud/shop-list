import { getAuth, signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import DarkThemeIcon from "../icons/DarkTheme";
import styles from "./nav.module.css";
import { app } from "../../firebase";
import { useRecoilState } from "recoil";
import { authState } from "../../data/authData";
import LogoIcon from "../icons/LogoIcon";
import LightThemeIcon from "../icons/LightThemeIcon";
import { useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [authData, setauthData] = useRecoilState(authState);
  const [theme, setTheme] = useState<any>({ theme: "dark" });

  async function LogOut() {
    const auth = getAuth(app);
    await signOut(auth);
    setauthData({ uid: "", email: "", username: "" });
    router.replace("/auth");
  }
  if (!authData.email) {
    return null;
  }

  function changeTheme() {
    setTheme((prev: any) => {
      if (prev.theme === "light") {
        return {
          theme: "dark",
        };
      } else {
        console.log("second");
        return {
          theme: "light",
        };
      }
    });

    document.documentElement.style.setProperty("--initial-color-mode", theme.theme);
    document.documentElement.setAttribute("data-theme", theme.theme);
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

          <li className={`${styles["nav-item"]} ${styles.active}`} onClick={LogOut}>
            <Link href="/">Log out</Link>
          </li>
        </ul>
        <div onClick={changeTheme}>
          {theme.theme === "light" ? <LightThemeIcon /> : <DarkThemeIcon />}
        </div>
      </div>
    </nav>
  );
}
