import { Composition } from "remotion";
import { CatSparkExplainer } from "./CatSparkExplainer";

export const RemotionRoot = () => {
  return (
    <Composition
      id="CatSparkExplainer"
      component={CatSparkExplainer}
      durationInFrames={1220} // ~40 seconds at 30fps (1320 - 100 for transitions)
      fps={30}
      width={1080}
      height={1080}
      defaultProps={{}}
    />
  );
};
