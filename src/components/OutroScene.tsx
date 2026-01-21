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

const UseCase = ({
  icon,
  title,
  description,
  delay,
  x,
  y,
}: {
  icon: string;
  title: string;
  description: string;
  delay: number;
  x: number;
  y: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12 },
  });

  const hover = Math.sin((frame - delay) * 0.1) * 5;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${appear}) translateY(${hover}px)`,
        textAlign: "center",
        width: 200,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          background: "linear-gradient(135deg, #f7931a, #ffaa00)",
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 40,
          margin: "0 auto",
          boxShadow: "0 8px 32px rgba(247, 147, 26, 0.3)",
        }}
      >
        {icon}
      </div>
      <div style={{ color: "white", fontSize: 18, marginTop: 12, fontWeight: 600 }}>
        {title}
      </div>
      <div style={{ color: "#888", fontSize: 13, marginTop: 4 }}>{description}</div>
    </div>
  );
};

const CatPhoto = ({
  x,
  y,
  delay,
  src,
  name,
}: {
  x: number;
  y: number;
  delay: number;
  src: string;
  name: string;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({
    frame: frame - delay,
    fps,
    config: { damping: 8 },
  });

  const jump = Math.abs(Math.sin((frame - delay) * 0.12)) * 10;
  const wobble = Math.sin((frame - delay) * 0.08) * 3;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${appear}) translateY(${-jump}px) rotate(${wobble}deg)`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: "50%",
          overflow: "hidden",
          border: "4px solid #4ade80",
          boxShadow: "0 0 20px rgba(74, 222, 128, 0.5)",
        }}
      >
        <Img
          src={staticFile(src)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
      <div
        style={{
          color: "#4ade80",
          fontSize: 16,
          fontWeight: 600,
          marginTop: 8,
        }}
      >
        {name}
      </div>
    </div>
  );
};

export const OutroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleAppear = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  const pulse = Math.sin(frame * 0.1) * 0.05 + 1;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        paddingTop: 50,
        overflow: "hidden",
      }}
    >
      {/* Celebration particles */}
      {[...Array(30)].map((_, i) => {
        const particleY = ((frame * (0.5 + i * 0.05) + i * 50) % 1300) - 100;
        const particleX = 50 + ((i * 37) % 980);
        const colors = ["#f7931a", "#4ade80", "#60a5fa", "#a78bfa", "#f472b6"];
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: particleX,
              top: particleY,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: colors[i % colors.length],
              opacity: 0.6,
            }}
          />
        );
      })}

      {/* Title */}
      <h2
        style={{
          fontSize: 44,
          color: "#4ade80",
          margin: 0,
          opacity: titleAppear,
          fontWeight: 700,
        }}
      >
        Purrfect for Cat Payments!
      </h2>

      {/* Use cases */}
      <div
        style={{
          position: "relative",
          width: 900,
          height: 250,
          marginTop: 20,
        }}
      >
        <UseCase
          icon="🐟"
          title="Fish Delivery"
          description="Instant payment for fresh catches"
          delay={30}
          x={50}
          y={30}
        />
        <UseCase
          icon="🌿"
          title="Catnip Subscriptions"
          description="Recurring micro-payments"
          delay={50}
          x={250}
          y={100}
        />
        <UseCase
          icon="🧶"
          title="Toy Marketplace"
          description="P2P cat toy trading"
          delay={70}
          x={450}
          y={30}
        />
        <UseCase
          icon="🏥"
          title="Vet Tips"
          description="Stream sats to helpful vets"
          delay={90}
          x={650}
          y={100}
        />
      </div>

      {/* Randy and Mr. Biggs celebrating */}
      <CatPhoto x={150} y={680} delay={110} src="cats/IMG_5458.jpg" name="Randy" />
      <CatPhoto x={790} y={660} delay={130} src="cats/IMG_0689.jpg" name="Mr. Biggs" />

      {/* Both cats together in the center */}
      <Sequence from={150} layout="none">
        <div
          style={{
            position: "absolute",
            left: 390,
            top: 720,
            transform: `scale(${spring({ frame: frame - 150, fps, config: { damping: 8 } })})`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 180,
              height: 180,
              borderRadius: 20,
              overflow: "hidden",
              border: "4px solid #ffaa00",
              boxShadow: "0 0 30px rgba(247, 147, 26, 0.5)",
            }}
          >
            <Img
              src={staticFile("cats/IMG_4106.jpg")}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
          <div style={{ color: "#ffaa00", fontSize: 14, marginTop: 8 }}>
            Best friends, instant payments
          </div>
        </div>
      </Sequence>

      {/* Final message */}
      <Sequence from={100} layout="none">
        <div
          style={{
            background: "rgba(0,0,0,0.5)",
            borderRadius: 20,
            padding: 24,
            marginTop: 10,
            textAlign: "center",
            opacity: spring({
              frame: frame - 100,
              fps,
              config: { damping: 200 },
            }),
          }}
        >
          <div style={{ color: "white", fontSize: 26, fontWeight: 600 }}>
            Self-custody • Instant • Near-zero fees
          </div>
          <div style={{ color: "#ffaa00", fontSize: 18, marginTop: 10 }}>
            Bitcoin payments, finally fast enough for Randy & Mr. Biggs
          </div>
        </div>
      </Sequence>

      {/* CTA */}
      <Sequence from={180} layout="none">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 20,
            opacity: spring({
              frame: frame - 180,
              fps,
              config: { damping: 200 },
            }),
          }}
        >
          <div
            style={{
              transform: `scale(${pulse})`,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                background: "linear-gradient(135deg, #f7931a 0%, #ffaa00 100%)",
                borderRadius: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(247, 147, 26, 0.5)",
              }}
            >
              <span style={{ fontSize: 40, color: "white" }}>⚡</span>
            </div>
          </div>
          <div style={{ color: "white", fontSize: 22, fontWeight: 700 }}>
            docs.spark.money
          </div>
          <div style={{ color: "#888", fontSize: 14, marginTop: 6 }}>
            @buildonspark/spark-sdk
          </div>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};
