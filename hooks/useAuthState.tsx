import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { selectUser, login, logout } from '../slices/userSlice';

export const useAuthState = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  //このコンポーネントが初期化された時
  useEffect(() => {
    //ログインユーザの状態の変化を監視する
    const unsub = onAuthStateChanged(auth, (authUser) => {
      setIsLoading(true);
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            //nullじゃないことを明示 email <string | null>
            email: authUser.email!,
          }),
        );
      } else {
        //userが存在しなかった時
        dispatch(logout());
      }
      setIsLoading(false);
    });
    //unMountされるとき
    return () => {
      unsub();
    };
  }, []);
  //インポート先でも、以下のstateを読み取れるようになる
  return {
    user,
    isLoading,
  };
};
