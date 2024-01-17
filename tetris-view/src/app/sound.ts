export class Sound {
  private audio: HTMLAudioElement;

  constructor(src: string) {

    this.createAudioElement(src);

    document.body.appendChild(this.audio);
  }

  private createAudioElement(src: string): void {
    this.audio = document.createElement('audio');
    this.audio.src = src;
    this.audio.preload = 'auto';
    this.audio.controls = false;
    this.audio.style.display = 'none';
    this.audio.volume = 0.2;
  }

  play(): void {
    const promise = this.audio.play();

    if (promise !== undefined) {
      promise.then(_ => {
        // Autoplay started!
      }).catch(error => {
      console.log(`🚀 ~ file: sound.ts ~ line 27 ~ Sound ~ play ~ error`, error)
        // Autoplay was prevented.
        // Show a "Play" button so that user can start playback.
      });
    }
  }

  stop(): void {
    this.audio.pause();
  }

  mute(): void {
    this.audio.muted = true;
  }

  unMute(): void {
    this.audio.muted = false;
  }

  activateLoop(): void {
    this.audio.loop = true;
  }
}
