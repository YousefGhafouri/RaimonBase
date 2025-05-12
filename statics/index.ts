const GenderType = {
    None: 'None',
    Male: 'Male',
    Female: 'Female'
} as const;

export const gender = [
    {
        label: 'زن',
        value: GenderType.Female,
    },
    {
        label: 'مرد',
        value: GenderType.Male,
    },
];
