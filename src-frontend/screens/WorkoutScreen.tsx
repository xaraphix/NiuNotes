import { useEffect, useLayoutEffect, useState } from 'react'
import {
    NativeEventEmitter,
    NativeModules,
    StatusBar,
    Text,
} from 'react-native'

import React from 'react'
import { View } from 'react-native'

import { HOME_SCREEN } from '@constants'
import { useGoto } from '@hooks'
import { useNavigation } from '@react-navigation/native'
import { useNotixStore } from '@stores'
import Animated, {
    runOnJS,
    SharedValue,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated'
import { ReText } from 'react-native-redash'
export const WorkoutScreen: React.FunctionComponent = () => {
    StatusBar.setBarStyle('light-content')
    StatusBar.setBackgroundColor('rgba(0,0,0,0)')
    StatusBar.setTranslucent(true)
    const navigation = useNavigation()
    const goto = useGoto()
    const currentDrillIdx = useSharedValue(0)
    const currentNoteIdx = useSharedValue(0)
    const [drills, generateDrills] = useNotixStore(state => [
        state.drills,
        state.generateDrills,
    ])

    const [drillIdx, setDrillIdx] = useState(0)
    const eventEmitter = new NativeEventEmitter(NativeModules.TunerModule)
    const note = useSharedValue('A')
    const amplitude = useSharedValue('0.0')
    const NOTE_CALCUALTED = 'NOTE_CALCULATED'
    const { TunerModule } = NativeModules

    const drillComplete = useSharedValue(0)
    const drillStyle = useAnimatedStyle(() => ({
        opacity: drillComplete.value,
    }))

    const interval = useDerivedValue(() => {
        if (
            drills &&
            drills[currentDrillIdx.value] &&
            drills[currentDrillIdx.value][currentNoteIdx.value]
        )
            return drills[currentDrillIdx.value][
                currentNoteIdx.value
            ][1].toString()
        else return ''
    })
    const remainingDrills = useDerivedValue(() => {
        return `${drills.length - currentDrillIdx.value - 1} drills remaining`
    })

    useDerivedValue(() => {
        const noteName = (note.value || ' ').substring(0, note.value.length)
        const octave = (note.value || ' ').substring(
            note.value.length - 1,
            note.value.length
        )
        const currentDrill = drills[currentDrillIdx.value] || [[]]
        const currentNote = currentDrill[currentNoteIdx.value] || []
        const currentNoteName = currentNote[0] || ''

        const moveToNextNote = () => {
            if (
                currentNoteIdx.value <
                (drills[currentDrillIdx.value] || []).length
            ) {
                currentNoteIdx.value += 1
            }

            if (
                currentNoteIdx.value ===
                (drills[currentDrillIdx.value] || []).length
            ) {
                moveToNextDrill()
            }
        }

        const moveToNextDrill = () => {
            if (currentDrillIdx.value < drills.length) {
                drillComplete.value = withTiming(0, { duration: 1000 }, () => {
                    currentDrillIdx.value += 1
                    currentNoteIdx.value = 0
                    drillComplete.value = withDelay(100, withTiming(1))
                    runOnJS(setDrillIdx)(currentDrillIdx.value)
                    if (currentDrillIdx.value === drills.length) {
                        runOnJS(goto)(HOME_SCREEN)
                    }
                })
            }
        }

        if (
            noteName === currentNoteName &&
            !(octave === '0' || octave === '1')
        ) {
            moveToNextNote()
        }

        return noteName
    })

    useEffect(() => {
        generateDrills()
        drillComplete.value = withTiming(1, { duration: 2000 })
        const eventListener = eventEmitter.addListener(
            NOTE_CALCUALTED,
            event => {
                const [_note, _deviationCents, _amplitude] =
                    event.note.split(';')
                if (parseFloat(_amplitude) < 0.01) {
                    return
                }
                note.value = _note.substring(0, _note.length - 1)
                amplitude.value = '1000'
                amplitude.value = _amplitude
            }
        )

        TunerModule.recordAudio()

        return () => {
            eventListener.remove()
        }
    }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    })

    return (
        <>
            <View className="h-full w-full items-center justify-center bg-black pt-12 font-heading">
                <View className="absolute top-0 flex w-full flex-row items-center justify-center pt-12">
                    <ReText
                        style={[{ opacity: 0 }, drillStyle]}
                        text={remainingDrills}
                        className="text-2xl text-white"
                    />
                </View>
                <View className="flex w-full flex-row items-center justify-center">
                    <ReText
                        style={[{ opacity: 0 }, drillStyle]}
                        text={interval}
                        className="mt-8 text-9xl text-white"
                    />
                </View>

                <Animated.View
                    className="flex w-full flex-row items-center justify-center"
                    style={[{ opacity: 0 }, drillStyle]}>
                    <View
                        key={`${drillIdx}`}
                        className="flex h-full w-full flex-row items-center justify-center space-x-4">
                        {(drills[currentDrillIdx.value] || []).map(
                            ([noteName, interval], idx) => (
                                <View
                                    className="flex flex-col space-y-2"
                                    key={`${currentDrillIdx.value}-${idx}`}>
                                    <AnimatedTextItem
                                        idx={idx}
                                        currNoteIdx={currentNoteIdx}
                                        text={interval}
                                    />
                                    <AnimatedTextItem
                                        idx={idx}
                                        currNoteIdx={currentNoteIdx}
                                        text={noteName}
                                    />
                                </View>
                            )
                        )}
                    </View>
                </Animated.View>
            </View>
        </>
    )
}

const AnimatedText = Animated.createAnimatedComponent(Text)
type AnimatedTextProps = {
    text: string
    idx: number
    currNoteIdx: SharedValue<number>
}

const AnimatedTextItem: React.FC<AnimatedTextProps> = ({
    text,
    currNoteIdx,
    idx,
}) => {
    const style = useAnimatedStyle(() => ({
        fontSize: 64,
        color: currNoteIdx.value > idx ? '#03fcca' : '#8a8a8a',
        transform: [
            {
                scale:
                    currNoteIdx.value > idx
                        ? withDelay(
                              200,
                              withTiming(0.5, {
                                  duration: 700,
                              })
                          )
                        : 1,
            },
        ],
    }))

    return <AnimatedText style={style}>{text}</AnimatedText>
}
