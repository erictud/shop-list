import { useRouter } from "next/router";
import Navigation from "./nav";

export default function Layout(props: any) {
  const router = useRouter();

  return (
    <>
      {router.pathname !== "/auth" && <Navigation />}
      {props.children}
    </>
  );
}
