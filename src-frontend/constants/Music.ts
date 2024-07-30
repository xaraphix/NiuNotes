import { Interval, Note } from '@types'

const A = 'A'
const A_FLAT = 'Ab'
const A_SHARP = 'A#'
const B = 'B'
const B_FLAT = 'Bb'
const C = 'C'
const C_SHARP = 'C#'
const D = 'D'
const D_FLAT = 'Db'
const D_SHARP = 'D#'
const E = 'E'
const E_FLAT = 'Eb'
const F = 'F'
const F_SHARP = 'F#'
const G = 'G'
const G_FLAT = 'Gb'
const G_SHARP = 'G#'

export const NOTES = {
    [C]: <Note[]>[C],
    [C_SHARP]: <Note[]>[C_SHARP, D_FLAT],
    [D]: <Note[]>[D],
    [E_FLAT]: <Note[]>[D_SHARP, E_FLAT],
    [E]: <Note[]>[E],
    [F]: <Note[]>[F],
    [F_SHARP]: <Note[]>[F_SHARP, G_FLAT],
    [G]: <Note[]>[G],
    [A_FLAT]: <Note[]>[G_SHARP, A_FLAT],
    [A]: <Note[]>[A],
    [B_FLAT]: <Note[]>[A_SHARP, B_FLAT],
    [B]: <Note[]>[B],
}
export const OCTAVE_NOTES: Note[] = [
    C,
    C_SHARP,
    D,
    D_SHARP,
    E,
    F,
    F_SHARP,
    G,
    G_SHARP,
    A,
    A_SHARP,
    B,
]

export const INTERVALS = {
    '1': 0,
    b2: 1,
    '2': 2,
    '#2': 3,
    b3: 3,
    '3': 4,
    '#3': 5,
    b4: 4,
    '4': 5,
    '#4': 6,
    b5: 6,
    '5': 7,
    '#5': 8,
    b6: 8,
    '6': 9,
    '#6': 10,
    b7: 10,
    '7': 11,
}

export const MAJOR_SCALE = 'Major'
export const MINOR_SCALE = 'Minor'
export const PENTATONIC_MINOR_SCALE = 'Pentatonic Minor'
export const PENTATONIC_MAJOR_SCALE = 'Pentatonic Major'
export const BLUES_SCALE = 'Blues'
export const BEBOP_SCALE = 'Bebop'
export const IONIAN_MODE = 'Ionian'
export const DORIAN_MODE = 'Dorian'
export const PHRYGIAN_MODE = 'Phrygian'
export const LYDIAN_MODE = 'Lydian'
export const MIXOLYDIAN_MODE = 'Mixolydian'
export const AEOLIAN_MODE = 'Aeolian'
export const LOCRIAN_MODE = 'Locrian'
export const CHROMATIC_SCALE = 'Chromatic'
export const HARMONIC_MINOR_SCALE = 'Harmonic Minor'
export const AEOLIAN_SHARP_7_MODE = 'Aeolian #7'
export const LOCRIAN_SHARP_6_MODE = 'Locrian #6'
export const IONIAN_SHARP_5_MODE = 'Ionian #5'
export const DORIAN_SHARP_4_MODE = 'Dorian #4'
export const PHRYGIAN_DOMINANT_MODE = 'Phrygian Dominant'
export const LYDIAN_SHARP_2_SHARP_6_MODE = 'Lydian #2 #6'
export const SUPER_LOCRIAN_MODE = 'Super Locrian'
export const MELODIC_MINOR_SCALE = 'Melodic Minor'
export const MELODIC_MINOR_MODE = 'Melodic Minor Mode'
export const DORIAN_FLAT_2_MODE = 'Dorian b2'
export const LYDIAN_AUGMENTED_MODE = 'Lydian Augmented'
export const LYDIAN_DOMINANT_MODE = 'Lydian Dominant'
export const MIXOLYDIAN_FLAT_6_MODE = 'Mixolydian b6'
export const LOCRIAN_SHARP_2_SHARP_6_MODE = 'Locrian b2 b6'
export const ALTERED_MODE = 'Altered'
export const MAJOR_CHORD_SCALE = 'Major'
export const MINOR_CHORD_SCALE = 'Minor'
export const DOMINANT_CHORD_SCALE = 'Dominant'
export const AUGMENTED_CHORD_SCALE = 'Augmented'
export const DIMINISHED_CHORD_SCALE = 'Diminished'
export const MAJOR_SEVENTH_CHORD_SCALE = 'Major Seventh'
export const MINOR_SEVENTH_CHORD_SCALE = 'Minor Seventh'
export const DOMINANT_SEVENTH_CHORD_SCALE = 'Dominant Seventh'
export const HALF_DIMINISHED_SEVENTH_CHORD_SCALE = 'Half-Diminished Seventh'
export const DIMINISHED_SEVENTH_CHORD_SCALE = 'Diminished Seventh'
export const SUSPENDED_SECOND_SCALE = 'Suspended Second'
export const SUSPENDED_FOURTH_SCALE = 'Suspended Fourth'
export const SUSPENDED_CHORD_SCALE = 'Suspended'
export const SUSPENDED_SEVENTH_CHORD_SCALE = 'Suspended Seventh'
export const POPULAR = 'Popular'
export const MAJOR_SCALE_MODES = 'Majors'
export const MELODIC_MINOR_SCALE_MODES = 'Melodic Minors'
export const HARMONIC_MINOR_SCALE_MODES = 'Harmonic Minors'
export const CHORD_SCALES = 'Chords'
export const MISC = 'Misc'

