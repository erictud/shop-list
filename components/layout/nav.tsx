import Image from "next/image";
import Link from "next/link";
import DarkThemeIcon from "../icons/DarkTheme";
import styles from "./nav.module.css";

export default function Navigation() {
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
          <li className={`${styles["nav-item"]} ${styles.active}`}>
            <Link href="/">Acc info</Link>
          </li>
        </ul>
        <DarkThemeIcon />
      </div>
    </nav>
  );
}
