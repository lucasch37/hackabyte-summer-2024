export const challenges = [
    {
        name: "Push Ups",
        id: "push_ups",
        latitude: 47.6534444444,
        longitude: -122.141222222,
        difficulty: 4,
    },
    {
        name: "Squats",
        id: "squats",
        latitude: 47.6517222222,
        longitude: -122.140861111,
        difficulty: 3,
    },
    {
        name: "Leg Stretch",
        id: "leg_stretch",
        latitude: 47.65225,
        longitude: -122.14275,
        difficulty: 2,
    },
    {
        name: "Burpee",
        id: "burpee",
        latitude: 47.6532222222,
        longitude: -122.142888889,
        difficulty: 5,
    },
    {
        name: "Arm Stretch",
        id: "arm_stretch_1",
        latitude: 47.6534722222,
        longitude: -122.141824,
        difficulty: 1,
    },
    {
        name: "Arm Stretch",
        id: "arm_stretch_2",
        latitude: 47.6534444444,
        longitude: -122.142638889,
        difficulty: 1,
    },
    {
        name: "Jumping Jacks",
        id: "jumping_jacks",
        latitude: 47.6528333333,
        longitude: -122.141777778,
        difficulty: 3,
    },
];

export type ChallengeType = (typeof challenges)[number];
