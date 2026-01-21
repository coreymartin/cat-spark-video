import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  AbsoluteFill,
} from "remotion";

const SadCat = ({ delay }: { delay: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  // Sad bobbing
  const bob = Math.sin((frame - delay) * 0.08) * 3;

  return (
    <div
      style={{
        opacity: appear,
        transform: `translateY(${bob}px)`,
        fontSize: 24,
        fontFamily: "monospace",
        color: "#888",
        textAlign: "center",
        lineHeight: 1.2,
      }}
    >
      <div>/\\_/\\</div>
      <div>( T.T )</div>
      <div>&gt; ~ &lt;</div>
    </div>
  );
};

const WaitingDots = () => {
  const frame = useCurrentFrame();
  const dotCount = Math.floor((frame / 15) % 4);
  return <span>{".".repeat(dotCount)}</span>;
};

const SlowTransaction = ({ delay }: { delay: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const progress = interpolate(
    frame - delay,
    [0, 150],
    [0, 30],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div
      style={{
        opacity: appear,
        background: "rgba(255,255,255,0.1)",
        borderRadius: 16,
        padding: 24,
        width: 400,
        marginTop: 20,
      }}
    >
      <div style={{ color: "#ff6b6b", fontSize: 18, marginBottom: 12 }}>
        Bitcoin L1 Transaction
      </div>
      <div
        style={{
          background: "rgba(0,0,0,0.3)",
          borderRadius: 8,
          height: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "linear-gradient(90deg, #ff6b6b, #ff8e8e)",
            height: "100%",
            width: `${progress}%`,
            transition: "width 0.1s",
          }}
        />
      </div>
      <div style={{ color: "#888", fontSize: 14, marginTop: 8 }}>
        Waiting for confirmations<WaitingDots />
      </div>
      <div style={{ color: "#ff6b6b", fontSize: 14, marginTop: 4 }}>
        ~10-60 minutes
      </div>
    </div>
  );
};

export const ProblemScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #2d1b1b 0%, #1a1a2e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 80,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: 48,
          color: "#ff6b6b",
          margin: 0,
          opacity: titleAppear,
          fontWeight: 700,
        }}
      >
        The Problem
      </h2>

      <Sequence from={30} layout="none">
        <p
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.8)",
            margin: 0,
            marginTop: 20,
            textAlign: "center",
            maxWidth: 700,
            opacity: spring({
              frame: frame - 30,
              fps,
              config: { damping: 200 },
            }),
          }}
        >
          Bitcoin L1 is slow and expensive for small payments
        </p>
      </Sequence>

      {/* Sad cats waiting */}
      <Sequence from={60} layout="none">
        <div
          style={{
            display: "flex",
            gap: 60,
            marginTop: 40,
          }}
        >
          <SadCat delay={60} />
          <SadCat delay={75} />
          <SadCat delay={90} />
        </div>
      </Sequence>

      {/* Slow transaction visualization */}
      <Sequence from={80} layout="none">
        <SlowTransaction delay={80} />
      </Sequence>

      {/* Cost callout */}
      <Sequence from={140} layout="none">
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 40,
            opacity: spring({
              frame: frame - 140,
              fps,
              config: { damping: 200 },
            }),
          }}
        >
          <div
            style={{
              background: "rgba(255,107,107,0.2)",
              borderRadius: 12,
              padding: 20,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 36, color: "#ff6b6b" }}>$2-50+</div>
            <div style={{ fontSize: 14, color: "#888" }}>per transaction</div>
          </div>
          <div
            style={{
              background: "rgba(255,107,107,0.2)",
              borderRadius: 12,
              padding: 20,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 36, color: "#ff6b6b" }}>~7 TPS</div>
            <div style={{ fontSize: 14, color: "#888" }}>max throughput</div>
          </div>
        </div>
      </Sequence>

      {/* Cat quote */}
      <Sequence from={200} layout="none">
        <div
          style={{
            position: "absolute",
            bottom: 100,
            background: "rgba(0,0,0,0.5)",
            borderRadius: 16,
            padding: 20,
            maxWidth: 500,
            opacity: spring({
              frame: frame - 200,
              fps,
              config: { damping: 200 },
            }),
          }}
        >
          <p style={{ color: "white", fontSize: 22, margin: 0, fontStyle: "italic" }}>
            "I can't wait 10 minutes for my catnip delivery!"
          </p>
          <p style={{ color: "#ffaa00", fontSize: 16, margin: 0, marginTop: 8 }}>
            - Every cat, probably
          </p>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
