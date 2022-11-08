import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { authState } from "../data/authData";

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
  return <div></div>;
}

// export async function getServerSideProps(context: any) {
//   if (true) {
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
