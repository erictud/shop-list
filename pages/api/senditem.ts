import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import type { NextApiRequest, NextApiResponse } from "next";
import { db, storage } from "../../firebase";

type ResBody = {
  message: string;
};

type ReqBody = {
  name: string;
  quantity: string;
  description: string | undefined;
  image: ArrayBuffer | undefined;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResBody>) {
  if (req.method === "POST") {
    const body = req.body;
    if (body.quantity.trim().length === 0) {
      res.status(400).json({ message: "Invalid quantity" });
      return;
    } else if (body.name.trim().length === 0) {
      res.status(400).json({ message: "Invalid name" });
      return;
    } else if (body.shop.trim().length === 0) {
      res.status(400).json({ message: "Invalid shop" });
      return;
    }

    const docRef = await addDoc(collection(db, "items"), {
      name: body.name,
      quantity: body.quantity,
      description: body.description,
      username: body.username,
      shop: body.shop,
      time: body.data,
    });
    const id = docRef.id;
    const imageRef = ref(storage, `items/${docRef.id}/image`);
    if (body.image) {
      await uploadString(imageRef, body.image, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "items", id), {
          image: downloadURL,
        });
      });
    }

    res.status(201).json({ message: "Item sent successfully" });
  } else {
    res.status(404).json({ message: "Access denied" });
  }
}
