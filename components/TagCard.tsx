//tagListのコンポーネントに反応しないようにmemo化していく
import React, { VFC, memo } from 'react';
import tw from 'tailwind-rn';
import {
  Text,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { setSelectedTag } from '../slices/todoSlice';
import { RootStackParamList } from '../types/types';
import { useDeleteTag } from '../hooks/useDeleteTag';
import { initialWindowMetrics } from 'react-native-safe-area-context';

type Props = {
  id: string;
  name: string;
};

//横幅の取得
const { width } = Dimensions.get('window');

const TagCardMemo: VFC<Props> = ({ id, name }) => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { deleteTag, deleteErr } = useDeleteTag();

  //TaskStackに遷移
  const navToTaskStack = () => {
    dispatch(setSelectedTag({ id, name }));
    navigation.navigate('TaskStack');
  };

  const deleteTagItem = async (idx: string) => {
    Alert.alert('Deleteing', 'Are you sure?', [
      {
        text: 'cancel',
        onPress: () => {},
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteTag(idx);
        },
      },
    ]);
  };
  return (
    <TouchableOpacity
      //taskcardのサイドの影やborder
      style={[
        tw('my-1 mx-2 items-center border-green-600 border-l-4 bg-white'),
        {
          //左右20削る
          width: width - 20 * 2,
          shadowColor: 'black',
          shadowOffset: {
            width: 4,
            height: 4,
          },
          shadowOpacity: 0.5,
          shadowRadius: 2,
        },
      ]}
      onPress={navToTaskStack}
      onLongPress={() => deleteTagItem(id)}
    >
      <Text
        style={[
          tw('text-lg font-medium text-gray-700 py-1'),
          {
            fontFamily: Platform.select({
              ios: 'GillSans-Italic',
              android: 'sans-serif-condensed',
            }),
          },
        ]}
      >
        {name}
      </Text>
      {/* エラー時の処理 */}
      {deleteErr !== '' && (
        <Text style={tw('text-red-500 font-semibold')}>{deleteErr}</Text>
      )}
    </TouchableOpacity>
  );
};

export const TagCard = memo(TagCardMemo);
