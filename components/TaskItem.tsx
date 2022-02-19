import React, { VFC, memo } from 'react';
import tw from 'tailwind-rn';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { setEditedTask } from '../slices/todoSlice';
import { IconButton } from './IconButton';
import { StringLike } from '@firebase/util';

type Props = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  //＋画像を追記
  photo: string;
  toggleCompleted: (idx: string, bool: boolean) => void;
  deleteTask: (idx: string) => void;
};

const TaskItemMemo: VFC<Props> = ({
  id,
  title,
  completed,
  createdAt,
  toggleCompleted,
  deleteTask,
}) => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const styles = StyleSheet.create({
    container: {
      paddingTop: 50,
    },
    tinyLogo: {
      width: 50,
      height: 50,
    },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 40,
    },
  });

  return (
    <View style={tw('flex-row p-3 border-b border-gray-200')}>
      <TouchableOpacity onPress={() => toggleCompleted(id, completed)}>
        <View style={tw('mx-3')}>
          <MaterialCommunityIcons
            name={completed ? 'square-off' : 'square-outline'}
            size={24}
            color="gray"
          />
        </View>
        <View style={tw('justify-start flex-none p-1')}>
          <Image
            style={styles.logo}
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/todoexpo-327f2.appspot.com/o/7A87B78A-B520-49A3-84A1-C398C83CEDD5_4_5005_c.jpeg?alt=media&token=29424889-ca1d-4294-b450-38cc3c04c046',
            }}
          />
        </View>
      </TouchableOpacity>

      <View style={tw('flex-1 mx-3')}>
        <View style={tw('flex-row justify-between items-center')}>
          <Text style={tw('mr-1 text-gray-700')}>{createdAt}</Text>

          <IconButton
            name="delete"
            size={14}
            color="black"
            onPress={() => deleteTask(id)}
          />
        </View>
        <TouchableOpacity
          onLongPress={() => {
            dispatch(setEditedTask({ id, title }));
            navigation.navigate('EditTask');
          }}
        >
          {/*  */}
          <Text
            style={[
              tw('mt-1 leading-4 p-3'),
              {
                textDecorationLine: completed ? 'line-through' : 'none',
                color: completed ? 'gray' : 'black',
              },
            ]}
          >
            {title}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const TaskItem = memo(TaskItemMemo);
