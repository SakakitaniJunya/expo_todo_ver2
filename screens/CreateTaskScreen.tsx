import React, { VFC, useState } from 'react';
import tw from 'tailwind-rn';
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  //datetimepicker demo
  Button,
  StyleSheet,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { AntDesign } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { useCreateTask } from '../hooks/useCreateTask';
import { Title } from '../components/Title';
import { IconButton } from '../components/IconButton';
import { fromUnixTime } from 'date-fns/esm';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateTask'>;
};

export const CreateTaskScreen: VFC<Props> = ({ navigation }) => {
  const { createErr, editedTask, createTask, onChangeTask, resetInput } =
    useCreateTask({
      navigation,
    });

  //datetimepicker--------------------------------------------------

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.warn('A date has been picked : ', date);
    hideDatePicker;
  };

  //datetimepicker--------------------------------------------------

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
          style={tw('w-5/6')}
          autoCapitalize="none"
          autoFocus
          multiline
          placeholder="New task ?"
          value={editedTask.title}
          onChangeText={(txt: string) => onChangeTask(txt)}
        />
      </View>

      {/* New */}
      <View style={tw('mb-5 mx-1 items-center ')}>
        <Button title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>

      <IconButton name="plus" size={20} color="gray" onPress={createTask} />
      {createErr !== '' && (
        <Text style={tw('text-red-500 my-3 font-semibold')}>{createErr}</Text>
      )}
    </SafeAreaView>
  );
};
