import React, { VFC } from 'react';
import tw from 'tailwind-rn';
import { View, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { auth } from '../firebaseConfig';
import { selectUser, logout } from '../slices/userSlice';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/types';
import { TagListScreen } from '../screens/TagListScreen';

import { CreateTagScreen } from '../screens/CreateTagScreen';
import { IconButton } from '../components/IconButton';

import { TaskStackNavigator } from './TaskStackNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const TagStackNavigator: VFC = () => {
  //ナビゲーションに表示させるため
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const signout = async () => {
    try {
      await auth.signOut();
      dispatch(logout());
    } catch (err: any) {
      Alert.alert(err.massege);
    }
  };

  return (
    <Stack.Navigator>
      <Stack.Group
        //ヘッダー情報
        //共通部分があれば、配列にする
        screenOptions={{
          headerStyle: {
            backgroundColor: '#008b8b',
          },
          headerTitle: user.email,
          headerTintColor: 'white',
          headerBackTitle: 'Back',
          headerRight: () => (
            <View style={tw('mr-3')}>
              <IconButton
                name="logout"
                size={20}
                color="white"
                onPress={signout}
              />
            </View>
          ),
        }}
      >
        <Stack.Screen name="TagList" component={TagListScreen} />
        <Stack.Screen name="TaskStack" component={TaskStackNavigator} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          headerShown: false,
        }}
      >
        <Stack.Screen name="CreateTag" component={CreateTagScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
