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

const CatPhoto = ({
  x,
  y,
  delay,
  src,
  name,
  size = 200,
}: {
  x: number;
  y: number;
  delay: number;
  src: string;
  name: string;
  size?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bounce = spring({
    frame: frame - delay,
    fps,
    config: { damping: 8 },
  });

  const scale = interpolate(bounce, [0, 1], [0, 1]);
  const wobble = Math.sin((frame - delay) * 0.1) * 3;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${scale}) rotate(${wobble}deg)`,
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          overflow: "hidden",
          border: "4px solid #ffaa00",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
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
          color: "#ffaa00",
          fontSize: 18,
          fontWeight: 600,
          marginTop: 8,
          textShadow: "0 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        {name}
      </div>
    </div>
  );
};

export const TitleScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [-100, 200]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  const subtitleSpring = spring({
    frame: frame - 15,
    fps,
    config: { damping: 200 },
  });

  const subtitleOpacity = interpolate(subtitleSpring, [0, 1], [0, 1]);

  const pulse = Math.sin(frame * 0.15) * 0.1 + 1;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Animated background particles */}
      {[...Array(20)].map((_, i) => {
        const particleY = ((frame * (1 + i * 0.1) + i * 100) % 1200) - 100;
        const particleX = 100 + ((i * 50) % 880);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: particleX,
              top: particleY,
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: `rgba(255, 170, 0, ${0.3 + (i % 3) * 0.2})`,
            }}
          />
        );
      })}

      {/* Randy - the goofy orange one */}
      <CatPhoto
        x={120}
        y={680}
        delay={20}
        src="cats/IMG_6792.jpg"
        name="Randy"
        size={180}
      />

      {/* Mr. Biggs - the wise brown tabby */}
      <CatPhoto
        x={780}
        y={660}
        delay={30}
        src="cats/IMG_1644.jpeg"
        name="Mr. Biggs"
        size={180}
      />

      {/* Spark Logo */}
      <div
        style={{
          transform: `scale(${pulse})`,
          marginBottom: 30,
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            background: "linear-gradient(135deg, #f7931a 0%, #ffaa00 100%)",
            borderRadius: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 60px rgba(247, 147, 26, 0.5)",
          }}
        >
          <span style={{ fontSize: 70, color: "white" }}>⚡</span>
        </div>
      </div>

      {/* Title */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: 800,
          color: "white",
          margin: 0,
          opacity: titleOpacity,
          transform: `translateY(${titleY - 200}px)`,
          textShadow: "0 4px 20px rgba(0,0,0,0.5)",
        }}
      >
        Spark Protocol
      </h1>

      {/* Subtitle */}
      <Sequence from={15} layout="none">
        <p
          style={{
            fontSize: 36,
            color: "#ffaa00",
            margin: 0,
            marginTop: 20,
            opacity: subtitleOpacity,
            fontWeight: 600,
          }}
        >
          Explained by Randy & Mr. Biggs
        </p>
      </Sequence>

      {/* Tagline */}
      <Sequence from={45} layout="none">
        <p
          style={{
            fontSize: 24,
            color: "rgba(255,255,255,0.7)",
            margin: 0,
            marginTop: 40,
            opacity: interpolate(
              spring({ frame: frame - 45, fps, config: { damping: 200 } }),
              [0, 1],
              [0, 1]
            ),
          }}
        >
          Making Bitcoin payments purrfect
        </p>
      </Sequence>
    </AbsoluteFill>
  );
};
