import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { useAppSelector } from "../app/hooks";
import {
  onSnapshot,
  collection,
  query,
  DocumentData,
  Query,
  orderBy,
  Timestamp,
  QueryDocumentSnapshot,
} from "firebase/firestore";

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}
const useSubCollection = (
  collectionName: string,
  subCollectionName: string
) => {
  const [subDocuments, setSubDocuments] = useState<Messages[]>([]);
  const [messages, setMessages] = useState<Messages[]>([]);
  const user = useAppSelector((state) => state.user);
  const collectionRef: Query<DocumentData> = query(
    collection(db, collectionName)
  );
  const channelId = useAppSelector((state) => state.channel.channelId);
  useEffect(() => {
    let collectionRef = collection(
      db,
      collectionName,
      String(channelId),
      subCollectionName
    );
    const collectionRefOrderBy = query(
      collectionRef,
      orderBy("timestamp", "desc")
    );
    onSnapshot(collectionRefOrderBy, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setSubDocuments(results);
    });
  }, [channelId]);

  return { subDocuments };
};

export default useSubCollection;
