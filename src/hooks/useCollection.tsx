import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useAppSelector } from "../app/hooks";
import {
  onSnapshot,
  collection,
  query,
  DocumentData,
  Query,
} from "firebase/firestore";
interface Channels {
  id: string;
  channel: DocumentData;
}
const useCollection = (data: string) => {
  const [documents, setDocuments] = useState<Channels[]>([]);
  const user = useAppSelector((state) => state.user);
  const collectionRef: Query<DocumentData> = query(collection(db, data));

  useEffect(() => {
    onSnapshot(collectionRef, (querySnapshot) => {
      const channelsResults: Channels[] = [];
      querySnapshot.docs.forEach((doc) =>
        channelsResults.push({ id: doc.id, channel: doc.data() })
      );
      setDocuments(channelsResults);
    });
  }, []);

  return { documents };
};

export default useCollection;
