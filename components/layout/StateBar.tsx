import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { stateBar } from "../../data/stateData";
import LoadingIcon from "../icons/LoadingIcon";
import styles from "./StateBar.module.css";

export default function StateBar(props: { state: string }) {
  const [__, setStateBarVal] = useRecoilState(stateBar);
  const state = props.state;
  let color;
  if (state === "loading") color = "black";
  if (state === "error") color = "red";
  if (state === "success") color = "green";

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStateBarVal("");
    }, 1500);
    return () => {
      clearTimeout(timeout);
    };
  }, [setStateBarVal]);

  return (
    <div
      className={styles.container}
      style={{ backgroundColor: color }}
      onClick={() => setStateBarVal("")}
    >
      <div className={styles["icon-box"]}>
        <LoadingIcon />
      </div>
      <p>{state}</p>
    </div>
  );
}
