import React, { VFC, useState } from 'react';
import tw from 'tailwind-rn';
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { storage } from '../firebaseConfig';

import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { useCreateTask } from '../hooks/useCreateTask';
import { Title } from '../components/Title';
import { IconButton } from '../components/IconButton';
import { Entypo } from '@expo/vector-icons';
import {
  uploadBytesResumable,
  ref,
  getDownloadURL,
  uploadString,
  uploadBytes,
} from 'firebase/storage';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateTask'>;
};

export const CreateTaskScreen: VFC<Props> = ({ navigation }) => {
  //画像
  const [image, setImage] = useState<null | string>(null);
  const [Blob, setBlob] = useState<Blob>();

  //画像アップロード
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    //正規表現
    console.log(result);

    console.log(`${image}`);
    if (!result.cancelled) {
      setImage(result.uri);
      //let localUri = result.uri;
      const localUri = await fetch(result.uri);
      const localBlob = await localUri.blob();
      setBlob(localBlob);
    }
  };

  const firebaseUpload = () => {
    //ファイル名作成
    const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const N = 16;
    const randomChar = Array.from(crypto.getRandomValues(new Uint32Array(N)))
      .map((n) => S[n % S.length])
      .join('');
    const fileName = randomChar;

    const thisUsersNewPostRef = ref(storage, 'tests/img1');

    uploadBytes(thisUsersNewPostRef, Blob!).then((snapshot) => {
      // causes crash
      console.log('Uploaded a blob or file!');
    });

    setImage(null);
  };

  const { createErr, editedTask, createTask, onChangeTask, resetInput } =
    useCreateTask({
      navigation,
    });

  return (
    <SafeAreaView style={tw('flex-1 bg-gray-100')}>
      <View>
        <TouchableOpacity
          onPress={() => {
            resetInput(), navigation.goBack();
          }}
        >
          <AntDesign name="close" size={30} color="gray" />
        </TouchableOpacity>
        {/* 左にの要素 */}
        <View />
      </View>
      <Title first="New" last="Task" />
      {/* <View style={tw('items-center')}>
        <TouchableOpacity onPress={(image: File) => uploadImage(image)}>
          <Entypo
            name="image-inverted"
            size={30}
            color="black"
            //onPress={(image: File) => uploadImage(image)}
          />
        </TouchableOpacity>
      </View> */}
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
        {image && <Button title="upload image" onPress={firebaseUpload} />}
      </View>

      <View style={tw('mb-5 mx-1 items-center ')}>
        <TextInput
          style={tw('w-5/6')}
          autoCapitalize="none"
          autoFocus
          multiline
          placeholder="New task ?"
          value={editedTask.title}
          onChangeText={(txt: string) => onChangeTask(txt)}
        />
      </View>

      <IconButton name="plus" size={20} color="gray" onPress={createTask} />
      {createErr !== '' && (
        <Text style={tw('text-red-500 my-3 font-semibold')}>{createErr}</Text>
      )}
    </SafeAreaView>
  );
};