export const SCALES = {
    [POPULAR]: {
        [MAJOR_SCALE]: <Interval[]>['1', '2', '3', '4', '5', '6', '7'],
        [MINOR_SCALE]: <Interval[]>['1', '2', 'b3', '4', '5', 'b6', 'b7'],
        [PENTATONIC_MINOR_SCALE]: <Interval[]>['1', 'b3', '4', '5', 'b7'],
        [PENTATONIC_MAJOR_SCALE]: <Interval[]>['1', '2', '3', '5', '6'],
        [BLUES_SCALE]: <Interval[]>['1', 'b3', '4', 'b5', '5', 'b7'],
        [BEBOP_SCALE]: <Interval[]>['1', '2', '3', '4', '5', 'b6', '6', '7'],
    },
    [MAJOR_SCALE_MODES]: {
        [IONIAN_MODE]: <Interval[]>['1', '2', '3', '4', '5', '6', '7'],
        [DORIAN_MODE]: <Interval[]>['1', '2', 'b3', '4', '5', '6', 'b7'],
        [PHRYGIAN_MODE]: <Interval[]>['1', 'b2', 'b3', '4', '5', 'b6', 'b7'],
        [LYDIAN_MODE]: <Interval[]>['1', '2', '3', '#4', '5', '6', '7'],
        [MIXOLYDIAN_MODE]: <Interval[]>['1', '2', '3', '4', '5', '6', 'b7'],
        [AEOLIAN_MODE]: <Interval[]>['1', '2', 'b3', '4', '5', 'b6', 'b7'],
        [LOCRIAN_MODE]: <Interval[]>['1', 'b2', 'b3', '4', 'b5', 'b6', 'b7'],
    },

    [MISC]: {
        [CHROMATIC_SCALE]: <Interval[]>[
            '1',
            'b2',
            '2',
            'b3',
            '3',
            '4',
            '#4',
            '5',
            '#5',
            '6',
            'b7',
            '7',
        ],
    },
    [HARMONIC_MINOR_SCALE_MODES]: {
        [HARMONIC_MINOR_SCALE]: <Interval[]>[
            '1',
            '2',
            'b3',
            '4',
            '5',
            'b6',
            '7',
        ],
        [AEOLIAN_SHARP_7_MODE]: <Interval[]>[
            '1',
            'b2',
            'b3',
            '4',
            'b5',
            'b6',
            '7',
        ],
        [LOCRIAN_SHARP_6_MODE]: <Interval[]>[
            '1',
            'b2',
            'b3',
            '4',
            'b5',
            '6',
            'b7',
        ],
        [IONIAN_SHARP_5_MODE]: <Interval[]>[
            '1',
            '2',
            '3',
            '#4',
            '5',
            'b6',
            '7',
        ],
        [DORIAN_SHARP_4_MODE]: <Interval[]>[
            '1',
            '2',
            'b3',
            '#4',
            '5',
            '6',
            'b7',
        ],
        [PHRYGIAN_DOMINANT_MODE]: <Interval[]>[
            '1',
            'b2',
            '3',
            '4',
            '5',
            'b6',
            'b7',
        ],
        [LYDIAN_SHARP_2_SHARP_6_MODE]: <Interval[]>[
            '1',
            '#2',
            '3',
            '#4',
            'b5',
            'b6',
            'b7',
        ],
        [SUPER_LOCRIAN_MODE]: <Interval[]>[
            '1',
            'b2',
            'b3',
            'b4',
            'b5',
            'b6',
            'b7',
        ],
    },
    [MELODIC_MINOR_SCALE_MODES]: {
        [MELODIC_MINOR_SCALE]: <Interval[]>['1', '2', 'b3', '4', '5', '6', '7'],
        [MELODIC_MINOR_MODE]: <Interval[]>['1', '2', 'b3', '4', '5', '6', '7'],
        [DORIAN_FLAT_2_MODE]: <Interval[]>[
            '1',
            'b2',
            'b3',
            '4',
            '5',
            '6',
            'b7',
        ],
        [LYDIAN_AUGMENTED_MODE]: <Interval[]>[
            '1',
            '2',
            '3',
            '#4',
            '#5',
            '6',
            '7',
        ],
        [LYDIAN_DOMINANT_MODE]: <Interval[]>[
            '1',
            '2',
            '3',
            '#4',
            '5',
            '6',
            'b7',
        ],
        [MIXOLYDIAN_FLAT_6_MODE]: <Interval[]>[
            '1',
            '2',
            '3',
            '4',
            '5',
            'b6',
            'b7',
        ],
        [LOCRIAN_SHARP_2_SHARP_6_MODE]: <Interval[]>[
            '1',
            'b2',
            '3',
            'b4',
            'b5',
            'b6',
            'b7',
        ],
        [ALTERED_MODE]: <Interval[]>['1', 'b2', 'b3', 'b4', 'b5', 'b6', 'b7'],
    },
    [CHORD_SCALES]: {
        [MAJOR_CHORD_SCALE]: <Interval[]>['1', '3', '5'],
        [MINOR_CHORD_SCALE]: <Interval[]>['1', 'b3', '5'],
        [DOMINANT_CHORD_SCALE]: <Interval[]>['1', '3', '5', 'b7'],
        [AUGMENTED_CHORD_SCALE]: <Interval[]>['1', '3', '#5'],
        [DIMINISHED_CHORD_SCALE]: <Interval[]>['1', 'b3', 'b5'],
        [MAJOR_SEVENTH_CHORD_SCALE]: <Interval[]>['1', '3', '5', '7'],
        [MINOR_SEVENTH_CHORD_SCALE]: <Interval[]>['1', 'b3', '5', 'b7'],
        [DOMINANT_SEVENTH_CHORD_SCALE]: <Interval[]>['1', '3', '5', 'b7'],
        [HALF_DIMINISHED_SEVENTH_CHORD_SCALE]: <Interval[]>[
            '1',
            'b3',
            'b5',
            'b7',
        ],
        [DIMINISHED_SEVENTH_CHORD_SCALE]: <Interval[]>['1', 'b3', 'b5', 'bb7'],
        [SUSPENDED_SECOND_SCALE]: <Interval[]>['1', '2', '4', '5'],
        [SUSPENDED_FOURTH_SCALE]: <Interval[]>['1', '4', '5'],
        [SUSPENDED_CHORD_SCALE]: <Interval[]>['1', '4', '5'],
        [SUSPENDED_SEVENTH_CHORD_SCALE]: <Interval[]>['1', '4', '5', 'b7'],
    },
}
