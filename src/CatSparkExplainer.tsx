import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Audio, Sequence, staticFile, interpolate, useCurrentFrame } from "remotion";
import { TitleScene } from "./components/TitleScene";
import { ProblemScene } from "./components/ProblemScene";
import { KeyTweakScene } from "./components/KeyTweakScene";
import { FrostScene } from "./components/FrostScene";
import { OutroScene } from "./components/OutroScene";

const BackgroundMusic = () => {
  const frame = useCurrentFrame();

  // Fade in at start, fade out at end
  const volume = interpolate(
    frame,
    [0, 60, 1100, 1200],
    [0, 0.35, 0.35, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <Audio
      src={staticFile("sounds/background-music.mp3")}
      volume={volume}
      startFrom={0}
    />
  );
};

export const CatSparkExplainer = () => {
  // Extended scene durations in frames (30fps) for better readability
  const TITLE_DURATION = 210; // 7 seconds
  const PROBLEM_DURATION = 270; // 9 seconds
  const KEY_TWEAK_DURATION = 300; // 10 seconds
  const FROST_DURATION = 270; // 9 seconds
  const OUTRO_DURATION = 270; // 9 seconds

  const TRANSITION_DURATION = 25; // Slightly longer transitions

  return (
    <>
      {/* Background music - fades in and out */}
      <BackgroundMusic />

      <TransitionSeries>
        {/* Scene 1: Title */}
        <TransitionSeries.Sequence durationInFrames={TITLE_DURATION}>
          <TitleScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: The Problem */}
        <TransitionSeries.Sequence durationInFrames={PROBLEM_DURATION}>
          <ProblemScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 3: Key Tweaking Solution */}
        <TransitionSeries.Sequence durationInFrames={KEY_TWEAK_DURATION}>
          <KeyTweakScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4: FROST Threshold Signatures */}
        <TransitionSeries.Sequence durationInFrames={FROST_DURATION}>
          <FrostScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 5: Outro with Use Cases */}
        <TransitionSeries.Sequence durationInFrames={OUTRO_DURATION}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
