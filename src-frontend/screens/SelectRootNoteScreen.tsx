import {useLayoutEffect} from 'react';
import {Pressable, ScrollView, StatusBar, Text} from 'react-native';

import React from 'react';
import {View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import useGoto from '../useGoto';
import {HOME_SCREEN} from '@/constants/Routes';
import {useNotixStore} from '../stores/NotixStore';
import colors from '@/colors';
import {ArrowLeftIcon} from 'react-native-heroicons/solid';

const SelectRootNoteScreen: React.FunctionComponent = () => {
  StatusBar.setBarStyle('dark-content');
  StatusBar.setBackgroundColor('rgba(0,0,0,0)');
  StatusBar.setTranslucent(true);

  const goto = useGoto();
  const [rootNotes, selectRootNote] = useNotixStore(state => [
    state.rootNotes,
    state.selectRootNote,
  ]);
  const setRootNote = (note: Note) => {
    selectRootNote(note);
    goto(HOME_SCREEN);
  };
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <>
      <View className="h-full w-full bg-black px-4 font-heading">
        <View className="flex w-full flex-row items-center space-x-8 bg-black py-4 pl-8">
          <Pressable onPress={() => goto(HOME_SCREEN)}>
            <ArrowLeftIcon width={24} height={24} color={colors.PrimaryDark} />
          </Pressable>
          <Text className="text-2xl font-bold text-white">
            Select Root Note
          </Text>
        </View>
        <ScrollView
          horizontal={false}
          className="w-full"
          showsVerticalScrollIndicator={false}>
          {Object.entries(rootNotes).map(entry => (
            <Pressable
              key={entry[0]}
              onPress={() => setRootNote(entry[0] as Note)}
              className="group my-2 grow items-center justify-center rounded px-4 py-8 last:pb-8 active:bg-on-primary-dark/80">
              <Text className="text-lg text-white">{entry[1].join(' / ')}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </>
  );
};
export default SelectRootNoteScreen;
