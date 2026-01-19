export interface TreatConfig {
  key: string;
  name: string;
  category: 'safe' | 'unsafe';
  points: number;
  livesChange: number;
  color: number;
  weight: number;
}

export const TreatTypes: TreatConfig[] = [
  // Safe treats
  {
    key: 'chicken',
    name: 'Chicken',
    category: 'safe',
    points: 10,
    livesChange: 0,
    color: 0xFFD700, // Gold
    weight: 30
  },
  {
    key: 'broccoli',
    name: 'Broccoli',
    category: 'safe',
    points: 15,
    livesChange: 0,
    color: 0x228B22, // Forest Green
    weight: 20
  },
  {
    key: 'carrot',
    name: 'Carrot',
    category: 'safe',
    points: 10,
    livesChange: 0,
    color: 0xFF8C00, // Dark Orange
    weight: 25
  },
  {
    key: 'peanutButter',
    name: 'Peanut Butter',
    category: 'safe',
    points: 20,
    livesChange: 0,
    color: 0xD2691E, // Chocolate Brown
    weight: 15
  },

  // Unsafe treats
  {
    key: 'chocolate',
    name: 'Chocolate',
    category: 'unsafe',
    points: 0,
    livesChange: -1,
    color: 0x3D1C02, // Dark Brown
    weight: 5
  },
  {
    key: 'iceCream',
    name: 'Ice Cream',
    category: 'unsafe',
    points: -10,
    livesChange: 0,
    color: 0xFFF0F5, // Lavender Blush (Pink)
    weight: 8
  },
  {
    key: 'cherries',
    name: 'Cherries',
    category: 'unsafe',
    points: 0,
    livesChange: -1,
    color: 0xDC143C, // Crimson
    weight: 4
  }
];

export const SafeTreats = TreatTypes.filter(t => t.category === 'safe');
export const UnsafeTreats = TreatTypes.filter(t => t.category === 'unsafe');
