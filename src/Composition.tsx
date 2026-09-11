import { Composition } from "remotion";
import {
  ProductShowcase,
  getProductShowcaseDurationInFrames,
} from "./ProductShowcase";

const FPS = 30;
const WIDTH = 1080;
const HEIGHT = 1920; // formato vertical: Reels / TikTok / Stories

export const MyComposition = () => {
  return (
    <Composition
      id="ProductShowcase"
      component={ProductShowcase}
      durationInFrames={getProductShowcaseDurationInFrames(FPS)}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
