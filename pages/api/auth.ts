import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { app } from "../../firebase";
import { determineUser } from "../../lib/auth";

type ResBody = {
  message: string;
  user: any | undefined;
};

type ReqBody = {
  email: string;
  password: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResBody>) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim()) {
      res.status(400).json({ message: "Invalid Inputs", user: null });
    }
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      res.status(201).json({
        message: "auth succesful",
        user: {
          uid: auth.currentUser?.uid,
          email: email,
          username: determineUser(email),
        },
      });
    } catch (err: any) {
      res.status(404).json({ message: err.message, user: null });
    }
  } else {
    res.status(404).json({ message: "Access denied", user: null });
  }
}
