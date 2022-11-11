import styles from "./itemsList.module.css";
import Image from "next/image";

export default function ItemsList() {
  return (
    <div className={styles.list}>
      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/megaImageLogo.png" alt="mega image Logo" width={30} height={30} />
          <h5>Mega Image</h5>
        </div>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/kauflandLogo.png" alt="mega image Logo" width={30} height={30} />
          <h5>Kaufland</h5>
        </div>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/lidlLogo.png" alt="lidl Logo" width={50} height={30} />
          <h5>Lidl</h5>
        </div>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/farmaciateiLogo.png" alt="mega image Logo" width={30} height={30} />
          <h5>Farmacia Tei</h5>
        </div>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/piataLogo.png" alt="mega image Logo" width={30} height={30} />
          <h5>Piata</h5>
        </div>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/coraLogo.png" alt="lidl Logo" width={50} height={30} />
          <h5>Cora</h5>
        </div>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <Image src="/carefourLogo.png" alt="mega image Logo" width={30} height={30} />
          <h5>Carefour</h5>
        </div>
      </section>

      <section className={styles["shop-list"]}>
        <div className={styles["shop-list-header"]}>
          <h5>Altele</h5>
        </div>
      </section>
    </div>
  );
}
