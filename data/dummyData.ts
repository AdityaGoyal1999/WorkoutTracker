
export const dummyWorkouts = {
    'Biceps': [
        'Bicep Curl',
        'Hammer Curl',
        'Concentration Curl',
        'Reverse Curl',
        'Preacher Curl',
    ],
    'Triceps': [
        'Tricep Dips',
        'Tricep Extension',
        'Tricep Kickback',
        'Tricep Pushdown',
        'Tricep Rope Pushdown',
    ],
    'Legs': [
        'Squats',
        'Lunges',
        'Leg Press',
        'Leg Curl',
        'Leg Extension',
    ],
    'Back': [
        'Pull Ups',
        'Deadlifts',
        'Bent Over Rows',
        'Seated Rows',
        'Lat Pulldowns',
    ],
}

export const dummyHistory = {
    'Bicep Curl': [
        {
            date: '2025-01-01',
            times: [
                {
                    reps: 10,
                    weight: '20lbs'
                },
                {
                    reps: 10,
                    weight: '20lbs'
                },
                {
                    reps: 10,
                    weight: '30lbs'
                }
            ]
        },
        {
            date: '2025-01-02',
            times: [
                {
                    reps: 10,
                    weight: '20lbs'
                },
                {
                    reps: 10,
                    weight: '20lbs'
                },
            ]
        }
    ]
}

export const workouts = [
    {
      name: 'Biceps',
      complete: false
    },
    {
      name: 'Triceps',
      complete: true
    },
    {
      name: 'Legs',
      complete: false
    },
    {
      name: 'Back',
      complete: false
    },
    {
      name: 'Shoulders',
      complete: false
    },
    {
      name: 'Chest',
      complete: false
    },
    {
      name: 'Core',
      complete: false
    },
    {
      name: 'Cardio',
      complete: false
    },
  ]