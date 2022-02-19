import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { db } from '../firebaseConfig';
import { RootStackParamList } from '../types/types';
import { selectUser } from '../slices/userSlice';
import * as ImagePicker from 'expo-image-picker';

import {
  selectEditedTask,
  resetEditedTask,
  setEditedTask,
  selectTag,
} from '../slices/todoSlice';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateTask'>;
};

export const useCreateTask = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const tag = useSelector(selectTag);
  const editedTask = useSelector(selectEditedTask);
  const [createErr, setCreateErr] = useState('');

  const resetInput = () => {
    dispatch(resetEditedTask());
  };

  // //画像
  // const [image, setImage] = useState(null);
  // //画像アップロード
  // const uploadImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   console.log(result);

  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //   }
  // };

  const onChangeTask = (txt: string) =>
    //editedTaskの中のtitleだけを随時更新
    dispatch(setEditedTask({ ...editedTask, title: txt }));

  // const onChangeDate = (txt: any ) =>
  //   dispatch(setEditedDate({ ...editedDate, finishDate: any}));

  //firebaseに登録
  const createTask = async () => {
    setCreateErr('');
    if (editedTask?.title !== '') {
      try {
        await addDoc(
          collection(db, 'users', user.uid, 'tags', tag.id, 'tasks'),
          {
            title: editedTask.title,
            completed: false,
            createdAt: serverTimestamp(),
          },
        );
        dispatch(resetEditedTask());
        navigation.goBack();
      } catch (err: any) {
        dispatch(resetEditedTask());
        setCreateErr(err.message);
      }
    }
  };
  return {
    onChangeTask,
    editedTask,
    createErr,
    createTask,
    resetInput,
    //uploadImage,
  };
};
