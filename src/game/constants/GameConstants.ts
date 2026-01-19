export const GameConstants = {
  // Canvas dimensions
  GAME_WIDTH: 720,
  GAME_HEIGHT: 720,

  // Player settings
  PLAYER_SPEED: 400,
  PLAYER_Y_OFFSET: 60,
  PLAYER_WIDTH: 60,
  PLAYER_HEIGHT: 50,

  // Lives
  STARTING_LIVES: 3,
  MAX_LIVES: 3,

  // Difficulty progression
  LEVEL_DURATION: 15000, // 15 seconds per level
  MAX_LEVEL: 10,

  // Fall speed (pixels per second)
  BASE_FALL_SPEED: 100,
  MAX_FALL_SPEED: 400,

  // Spawn interval (milliseconds)
  BASE_SPAWN_INTERVAL: 1500,
  MIN_SPAWN_INTERVAL: 400,

  // Unsafe treat ratio
  BASE_UNSAFE_RATIO: 0.15,
  MAX_UNSAFE_RATIO: 0.45,

  // Treat dimensions
  TREAT_SIZE: 32,

  // UI
  SCORE_FONT_SIZE: 24,
  UI_PADDING: 16,

  // Animation durations
  POPUP_DURATION: 800,
  SHAKE_DURATION: 100,
  TINT_DURATION: 150
} as const;
