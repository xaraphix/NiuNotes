import {create} from 'zustand';
import {cloneDeep} from 'lodash';
import {
  CHORD_SCALES,
  MAJOR_CHORD_SCALE,
  NOTES,
  OCTAVE_NOTES,
  SCALES,
} from '@/src-frontend/constants/Music';
import {
  DrillDifficulty,
  ExerciseLength,
  IntervalDirection,
} from '@/constants/Workout';
import {generateDrills} from '@/utils/scales';
interface NotixStoreState {
  scales: Record<string, Record<string, Interval[]>>;
  rootNotes: Record<string, Note[]>;
  scale: Scale;
  rootNote: Note;

  intervalDirection: IntervalDirection;
  drillDifficulty: DrillDifficulty;
  exerciseLength: ExerciseLength;
  setIntervalDirection: (dir: IntervalDirection) => void;
  setDrillDifficulty: (len: DrillDifficulty) => void;
  setExerciseLength: (len: ExerciseLength) => void;

  selectRootNote: (note: Note) => void;
  selectScale: (scale: Scale) => void;

  drills: [Note, Interval][][];
  generateDrills: () => void;
}

export const useNotixStore = create<NotixStoreState>()(set => ({
  scales: SCALES,
  rootNotes: NOTES,
  rootNote: OCTAVE_NOTES[0],
  scale: {
    name: MAJOR_CHORD_SCALE,
    intervals: SCALES[CHORD_SCALES][MAJOR_CHORD_SCALE],
  },

  drills: [],
  intervalDirection: IntervalDirection.ASC,
  drillDifficulty: DrillDifficulty.LOW,
  exerciseLength: ExerciseLength.MEDIUM,

  generateDrills: () =>
    set(state => {
      const drills = generateDrills(
        state.scale,
        state.rootNote,
        state.drillDifficulty,
        state.exerciseLength,
        state.intervalDirection,
      );
      return {drills: drills};
    }),

  setIntervalDirection: (dir: IntervalDirection) =>
    set(_ => ({intervalDirection: dir})),

  setExerciseLength: (exerciseLength: ExerciseLength) =>
    set(_ => ({exerciseLength})),
  setDrillDifficulty: (drillDifficulty: DrillDifficulty) =>
    set(_ => ({drillDifficulty})),

  selectRootNote: (note: Note) => set(_state => ({rootNote: note})),
  selectScale: (scale: Scale) => set(_ => ({scale: cloneDeep(scale)})),
}));
