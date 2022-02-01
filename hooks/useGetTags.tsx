import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  onSnapshotsInSync,
} from 'firebase/firestore';
import { format } from 'date-fns';
import { db } from '../firebaseConfig';
import { selectUser } from '../slices/userSlice';
import { Tag } from '../types/types';

export const useGetTags = () => {
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>();
  const [getErr, setGetErr] = useState('');

  //マウント時に呼び出される
  useEffect(() => {
    const q = query(
      //第二引数からはフルパスを指定
      collection(db, 'users', user.uid, 'tags'),
      orderBy('createdAt', 'desc'),
    );
    //変数の初期化
    setGetErr('');
    setIsLoading(true);

    //データベースが変更になったときにおnSnapshotで監視
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setTags(
          snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                name: doc.data().name,
                createdAt: format(
                  //からの状態で、todateされるのを避けるestimete（推定時間を割り当てるfirebase機能）
                  doc.data({ serverTimestamps: 'estimate' }).createdAt.toDate(),
                  'yyyy-MM-dd HH:mm',
                ),
                //データ型を定義？
              } as Tag),
          ),
        );
        setIsLoading(false);
      },
      (err: any) => {
        setGetErr(err.message);
      },
    );

    return () => {
      unsub();
    };
  }, []);

  return {
    tags,
    isLoading,
    getErr,
  };
};
