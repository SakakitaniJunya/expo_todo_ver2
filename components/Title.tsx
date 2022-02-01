import React, { VFC } from 'react';
import tw from 'tailwind-rn';
import { View, Text } from 'react-native';

type Props = {
  first: string;
  last: string;
};

export const Title: VFC<Props> = ({ first, last }) => (
  <View style={[tw('flex-row my-6 px-1'), { borderColor: '#5f9ea0' }]}>
    {/*左側のボーダ*/}
    <View
      style={[tw('flex-1 ml-1 border self-center'), { borderColor: '#5f9ea0' }]}
    ></View>

    <Text style={tw('text-gray-700 text-3xl font-extrabold')}>
      {`${first}`}
      <Text style={[tw('font-light'), { color: '#5f9ea0' }]}>{last}</Text>
    </Text>
    {/*右側のボーダ*/}
    <View
      style={[tw('flex-1 ml-1 border self-center'), { borderColor: '#5f9ea0' }]}
    ></View>
  </View>
);
