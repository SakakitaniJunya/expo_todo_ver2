import React, { VFC, useState } from 'react';
import tw from 'tailwind-rn';
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { useCreateTask } from '../hooks/useCreateTask';
import { Title } from '../components/Title';
import { IconButton } from '../components/IconButton';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateTask'>;
};

export const CreateTaskScreen: VFC<Props> = ({ navigation }) => {
  const { createErr, editedTask, createTask, onChangeTask, resetInput } =
    useCreateTask({
      navigation,
    });

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<any>('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(date);
  };

  const showMode = (currentMode: any) => {
    setShow(!show);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView style={tw('flex-1 bg-gray-100')}>
      <View>
        <TouchableOpacity
          onPress={() => {
            resetInput(), navigation.goBack();
          }}
        >
          <AntDesign name="close" size={25} color="gray" />
        </TouchableOpacity>
        {/* 左にの要素 */}
        <View />
      </View>
      <Title first="New" last="Task" />
      <View style={tw('mb-5 mx-1 items-center ')}>
        <TextInput
          style={tw('mb-5 mx-1')}
          autoCapitalize="none"
          autoFocus
          multiline
          placeholder="New task ?"
          value={editedTask.title}
          onChangeText={(txt: string) => onChangeTask(txt)}
        />
        <TextInput
          style={tw('mb-5 mx-1')}
          autoCapitalize="none"
          autoFocus
          multiline
          placeholder="What finish date ?"
          value={editedTask.title}
          onPressIn={showDatepicker}
        />

        <DateTimePicker
          style={[tw('mb-1 mx-1'), { width: 200 }]}
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          display="spinner"
          onChange={onChange}
        />

        <TextInput
          style={tw('mb-5 mx-1')}
          autoCapitalize="none"
          autoFocus
          multiline
          placeholder="test time"
          value={editedTask.title}
          onChangeText={showTimepicker}
        />

        {/* New */}

        {show && (
          <DateTimePicker
            style={{ width: 90 }}
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="calendar"
            onChange={onChange}
          />
        )}

        {/*
        <View>
          <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        <View>
          <Button onPress={showTimepicker} title="Show time picker!" />
        </View>

        */}
      </View>
      <IconButton name="plus" size={20} color="gray" onPress={createTask} />
      {createErr !== '' && (
        <Text style={tw('text-red-500 my-3 font-semibold')}>{createErr}</Text>
      )}
    </SafeAreaView>
  );
};
