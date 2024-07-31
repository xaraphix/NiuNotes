import { useLayoutEffect } from 'react'
import { Pressable, StatusBar, Text } from 'react-native'

import React from 'react'
import { View } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { useGoto } from '@hooks'
import { useNotixStore } from '@stores'
import {
    SELECT_ROOT_NOTE_SCREEN,
    SELECT_SCALE_SCREEN,
    WORKOUT_SCREEN,
    colors,
} from '@constants'
import { DrillDifficulty, ExerciseLength, IntervalDirection } from '@constants'

export const HomeScreen: React.FunctionComponent = () => {
    StatusBar.setBarStyle('dark-content')
    StatusBar.setBackgroundColor('rgba(0,0,0,0)')
    StatusBar.setTranslucent(true)

    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    })

    return (
        <>
            <View className="h-full w-full bg-black font-heading">
                <View className="flex h-full w-full items-center justify-center">
                    <RootNote />
                    <Scales />
                    <Options />
                    <StartWorkoutButton />
                    <NotixText />
                </View>
            </View>
        </>
    )
}

const Scales: React.FC = () => {
    const selectedScale = useNotixStore(state => state.scale)
    const goto = useGoto()
    return (
        <View className="mt-2 flex w-full px-8 ">
            <Pressable
                onPress={() => goto(SELECT_SCALE_SCREEN)}
                className="flex w-full flex-col space-y-2 rounded-xl bg-primary-container-dark px-8 py-4">
                <Text className="text-md font-sans text-white">Scale</Text>

                <Text className="font-sans text-2xl  text-white">
                    {selectedScale.name}
                </Text>
                <View className="flex flex-row space-x-4">
                    <Text className="font-sans font-bold text-tertiary-dark">
                        {selectedScale.intervals.join(' ')}
                    </Text>
                </View>
            </Pressable>
        </View>
    )
}
const RootNote: React.FC = () => {
    const selectedRootNote = useNotixStore(state => state.rootNote)
    const goto = useGoto()
    return (
        <View className="flex w-full px-8 ">
            <Pressable
                onPress={() => goto(SELECT_ROOT_NOTE_SCREEN)}
                className="flex w-full flex-col space-y-2 rounded-xl bg-primary-container-dark px-8 py-4">
                <Text className="text-md font-sans text-white">Root</Text>
                <Text className="font-sans text-5xl  text-on-primary-container-dark">
                    {selectedRootNote}
                </Text>
            </Pressable>
        </View>
    )
}

