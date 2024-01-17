import { SoundPlayer } from 'tetris-core/dist';
import { Sound } from './sound';

export class SoundManager implements SoundPlayer{

  private readonly effectFolder = '/assets/effects';
  private readonly musicFolder = '/assets/music';

  // EFFECTS
  private readonly trackRotate = `${this.effectFolder}/se_game_rotate.wav`;
  private readonly trackLine = `${this.effectFolder}/se_game_single.wav`;
  private readonly trackLevelCompleted = `${this.musicFolder}/10 - You Did It (Complete) - Tetris (Atari) (Arcade) - Soundtrack - Arcade.mp3`;
  private readonly trackFreeze = `${this.effectFolder}/se_game_hold.wav`;
  private readonly trackGameOver = `${this.musicFolder}/11 - Game Over - Tetris (Atari) (Arcade) - Soundtrack - Arcade.mp3`;

  // MUSIC
  private readonly trackLoginska = `${this.musicFolder}/02 - Loginska - Tetris (Atari) (Arcade) - Soundtrack - Arcade.mp3`;
  private readonly trackBradinsky = `${this.musicFolder}/04 - Bradinsky - Tetris (Atari) (Arcade) - Soundtrack - Arcade.mp3`;
  private readonly trackKalinka = `${this.musicFolder}/06 - Kalinka - Tetris (Atari) (Arcade) - Soundtrack - Arcade.mp3`;
  private readonly trackTroika = `${this.musicFolder}/08 - Troika - Tetris (Atari) (Arcade) - Soundtrack - Arcade.mp3`;

  private musicLevelTrackList: Array<string> = [
    this.trackLoginska,
    this.trackBradinsky,
    this.trackKalinka,
    this.trackTroika,
    this.trackLoginska,
    this.trackBradinsky,
    this.trackKalinka,
    this.trackTroika,
  ];

  private musicBackground: Sound;

  private isMuted = false;

  mute(): void {
    this.isMuted = true;

    if (this.musicBackground) {
      this.musicBackground.mute();
    }
  }

  unMute(): void {
    this.isMuted = false;
    if (this.musicBackground) {
      this.musicBackground.unMute();
    }
  }

  playGameOver(): void {
    this.playSound(this.trackGameOver);
  }

  playFreeze(): void {
    this.playSound(this.trackFreeze);
  }

  playRotate(): void {
    this.playSound(this.trackRotate);
  }

  playLineCompleted(): void {
    this.playSound(this.trackLine);
  }

  playLevelComplete(): void {
    this.playSound(this.trackLevelCompleted);
  }

  playMusicBackground(level: number): void {
    let trackIndex = level;

    if (level >= this.musicLevelTrackList.length) {
      trackIndex = 0;
    }

    const src = this.musicLevelTrackList[trackIndex];

    this.playMusic(src);
  }

  stopMusicBackground(): void {
    this.musicBackground.stop();
  }

  private playSound(src: string): Sound {
    const sound = new Sound(src);

    if (this.isMuted){
      sound.mute();
    }

    sound.play();

    return sound;
  }

  private playMusic(src: string): void {
    if (this.musicBackground){
      this.musicBackground.stop();
    }

    this.musicBackground = this.playSound(src);
    this.musicBackground.activateLoop();
  }
}
