import { useCallback, useEffect, useRef, useState } from "react";

/* Nhạc phóng sự bi thương (Web Audio) */
const prog = [
  [57, 60, 64, 69],
  [53, 57, 60, 65],
  [48, 55, 60, 64],
  [55, 59, 62, 67],
]; // Am F C G
const pattern = [0, 1, 2, 3, 2, 1, 2, 1];
const melody = [76, 74, 72, 74, 72, 69, 72, 71, 72, 67, 64, 67, 71, 74, 72, 71]; // trên mỗi phách đôi
const EIGHTH = 0.42;
const frequency = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

export function useSadMusic() {
  const [playing, setPlaying] = useState(false);
  const audio = useRef<{ ctx: AudioContext; master: GainNode } | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(
    () => () => {
      clearInterval(timer.current);
      void audio.current?.ctx.close();
      audio.current = null;
    },
    [],
  );

  const start = useCallback(() => {
    if (!audio.current) {
      const ctx = new AudioContext();
      const master = ctx.createGain();
      master.gain.value = 0.7;
      const lowpass = ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.value = 2200;
      const delay = ctx.createDelay();
      delay.delayTime.value = 0.33;
      const feedback = ctx.createGain();
      feedback.gain.value = 0.35;
      master.connect(lowpass);
      lowpass.connect(ctx.destination);
      lowpass.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(ctx.destination);
      audio.current = { ctx, master };
    }
    const { ctx, master } = audio.current;

    const note = (
      midi: number,
      time: number,
      duration: number,
      volume: number,
      type: OscillatorType,
    ) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.value = frequency(midi);
      gain.gain.setValueAtTime(0.0001, time);
      gain.gain.exponentialRampToValueAtTime(volume, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
      osc.connect(gain);
      gain.connect(master);
      osc.start(time);
      osc.stop(time + duration + 0.05);
    };

    void ctx.resume();
    let nextTime = ctx.currentTime + 0.1;
    let step = 0;
    timer.current = window.setInterval(() => {
      while (nextTime < ctx.currentTime + 0.25) {
        const chord = prog[Math.floor(step / 8) % 4];
        const beat = step % 8;
        note(chord[pattern[beat]], nextTime, 1.6, 0.09, "triangle");
        if (beat === 0) note(chord[0] - 12, nextTime, EIGHTH * 8, 0.12, "sine");
        if (beat % 2 === 0) {
          note(melody[Math.floor(step / 2) % melody.length], nextTime, 1.2, 0.05, "sine");
        }
        nextTime += EIGHTH;
        step++;
      }
    }, 60);
  }, []);

  /** Trả về true nếu đang phát sau khi bấm; ném lỗi nếu trình duyệt không hỗ trợ. */
  const toggle = useCallback(() => {
    if (playing) {
      clearInterval(timer.current);
      void audio.current?.ctx.suspend();
      setPlaying(false);
      return false;
    }
    start();
    setPlaying(true);
    return true;
  }, [playing, start]);

  return { playing, toggle };
}