const Options: React.FC = () => {
    const [selectedDifficulty, setSelectedDifficulty] = useNotixStore(state => [
        state.drillDifficulty,
        state.setDrillDifficulty,
    ])
    const [selectedDirection, setSelectedDirection] = useNotixStore(state => [
        state.intervalDirection,
        state.setIntervalDirection,
    ])
    const [selectedExerciseLength, setSelectedExerciseLength] = useNotixStore(
        state => [state.exerciseLength, state.setExerciseLength]
    )

    return (
        <View className=" flex w-full items-center justify-center space-y-4 py-12">
            <View className=" flex w-full flex-row  items-center justify-between  px-8">
                <Text className="rounded-xl bg-opacity-50 px-4 py-2  text-xs font-bold text-white">
                    Difficulty
                </Text>
                <View
                    className="flex flex-row space-x-2"
                    key={selectedDifficulty}>
                    <Pressable
                        onPress={() =>
                            setSelectedDifficulty(DrillDifficulty.LOW)
                        }
                        className="h-full rounded-xl bg-opacity-50 px-4 py-2"
                        style={{
                            backgroundColor:
                                selectedDifficulty === DrillDifficulty.LOW
                                    ? colors.PrimaryContainerDark
                                    : '',
                        }}>
                        <Text className="text-xs font-bold  text-white ">
                            Easy
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            setSelectedDifficulty(DrillDifficulty.MEDIUM)
                        }
                        className="h-full rounded-xl bg-opacity-50 px-4 py-2"
                        style={{
                            backgroundColor:
                                selectedDifficulty === DrillDifficulty.MEDIUM
                                    ? colors.PrimaryContainerDark
                                    : '',
                        }}>
                        <Text className="text-xs font-bold  text-white ">
                            Medium
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            setSelectedDifficulty(DrillDifficulty.HIGH)
                        }
                        className="h-full rounded-xl bg-opacity-50 px-4 py-2"
                        style={{
                            backgroundColor:
                                selectedDifficulty === DrillDifficulty.HIGH
                                    ? colors.PrimaryContainerDark
                                    : '',
                        }}>
                        <Text className="text-xs font-bold  text-white ">
                            High
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View className=" flex w-full flex-row  items-center justify-between px-8">
                <Text className="rounded-xl bg-opacity-50 px-4 py-2  text-xs font-bold text-white">
                    Length
                </Text>
                <View
                    className="flex flex-row space-x-2"
                    key={selectedExerciseLength}>
                    <Pressable
                        onPress={() =>
                            setSelectedExerciseLength(ExerciseLength.SHORT)
                        }
                        className="h-full rounded-xl bg-opacity-50 px-4 py-2"
                        style={{
                            backgroundColor:
                                selectedExerciseLength === ExerciseLength.SHORT
                                    ? colors.PrimaryContainerDark
                                    : '',
                        }}>
                        <Text className="text-xs font-bold  text-white ">
                            Short
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            setSelectedExerciseLength(ExerciseLength.MEDIUM)
                        }
                        className="h-full rounded-xl bg-opacity-50 px-4 py-2"
                        style={{
                            backgroundColor:
                                selectedExerciseLength === ExerciseLength.MEDIUM
                                    ? colors.PrimaryContainerDark
                                    : '',
                        }}>
                        <Text className="text-xs font-bold  text-white ">
                            Medium
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            setSelectedExerciseLength(ExerciseLength.LONG)
                        }
                        className="h-full rounded-xl bg-opacity-50 px-4 py-2"
                        style={{
                            backgroundColor:
                                selectedExerciseLength === ExerciseLength.LONG
                                    ? colors.PrimaryContainerDark
                                    : '',
                        }}>
                        <Text className="text-xs font-bold  text-white ">
                            Long
                        </Text>
                    </Pressable>
                </View>
            </View>
            <View className=" flex w-full flex-row  items-center justify-between px-8">
                <Text className="rounded-xl bg-opacity-50 px-4 py-2  text-xs font-bold text-white">
                    Direction
                </Text>
                <View
                    className="flex flex-row space-x-2"
                    key={selectedDirection}>
                    <Pressable
                        onPress={() =>
                            setSelectedDirection(IntervalDirection.ASC)
                        }
                        className="h-full rounded-xl bg-opacity-50 px-4 py-2"
                        style={{
                            backgroundColor:
                                selectedDirection === IntervalDirection.ASC
                                    ? colors.PrimaryContainerDark
                                    : '',
                        }}>
                        <Text className="text-xs font-bold  text-white ">
                            Ascending
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            setSelectedDirection(IntervalDirection.DESC)
                        }
                        className="h-full rounded-xl bg-opacity-50 px-4 py-2"
                        style={{
                            backgroundColor:
                                selectedDirection === IntervalDirection.DESC
                                    ? colors.PrimaryContainerDark
                                    : '',
                        }}>
                        <Text className="text-xs font-bold  text-white ">
                            Descending
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={() =>
                            setSelectedDirection(IntervalDirection.RANDOM)
                        }
                        className="h-full rounded-xl bg-opacity-50 px-4 py-2"
                        style={{
                            backgroundColor:
                                selectedDirection === IntervalDirection.RANDOM
                                    ? colors.PrimaryContainerDark
                                    : '',
                        }}>
                        <Text className="text-xs font-bold  text-white ">
                            Random
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const NotixText: React.FC = () => {
    return (
        <View className="absolute bottom-12 flex w-full items-center justify-center">
            <Text className="font-sans text-5xl  text-surface-dark">Notix</Text>
        </View>
    )
}
const StartWorkoutButton: React.FC = () => {
    const goto = useGoto()
    const onPress = () => {
        goto(WORKOUT_SCREEN)
    }

    return (
        <View className="flex w-full items-center justify-center py-10">
            <View className="flex w-64 flex-row items-center overflow-hidden rounded-2xl bg-primary-dark shadow-xl shadow-[#0000ff]">
                <Pressable
                    android_ripple={{
                        radius: 0,
                        color: '#adadad',
                    }}
                    onPress={onPress}
                    className="flex h-full w-full flex-row items-center justify-center space-x-4 rounded-2xl border-8 border-l-0 
          border-t-0 border-inverse-primary-dark py-6 active:border-b-0 active:border-l-8 active:border-r-0 active:border-t-8 active:border-inverse-primary-dark ">
                    <Text className="font-heading text-sm font-bold text-on-primary-dark ">
                        START WORKOUT
                    </Text>
                </Pressable>
            </View>
        </View>
    )
}
