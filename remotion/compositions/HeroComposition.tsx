import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { noise2D } from "@remotion/noise";
import chroma from "chroma-js";

export interface HeroProps {
  title?: string;
  subtitle?: string;
}

const PALETTE = chroma
  .scale(["#0a0118", "#1a0b2e", "#3b1670", "#6d28d9", "#22d3ee"])
  .mode("oklch");

export const HeroComposition: React.FC<HeroProps> = ({
  title = "Solutions 2IA",
  subtitle = "Sites · Apps · IA · Automatisation",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width, height } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { stiffness: 80, damping: 12 },
  });
  const subtitleSpring = spring({
    frame: frame - 18,
    fps,
    config: { stiffness: 80, damping: 14 },
  });

  const titleY = interpolate(titleSpring, [0, 1], [60, 0]);
  const subtitleY = interpolate(subtitleSpring, [0, 1], [40, 0]);

  const bgShift = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: "clamp",
  });
  const bg = PALETTE(bgShift).hex();

  // Organic floating particles via noise
  const particles = Array.from({ length: 24 }, (_, i) => {
    const seed = i * 13.37;
    const x = (noise2D("p", seed, frame / 60) + 1) * 0.5 * width;
    const y = (noise2D("p", seed + 100, frame / 60) + 1) * 0.5 * height;
    const o = 0.3 + (noise2D("o", seed, frame / 120) + 1) * 0.35;
    return { x, y, o, key: i };
  });

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 40%, ${bg} 0%, #05010f 70%)`,
      }}
    >
      {particles.map(({ x, y, o, key }) => (
        <div
          key={key}
          style={{
            position: "absolute",
            left: x,
            top: y,
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "#22d3ee",
            opacity: o,
            filter: "blur(1px)",
            boxShadow: "0 0 24px #22d3ee",
          }}
        />
      ))}

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: 140,
            fontWeight: 800,
            letterSpacing: -4,
            transform: `translateY(${titleY}px)`,
            opacity: titleSpring,
            background:
              "linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #22d3ee 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            margin: 0,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 44,
            fontWeight: 400,
            color: "#c4b5fd",
            transform: `translateY(${subtitleY}px)`,
            opacity: subtitleSpring,
            marginTop: 24,
          }}
        >
          {subtitle}
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
