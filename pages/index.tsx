import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../data/authData";
import { app } from "../firebase";
import AddItemForm from "../components/home-page/addItemForm";
import Container from "../components/home-page/container";

export default function Home() {
  const router = useRouter();
  const [authData, setauthData] = useRecoilState(authState);

  useEffect(() => {
    console.log(authData.email);
    if (!authData.email) {
      router.replace("/auth");
    }
  }, [authData.email, router]);
  if (!authData.email) {
    return null;
  }
  return (
    <main>
      <Container />
    </main>
  );
}
