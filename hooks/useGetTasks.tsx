import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { format } from 'date-fns';
import { db } from '../firebaseConfig';
import { selectUser } from '../slices/userSlice';
import { selectTag, resetEditedTask } from '../slices/todoSlice';
import { Task } from '../types/types';

export const useGetTasks = () => {
  const dispatch = useDispatch();
  const tag = useSelector(selectTag);
  const user = useSelector(selectUser);
  const [tasks, setTasks] = useState<Task[]>();
  const [getErr, setGetErr] = useState('');

  useEffect(() => {
    //テーブル接続（コレクション）
    const q = query(
      collection(db, 'users', user.uid, 'tags', tag.id, 'tasks'),
      orderBy('createdAt', 'desc'),
    );

    //データ取得&変数に格納

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        setTasks(
          snapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                title: doc.data().title,
                completed: doc.data().completed,
                createdAt: format(
                  doc.data({ serverTimestamps: 'estimate' }).createdAt.toDate(),
                  'yyyy-MM--dd hh:mm',
                ),
                //Task型
              } as Task),
          ),
        );
      },
      (err: any) => {
        setGetErr(err.message);
      },
    );
    return () => {
      unsub();
      dispatch(resetEditedTask());
    };
  }, []);
  return {
    tasks,
    getErr,
  };
};
