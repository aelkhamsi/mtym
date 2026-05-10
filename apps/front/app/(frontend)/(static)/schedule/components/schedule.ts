const getBgColor = (key?: string) => {
  switch(key) {
    case 'contest':
      return 'bg-red-400';
    case 'talks':
      return 'bg-orange-400';
    case 'fun':
      return 'bg-green-400';
    case 'eating':
      return 'bg-purple-200';
    case 'workshop':
      return 'bg-blue-400';
    case 'other':
      return 'bg-gray-100';
    default:
      return 'bg-gray-400';
  }
}

type Activity = {
  rowspan: number,
  label: string,
  description?: string,
  bgColor?: string,
}

export type DaySchedule = (Activity|Activity[])[];

export const dayLabels = [
  'Friday July 25th',
  'Saturday July 26th',
  'Sunday July 27th',
  'Monday July 28th',
  'Tuesday July 29th',
]

export const schedule: DaySchedule[] = [
  [
    { rowspan: 14, label: '', bgColor: getBgColor() },
    { rowspan: 8, label: 'Check-in', bgColor: getBgColor('other') },
    { rowspan: 3, label: `Opening ceremony`, description: 'Amphi CCI', bgColor: getBgColor('contest') },
    { rowspan: 2, label: 'Dinner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Trivia Quiz', description: 'Amphi CCI', bgColor: getBgColor('fun') },
  ],
  [
    { rowspan: 2, label: 'Breakfast', bgColor: getBgColor('eating') },
    { rowspan: 8, label: 'Contest Day 1', description: 'EMINES building', bgColor: getBgColor('contest') },
    { rowspan: 4, label: 'Lunch', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Conference Pr. Omar Mouchtaki (NYU)', description: 'Amphi CCI', bgColor: getBgColor('talks') },
    { rowspan: 1, label: 'Coffee break', bgColor: getBgColor('other') },
    [
      { rowspan: 3, label: 'Orientation workshop', description: 'Amphi CCI', bgColor: getBgColor('workshop') },
      { rowspan: 3, label: 'Scientific workshops', description: 'CoC', bgColor: getBgColor('workshop') },
    ],
    [
      { rowspan: 3, label: 'Scientific workshops', description: 'CoC', bgColor: getBgColor('workshop') },
      { rowspan: 3, label: 'Orientation workshop', description: 'Amphi CCI', bgColor: getBgColor('workshop') },
    ],
    { rowspan: 1, label: '', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Dinner', bgColor: getBgColor('eating') },
    [
      { rowspan: 3, label: 'Board games', description: 'CoC', bgColor: getBgColor('fun') },
      { rowspan: 3, label: 'Day 1 solutions debrief', description: 'Amphi CCI', bgColor: getBgColor('contest') },
    ],
  ],
  [
    { rowspan: 2, label: 'Breakfast', bgColor: getBgColor('eating') },
    { rowspan: 8, label: 'Contest Day 2', description: 'EMINES building', bgColor: getBgColor('contest') },
    { rowspan: 4, label: 'Lunch', bgColor: getBgColor('eating') },
    { rowspan: 4, label: 'Industry Panel', description: 'Amphi CCI', bgColor: getBgColor('talks') },
    { rowspan: 2, label: 'Coffee break / Group picture', bgColor: getBgColor('other') },
    { rowspan: 3, label: 'Conference Pr. Mohamed Abouzaid (Stanford)', description: 'Amphi CCI', bgColor: getBgColor('talks') },
    { rowspan: 2, label: '', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Dinner', bgColor: getBgColor('eating') },
    [
      { rowspan: 3, label: 'Board games', description: 'CoC', bgColor: getBgColor('fun') },
      { rowspan: 3, label: 'Day 2 solutions debrief', description: 'Amphi CCI', bgColor: getBgColor('contest') },
    ],
  ],
  [
    { rowspan: 2, label: 'Breakfast', bgColor: getBgColor('eating') },
    { rowspan: 8, label: 'Sports Tournament', description: 'Sports fields', bgColor: getBgColor('fun') },
    { rowspan: 4, label: 'Lunch', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Conference Pr. Nader Masmoudi (NYU)', description: 'Amphi CCI', bgColor: getBgColor('talks') },
    { rowspan: 1, label: 'Coffee break', bgColor: getBgColor('other') },
    [
      { rowspan: 3, label: 'Grades dispute', description: 'CoC', bgColor: getBgColor('contest') },
      { rowspan: 3, label: 'Scientific workshops', description: 'CoC', bgColor: getBgColor('workshop') },
    ],
    [
      { rowspan: 3, label: 'Scientific workshop', description: 'CoC', bgColor: getBgColor('workshop') },
      { rowspan: 3, label: 'Grades dispute', description: 'CoC', bgColor: getBgColor('contest') },
    ],
    { rowspan: 1, label: '', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Dinner', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Treasure hunt / Board games', description: 'CoC', bgColor: getBgColor('fun') },
  ],
  [
    { rowspan: 3, label: 'Breakfast', bgColor: getBgColor('eating') },
    { rowspan: 3, label: 'Closing ceremony', description: 'Amphi CCI', bgColor: getBgColor('contest') },
    { rowspan: 2, label: 'Group picture', description: 'Pergola', bgColor: getBgColor('other') },
    { rowspan: 2, label: 'Check-out', bgColor: getBgColor('other') },
    { rowspan: 20, label: '', bgColor: getBgColor() },
  ]
]