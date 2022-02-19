import React, { VFC } from 'react';
import tw from 'tailwind-rn';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

//①Propsの方を指定する
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Task } from '../types/types';
import { Title } from '../components/Title';
//TaskList import
import { TaskItem } from '../components/TaskItem';
import { useToggleDeleteTask } from '../hooks/useToggleDeleteTask';
import { useGetTasks } from '../hooks/useGetTasks';

type Item = {
  item: Task;
};

//②navigationの型を指定する
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'TaskList'>;
};

export const TaskListScreen: VFC<Props> = ({ navigation }) => {
  //なぜエラーが入らないのか
  const { tag, deleteTask, toggleCompleted } = useToggleDeleteTask();
  const { tasks, getErr } = useGetTasks();
  //コンポーネント単位のlist作成

  const tasksKeyExtractor = (item: Task) => item.id;
  const tasksRenderItem = ({ item }: Item) => (
    <TaskItem
      id={item.id}
      title={item.title}
      createdAt={item.createdAt}
      completed={item.completed}
      photo={item.photo}
      //callbackを使用　サイレンダリングを防ぐため
      toggleCompleted={toggleCompleted}
      deleteTask={deleteTask}
    />
  );

  //const tag = useSelector(selectTag);

  return (
    <SafeAreaView style={tw('flex-1')}>
      <Title first="Tasks" last={tag.name} />
      <View style={tw('items-center')}>
        {/* モーダルを開く */}
        <TouchableOpacity onPress={() => navigation.navigate('CreateTask')}>
          <MaterialIcons name="playlist-add" size={40} color="#5f9ea0" />
        </TouchableOpacity>
        <Text style={tw('text-gray-700 mt-2 mb-5')}>Add Task</Text>
        {getErr !== '' && (
          <Text style={tw('text-red-500 my-5 font-semibold')}>{getErr}</Text>
        )}
      </View>
      <View style={tw('flex-1 my-2')}>
        <FlatList
          data={tasks}
          keyExtractor={tasksKeyExtractor}
          keyboardShouldPersistTaps="always"
          renderItem={tasksRenderItem}
        />
      </View>
    </SafeAreaView>
  );
};
