import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Img,
  staticFile,
  AbsoluteFill,
} from "remotion";

const Key = ({
  x,
  y,
  label,
  color,
  delay,
  tweakProgress,
}: {
  x: number;
  y: number;
  label: string;
  color: string;
  delay: number;
  tweakProgress?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const glow = tweakProgress ? interpolate(tweakProgress, [0, 1], [0, 30]) : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${appear})`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 70,
          height: 70,
          background: `linear-gradient(135deg, ${color}, ${color}88)`,
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          boxShadow: `0 0 ${glow}px ${color}`,
        }}
      >
        🔑
      </div>
      <div style={{ color: "white", fontSize: 13, marginTop: 6 }}>{label}</div>
    </div>
  );
};

const CatOwner = ({
  x,
  y,
  name,
  src,
  delay,
  isActive,
}: {
  x: number;
  y: number;
  name: string;
  src: string;
  delay: number;
  isActive: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const bounce = isActive ? Math.sin(frame * 0.15) * 5 : 0;
  const glowSize = isActive ? 20 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        opacity: appear,
        transform: `translateY(${bounce}px)`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          overflow: "hidden",
          border: `4px solid ${isActive ? "#4ade80" : "#666"}`,
          boxShadow: isActive ? `0 0 ${glowSize}px #4ade80` : "none",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: isActive ? "none" : "grayscale(50%)",
          }}
        />
      </div>
      <div
        style={{
          color: isActive ? "#4ade80" : "#888",
          fontSize: 16,
          marginTop: 6,
          fontWeight: isActive ? 700 : 400,
        }}
      >
        {name}
      </div>
      {isActive && (
        <div style={{ color: "#4ade80", fontSize: 11 }}>
          {name === "Randy" ? "Sending..." : "Received!"}
        </div>
      )}
    </div>
  );
};

const Arrow = ({
  fromX,
  fromY,
  toX,
  toY,
  delay,
  color,
}: {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  delay: number;
  color: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
  const angle = Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI);

  return (
    <div
      style={{
        position: "absolute",
        left: fromX,
        top: fromY,
        width: length * progress,
        height: 4,
        background: color,
        transformOrigin: "left center",
        transform: `rotate(${angle}deg)`,
        borderRadius: 2,
      }}
    />
  );
};

