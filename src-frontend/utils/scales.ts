import {
    DrillDifficulty,
    ExerciseLength,
    INTERVALS,
    IntervalDirection,
    OCTAVE_NOTES,
} from '@constants'
import { Interval, Note, Scale } from '@types'
import { cloneDeep } from 'lodash'

export const getNotesFromIntervals = (
    root: Note,
    intervals: Interval[]
): Note[] => {
    const rootIndex = OCTAVE_NOTES.indexOf(root)
    if (rootIndex === -1) {
        return []
    }

    const notes: Note[] = []

    intervals.forEach(interval => {
        const intervalValue = INTERVALS[interval]
        if (intervalValue !== undefined) {
            const currentIndex = (intervalValue + rootIndex) % 12
            const note = OCTAVE_NOTES[currentIndex]
            notes.push(note)
        }
    })

    return notes
}

export const generateDrills = (
    scale: Scale,
    root: Note,
    drillDifficulty: DrillDifficulty,
    exerciseLength: ExerciseLength,
    intervalDirection: IntervalDirection
): [Note, Interval][][] => {
    let intervalsInScale = cloneDeep(scale.intervals)
    let result: [Note, Interval][][] = []
    switch (intervalDirection) {
        case IntervalDirection.ASC:
            result = generateSubarrays(root, intervalsInScale, drillDifficulty)
            break
        case IntervalDirection.DESC:
            intervalsInScale = intervalsInScale.reverse()
            result = generateSubarrays(root, intervalsInScale, drillDifficulty)
            break
        case IntervalDirection.RANDOM:
            shuffle(intervalsInScale)
            result = generateSubarrays(root, intervalsInScale, drillDifficulty)
            break
        default:
            break
    }

    if (result.length) {
        const length = result.length
        switch (exerciseLength) {
            case ExerciseLength.LONG:
                return result
            case ExerciseLength.MEDIUM:
                if (length > 10) {
                    return result.slice(0, 10)
                }
                return result
            case ExerciseLength.SHORT:
                if (length > 5) {
                    return result.slice(0, 5)
                }
                return result
            default:
                break
        }
    }

    return []
}

const shuffle = (array: Interval[] | Interval[][]) => {
    let currentIndex = array.length,
        randomIndex

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ]
    }

    return array
}

const generateSubarrays = (
    root: Note,
    intervals: Interval[],
    drillDifficulty: DrillDifficulty
): [Note, Interval][][] => {
    let maxDrillLength = 0
    let minDrillLength = 2
    const nIntervals = intervals.length

    switch (drillDifficulty) {
        case DrillDifficulty.HIGH:
            maxDrillLength = Math.min(nIntervals, 6)
            minDrillLength = Math.min(nIntervals, 3)
            break
        case DrillDifficulty.MEDIUM:
            maxDrillLength = Math.min(nIntervals, 4)
            break
        case DrillDifficulty.LOW:
            maxDrillLength = Math.min(nIntervals, 3)
            break
        default:
            maxDrillLength = nIntervals
            break
    }

    if (minDrillLength === maxDrillLength) {
        minDrillLength -= 1
    }

    const drills = generateSubsequencesInRange(
        intervals,
        minDrillLength,
        maxDrillLength
    )

    return drills.map(drill => {
        const notesInDrill = getNotesFromIntervals(root, drill)
        return drill.map((interval, idx) => [notesInDrill[idx], interval])
    })
}

const generateSubsequencesInRange = (
    array: Interval[],
    minLength: number,
    maxLength: number
): Interval[][] => {
    const result: Interval[][] = []
    const set = new Set()
    const generate = (index: number, path: Interval[]) => {
        const size = path.length
        if (size >= minLength && size <= maxLength) {
            const subseqStr = path.join(',')
            if (!set.has(subseqStr)) {
                result.push(path.slice())
                set.add(subseqStr)
            }
        }
        if (index === array.length) {
            return
        }

        generate(index + 1, path)

        path.push(array[index])
        generate(index + 1, path)
        path.pop()
    }

    generate(0, [])

    shuffle(result)
    return result
}
