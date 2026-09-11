import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ACCENT_COLOR,
  BACKGROUND_MUSIC,
  BUSINESS_NAME,
  CALL_TO_ACTION,
  DARK_COLOR,
  INSTAGRAM_HANDLE,
  PRODUCTS,
  SECONDS_PER_SLIDE,
} from "./config";

const OUTRO_SECONDS = 3;

const FADE_FRAMES = 15;

const ProductSlide: React.FC<{
  image: string;
  title: string;
  subtitle?: string;
  durationInFrames: number;
}> = ({ image, title, subtitle, durationInFrames }) => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, durationInFrames], [1, 1.15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(
    frame,
    [0, FADE_FRAMES, durationInFrames - FADE_FRAMES, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const textSpring = spring({
    frame: frame - FADE_FRAMES,
    fps: 30,
    config: { damping: 200 },
  });

  const textTranslate = interpolate(textSpring, [0, 1], [40, 0]);

  return (
    <AbsoluteFill style={{ opacity }}>
      <AbsoluteFill>
        <Img
          src={staticFile(`products/${image}`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
          }}
        />
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0) 35%)",
        }}
      />
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-start",
          padding: "0 70px 220px 70px",
        }}
      >
        <div
          style={{
            opacity: textSpring,
            transform: `translateY(${textTranslate}px)`,
          }}
        >
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 64,
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              textShadow: "0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 40,
                color: ACCENT_COLOR,
                marginTop: 12,
                textShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
            >
              {subtitle}
            </div>
          ) : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ProgressDots: React.FC<{
  total: number;
  slideDuration: number;
}> = ({ total, slideDuration }) => {
  const frame = useCurrentFrame();
  const current = Math.min(total - 1, Math.floor(frame / slideDuration));

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 70,
      }}
    >
      <div style={{ display: "flex", gap: 10 }}>
        {new Array(total).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === current ? 34 : 10,
              height: 10,
              borderRadius: 6,
              background: i === current ? ACCENT_COLOR : "rgba(255,255,255,0.5)",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

const BrandWatermark: React.FC = () => (
  <AbsoluteFill
    style={{
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: 120,
    }}
  >
    <div
      style={{
        fontFamily: "Georgia, serif",
        fontSize: 34,
        fontWeight: 700,
        color: "white",
        letterSpacing: 2,
        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
      }}
    >
      {BUSINESS_NAME.toUpperCase()}
    </div>
  </AbsoluteFill>
);

const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, FADE_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(
    spring({ frame, fps: 30, config: { damping: 200 } }),
    [0, 1],
    [0.9, 1],
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: DARK_COLOR,
        justifyContent: "center",
        alignItems: "center",
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            marginBottom: 24,
          }}
        >
          {BUSINESS_NAME}
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 38,
            color: ACCENT_COLOR,
            marginBottom: 18,
          }}
        >
          {CALL_TO_ACTION}
        </div>
        {INSTAGRAM_HANDLE ? (
          <div
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 32,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {INSTAGRAM_HANDLE}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};

export const ProductShowcase: React.FC = () => {
  const { fps } = useVideoConfig();
  const slideDuration = SECONDS_PER_SLIDE * fps;

  return (
    <AbsoluteFill style={{ backgroundColor: DARK_COLOR }}>
      {BACKGROUND_MUSIC ? (
        <Audio src={staticFile(BACKGROUND_MUSIC)} volume={0.5} />
      ) : null}

      {PRODUCTS.map((product, i) => (
        <Sequence
          key={product.image + i}
          from={i * slideDuration}
          durationInFrames={slideDuration}
        >
          <ProductSlide
            image={product.image}
            title={product.title}
            subtitle={product.subtitle}
            durationInFrames={slideDuration}
          />
        </Sequence>
      ))}

      <Sequence durationInFrames={PRODUCTS.length * slideDuration}>
        <ProgressDots total={PRODUCTS.length} slideDuration={slideDuration} />
        <BrandWatermark />
      </Sequence>

      <Sequence
        from={PRODUCTS.length * slideDuration}
        durationInFrames={OUTRO_SECONDS * fps}
      >
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};

export const getProductShowcaseDurationInFrames = (fps: number) =>
  PRODUCTS.length * SECONDS_PER_SLIDE * fps + OUTRO_SECONDS * fps;
