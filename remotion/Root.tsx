import { Composition } from "remotion";
import { HeroComposition } from "./compositions/HeroComposition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Hero"
        component={HeroComposition}
        durationInFrames={180}
        fps={60}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Solutions 2IA",
          subtitle: "Sites · Apps · IA · Automatisation",
        }}
      />
    </>
  );
};
