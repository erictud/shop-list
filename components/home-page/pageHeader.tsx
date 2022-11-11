import styles from "./pageHeader.module.css";

export default function PageHeader() {
  const date = new Date();
  const options: DateTimeFormatOptions = {
    hour: `numeric`,
    minute: `numeric`,
    day: `numeric`,
    month: `long`,
    year: `numeric`,
    weekday: `long`,
  };

  return (
    <div className={styles.div}>
      <h3>Lista de cumparaturi a familiei</h3>
      <h4>Azi e {new Intl.DateTimeFormat(`ro-RO`, options).format(date)}</h4>
    </div>
  );
}
