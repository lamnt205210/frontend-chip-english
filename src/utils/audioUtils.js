// audioUtils.js
import { Howl } from "howler";

export function openAudio(audioURL) {
  const audio = new Howl({
    src: [audioURL],
    html5: true,
  });
  audio.play();
}
