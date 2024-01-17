export interface SoundPlayer {
  playGameOver(): void;
	mute(): void;
  unMute(): void
	playFreeze(): void;
	playLineCompleted(): void;
	playRotate(): void;
	playLevelComplete(): void;
	stopMusicBackground(): void;
  playMusicBackground(level: number): void;
}