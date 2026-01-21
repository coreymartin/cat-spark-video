import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  AbsoluteFill,
} from "remotion";

const OperatorCat = ({
  x,
  y,
  label,
  delay,
  isActive,
  color,
}: {
  x: number;
  y: number;
  label: string;
  delay: number;
  isActive: boolean;
  color: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const glow = isActive ? 20 : 0;
  const bounce = isActive ? Math.sin(frame * 0.2) * 3 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${appear}) translateY(${bounce}px)`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 100,
          height: 100,
          background: `linear-gradient(135deg, ${color}, ${color}88)`,
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: isActive ? `0 0 ${glow}px ${color}` : "none",
          border: `3px solid ${isActive ? color : "transparent"}`,
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontFamily: "monospace",
            color: "white",
            lineHeight: 1.2,
          }}
        >
          <div>/\\_/\\</div>
          <div>({isActive ? "^.^" : "-.o"})</div>
        </div>
      </div>
      <div
        style={{
          color: isActive ? color : "#666",
          fontSize: 14,
          marginTop: 8,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
};

const SignaturePiece = ({
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

  const progress = interpolate(
    frame - delay,
    [0, 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  if (progress <= 0) return null;

  const currentX = fromX + (toX - fromX) * progress;
  const currentY = fromY + (toY - fromY) * progress;

  return (
    <div
      style={{
        position: "absolute",
        left: currentX,
        top: currentY,
        width: 16,
        height: 16,
        background: color,
        borderRadius: "50%",
        boxShadow: `0 0 15px ${color}`,
      }}
    />
  );
};

export const FrostScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // Determine which operators are signing (t of n threshold)
  const signingPhase = frame > 60;
  const combinedPhase = frame > 120;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a3e 0%, #2e1a3e 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        paddingTop: 50,
      }}
    >
      {/* Title */}
      <h2
        style={{
          fontSize: 44,
          color: "#a78bfa",
          margin: 0,
          opacity: titleAppear,
          fontWeight: 700,
        }}
      >
        FROST: Threshold Signatures
      </h2>

      <Sequence from={15} layout="none">
        <p
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.8)",
            margin: 0,
            marginTop: 12,
            textAlign: "center",
            maxWidth: 800,
            opacity: spring({
              frame: frame - 15,
              fps,
              config: { damping: 200 },
            }),
          }}
        >
          Multiple Spark Operators must agree - no single point of failure!
        </p>
      </Sequence>

      {/* Visualization container */}
      <div
        style={{
          position: "relative",
          width: 900,
          height: 480,
          marginTop: 30,
        }}
      >
        {/* Operator cats arranged in circle */}
        <OperatorCat x={400} y={40} label="Operator 1" delay={30} isActive={signingPhase} color="#f87171" />
        <OperatorCat x={600} y={150} label="Operator 2" delay={40} isActive={signingPhase} color="#4ade80" />
        <OperatorCat x={550} y={320} label="Operator 3" delay={50} isActive={signingPhase} color="#60a5fa" />
        <OperatorCat x={300} y={320} label="Operator 4" delay={60} isActive={false} color="#fbbf24" />
        <OperatorCat x={200} y={150} label="Operator 5" delay={70} isActive={false} color="#f472b6" />

        {/* Center combined signature */}
        <div
          style={{
            position: "absolute",
            left: 380,
            top: 180,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 100,
              height: 100,
              background: combinedPhase
                ? "linear-gradient(135deg, #a78bfa, #8b5cf6)"
                : "rgba(167, 139, 250, 0.2)",
              borderRadius: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 50,
              boxShadow: combinedPhase ? "0 0 40px rgba(167, 139, 250, 0.6)" : "none",
              transform: `scale(${combinedPhase ? 1.1 : 1})`,
              transition: "all 0.3s",
            }}
          >
            {combinedPhase ? "✓" : "🔏"}
          </div>
          <div style={{ color: "#a78bfa", fontSize: 14, marginTop: 8 }}>
            {combinedPhase ? "Valid Signature!" : "Combined Signature"}
          </div>
        </div>

        {/* Signature pieces flying to center */}
        {signingPhase && (
          <>
            <SignaturePiece fromX={450} fromY={90} toX={420} toY={220} delay={80} color="#f87171" />
            <SignaturePiece fromX={650} fromY={200} toX={480} toY={220} delay={90} color="#4ade80" />
            <SignaturePiece fromX={600} fromY={370} toX={450} toY={280} delay={100} color="#60a5fa" />
          </>
        )}

        {/* Threshold explanation */}
        <Sequence from={80} layout="none">
          <div
            style={{
              position: "absolute",
              right: 30,
              top: 30,
              background: "rgba(167, 139, 250, 0.1)",
              borderRadius: 12,
              padding: 16,
              border: "1px solid rgba(167, 139, 250, 0.3)",
              opacity: spring({
                frame: frame - 80,
                fps,
                config: { damping: 200 },
              }),
            }}
          >
            <div style={{ color: "#a78bfa", fontSize: 18, fontWeight: 600 }}>
              t-of-n Threshold
            </div>
            <div style={{ color: "#888", fontSize: 14, marginTop: 8 }}>
              3 of 5 operators needed
            </div>
            <div style={{ color: "#4ade80", fontSize: 14 }}>
              = Byzantine fault tolerant
            </div>
          </div>
        </Sequence>
      </div>

      {/* Bottom explanation */}
      <Sequence from={130} layout="none">
        <div
          style={{
            display: "flex",
            gap: 30,
            marginTop: 20,
            opacity: spring({
              frame: frame - 130,
              fps,
              config: { damping: 200 },
            }),
          }}
        >
          <div
            style={{
              background: "rgba(74, 222, 128, 0.1)",
              borderRadius: 12,
              padding: 16,
              textAlign: "center",
              border: "1px solid rgba(74, 222, 128, 0.3)",
            }}
          >
            <div style={{ color: "#4ade80", fontSize: 18, fontWeight: 600 }}>
              No Single Point of Failure
            </div>
            <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>
              If 1 operator goes down, others continue
            </div>
          </div>
          <div
            style={{
              background: "rgba(247, 147, 26, 0.1)",
              borderRadius: 12,
              padding: 16,
              textAlign: "center",
              border: "1px solid rgba(247, 147, 26, 0.3)",
            }}
          >
            <div style={{ color: "#f7931a", fontSize: 18, fontWeight: 600 }}>
              Schnorr Signatures
            </div>
            <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>
              Efficient, aggregatable, secure
            </div>
          </div>
        </div>
      </Sequence>

      {/* Cat quote */}
      <Sequence from={150} layout="none">
        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: 50,
            background: "rgba(0,0,0,0.4)",
            borderRadius: 12,
            padding: 16,
            opacity: spring({
              frame: frame - 150,
              fps,
              config: { damping: 200 },
            }),
          }}
        >
          <p style={{ color: "white", fontSize: 18, margin: 0, fontStyle: "italic" }}>
            "We cats always land on our feet - just like distributed systems!"
          </p>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
