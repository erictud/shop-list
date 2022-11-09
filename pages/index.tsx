import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../data/authData";
import { app } from "../firebase";

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
  return <div>hello</div>;
}

// export async function getServerSideProps(context: any) {
//   const auth = getAuth(app);
//   console.log(auth.currentUser);
//   if (auth.currentUser) {
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// }
