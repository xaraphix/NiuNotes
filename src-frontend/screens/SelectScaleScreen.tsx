import {useLayoutEffect} from 'react';
import {Pressable, StatusBar, Text} from 'react-native';

import React from 'react';
import {ScrollView, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';
import colors from '@/colors';
import useGoto from '../useGoto';
import {useNotixStore} from '../stores/NotixStore';
import {HOME_SCREEN} from '@/constants/Routes';

const SelectScaleScreen: React.FunctionComponent = () => {
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('rgba(0,0,0,0)');
  StatusBar.setTranslucent(true);

  const goto = useGoto();
  const navigation = useNavigation();

  const [curatedScales, selectScale] = useNotixStore(state => [
    state.scales,
    state.selectScale,
  ]);

  const setScale = (scale: Scale) => {
    selectScale(scale);
    goto(HOME_SCREEN);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <>
      <View className="h-full w-full bg-black font-heading">
        <View className="flex w-full flex-row items-center space-x-8 bg-black py-4 pl-8">
          <Pressable onPress={() => goto(HOME_SCREEN)}>
            <ArrowLeftIcon w={24} h={24} color={colors.PrimaryDark} />
          </Pressable>
          <Text className="text-2xl font-bold text-white">Select Scale</Text>
        </View>
        <ScrollView horizontal={false} className="w-full">
          {Object.entries(curatedScales).map(curatedScaleEntry => {
            const category = curatedScaleEntry[0];
            const scalesInCategory = curatedScaleEntry[1];
            return (
              <View
                className="mb-12 flex w-full flex-col space-y-0 px-8"
                key={category}>
                <Text className="pb-4 font-sans text-lg font-bold text-surface-variant-dark">
                  {category}
                </Text>
                {Object.entries(scalesInCategory).map(scale => {
                  const scaleName = scale[0];
                  const intervals = scale[1];
                  return (
                    <View
                      className="flex w-full flex-col space-y-2 px-8"
                      key={scaleName}>
                      <Pressable
                        onPress={() =>
                          setScale({name: scaleName, intervals: intervals})
                        }
                        className="w-full border-b-2 border-surface-variant-dark/20 px-8 py-2 active:bg-on-primary-dark">
                        <View className="flex flex-row space-x-2">
                          <Text className="font-sans text-lg font-bold text-white">
                            {scaleName}
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default SelectScaleScreen;
