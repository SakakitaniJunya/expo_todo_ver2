import React, { VFC } from 'react';
import tw from 'tailwind-rn';
import { SafeAreaView, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthStackNavigator } from '../navigations/AuthStackNavigator';
import { TagStackNavigator } from '../navigations/TagStackNavigator';
import { useAuthState } from '../hooks/useAuthState';

export const RootNavigator: VFC = () => {
  //userの情報を監視していて、その情報を変数に格納するメソッド
  const { user, isLoading } = useAuthState();

  //ロード中の時
  if (isLoading) {
    return (
      <SafeAreaView style={tw('flex-1 items-center justify-center')}>
        <ActivityIndicator size="large" color="gray" />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      {/*//uidがundifinedか？ */}
      {user?.uid ? <TagStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};