export const KeyTweakScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Extended timing for better pacing (scene is now 300 frames / 10 seconds)
  const transferHappens = frame > 160;
  const tweakProgress = interpolate(frame, [130, 180], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a2e1a 0%, #1a1a2e 100%)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: 42,
            color: "#4ade80",
            margin: 0,
            opacity: titleAppear,
            fontWeight: 700,
          }}
        >
          The Spark Solution: Key Tweaking
        </h2>

        <Sequence from={15} layout="none">
          <p
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.8)",
              margin: "16px auto 0",
              textAlign: "center",
              maxWidth: 750,
              opacity: spring({
                frame: frame - 15,
                fps,
                config: { damping: 200 },
              }),
            }}
          >
            Instead of moving Bitcoin on-chain, Spark just changes who owns the key!
          </p>
        </Sequence>
      </div>

      {/* Randy (sender) - left side */}
      <CatOwner
        x={120}
        y={280}
        name="Randy"
        src="cats/IMG_6792.jpg"
        delay={30}
        isActive={!transferHappens}
      />

      {/* Mr. Biggs (receiver) - right side */}
      <CatOwner
        x={850}
        y={280}
        name="Mr. Biggs"
        src="cats/IMG_1644.jpeg"
        delay={40}
        isActive={transferHappens}
      />

      {/* Combined key in center */}
      <Sequence from={60} layout="none">
        <div
          style={{
            position: "absolute",
            left: 480,
            top: 260,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 110,
              height: 110,
              background: "linear-gradient(135deg, #f7931a, #ffaa00)",
              borderRadius: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 55,
              boxShadow: `0 0 ${40 + tweakProgress * 30}px rgba(247, 147, 26, 0.6)`,
              transform: `scale(${spring({ frame: frame - 60, fps, config: { damping: 12 } })})`,
            }}
          >
            🔐
          </div>
          <div
            style={{ color: "#f7931a", fontSize: 16, marginTop: 10, fontWeight: 600 }}
          >
            Combined Key
          </div>
          <div style={{ color: "#888", fontSize: 12, marginTop: 2 }}>
            (Bitcoin UTXO)
          </div>
        </div>
      </Sequence>

      {/* User key - moves from Randy to Mr. Biggs */}
      <Sequence from={80} layout="none">
        <Key
          x={transferHappens ? 875 : 145}
          y={440}
          label="User Key"
          color="#4ade80"
          delay={80}
          tweakProgress={tweakProgress}
        />
      </Sequence>

      {/* Spark Entity key - centered */}
      <Sequence from={95} layout="none">
        <Key x={505} y={440} label="Spark Key" color="#60a5fa" delay={95} />
      </Sequence>

      {/* Transfer arrow */}
      <Sequence from={130} layout="none">
        <Arrow
          fromX={250}
          fromY={475}
          toX={830}
          toY={475}
          delay={130}
          color="#4ade80"
        />
      </Sequence>

      {/* Speech bubble from Randy */}
      <Sequence from={45} durationInFrames={100} layout="none">
        <div
          style={{
            position: "absolute",
            left: 220,
            top: 220,
            background: "rgba(255,255,255,0.95)",
            borderRadius: 12,
            padding: 12,
            maxWidth: 170,
            opacity: spring({
              frame: frame - 45,
              fps,
              config: { damping: 200 },
            }),
          }}
        >
          <p style={{ color: "#333", fontSize: 13, margin: 0 }}>
            "Sending Mr. Biggs some sats for catnip!"
          </p>
        </div>
      </Sequence>

      {/* Speech bubble from Mr. Biggs */}
      <Sequence from={180} layout="none">
        <div
          style={{
            position: "absolute",
            left: 680,
            top: 220,
            background: "rgba(255,255,255,0.95)",
            borderRadius: 12,
            padding: 12,
            maxWidth: 160,
            opacity: spring({
              frame: frame - 180,
              fps,
              config: { damping: 200 },
            }),
          }}
        >
          <p style={{ color: "#333", fontSize: 13, margin: 0 }}>
            "Received instantly! Very dignified."
          </p>
        </div>
      </Sequence>

      {/* Explanation boxes at bottom */}
      <Sequence from={220} layout="none">
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 30,
            opacity: spring({
              frame: frame - 220,
              fps,
              config: { damping: 200 },
            }),
          }}
        >
          <div
            style={{
              background: "rgba(74, 222, 128, 0.15)",
              borderRadius: 12,
              padding: "14px 20px",
              border: "1px solid rgba(74, 222, 128, 0.3)",
            }}
          >
            <div style={{ color: "#4ade80", fontSize: 16, fontWeight: 600 }}>
              Instant
            </div>
            <div style={{ color: "#888", fontSize: 12 }}>No blockchain wait</div>
          </div>
          <div
            style={{
              background: "rgba(96, 165, 250, 0.15)",
              borderRadius: 12,
              padding: "14px 20px",
              border: "1px solid rgba(96, 165, 250, 0.3)",
            }}
          >
            <div style={{ color: "#60a5fa", fontSize: 16, fontWeight: 600 }}>
              Near-Zero Cost
            </div>
            <div style={{ color: "#888", fontSize: 12 }}>Just math!</div>
          </div>
          <div
            style={{
              background: "rgba(247, 147, 26, 0.15)",
              borderRadius: 12,
              padding: "14px 20px",
              border: "1px solid rgba(247, 147, 26, 0.3)",
            }}
          >
            <div style={{ color: "#f7931a", fontSize: 16, fontWeight: 600 }}>
              Self-Custody
            </div>
            <div style={{ color: "#888", fontSize: 12 }}>Cats control their keys</div>
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
