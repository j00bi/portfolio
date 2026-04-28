import { Composition } from "remotion";
import { AssetShowcase } from "./AssetShowcase";
import { BlankHeading } from "./BlankHeading";
import { FlashcardSingleComp } from "./minimal-kit/FlashcardSingleComp";
import { FlashcardsStackComp } from "./minimal-kit/FlashcardsStackComp";
import { HandsFrameComp } from "./minimal-kit/HandsFrameComp";
import { HandsHoldComp } from "./minimal-kit/HandsHoldComp";
import { MinimalStageComp } from "./minimal-kit/MinimalStageComp";
import { MinimalStarterKitShowcase } from "./minimal-kit/MinimalStarterKitShowcase";
import { PhoneAngleComp } from "./minimal-kit/PhoneAngleComp";
import { PhoneFrontComp } from "./minimal-kit/PhoneFrontComp";
import { compositionSize } from "./minimal-kit/shared";
import { WarpHorizontalComp } from "./minimal-kit/WarpHorizontalComp";
import { WarpVerticalComp } from "./minimal-kit/WarpVerticalComp";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MinimalStageComp"
        component={MinimalStageComp}
        durationInFrames={90}
        fps={compositionSize.fps}
        width={compositionSize.width}
        height={compositionSize.height}
      />
      <Composition
        id="PhoneFrontComp"
        component={PhoneFrontComp}
        durationInFrames={90}
        fps={compositionSize.fps}
        width={compositionSize.width}
        height={compositionSize.height}
      />
      <Composition
        id="PhoneAngleComp"
        component={PhoneAngleComp}
        durationInFrames={90}
        fps={compositionSize.fps}
        width={compositionSize.width}
        height={compositionSize.height}
      />
      <Composition
        id="HandsFrameComp"
        component={HandsFrameComp}
        durationInFrames={120}
        fps={compositionSize.fps}
        width={compositionSize.width}
        height={compositionSize.height}
      />
      <Composition
        id="HandsHoldComp"
        component={HandsHoldComp}
        durationInFrames={120}
        fps={compositionSize.fps}
        width={compositionSize.width}
        height={compositionSize.height}
      />
      <Composition
        id="FlashcardsStackComp"
        component={FlashcardsStackComp}
        durationInFrames={90}
        fps={compositionSize.fps}
        width={compositionSize.width}
        height={compositionSize.height}
      />
      <Composition
        id="FlashcardSingleComp"
        component={FlashcardSingleComp}
        durationInFrames={90}
        fps={compositionSize.fps}
        width={compositionSize.width}
        height={compositionSize.height}
      />
      <Composition
        id="WarpHorizontalComp"
        component={WarpHorizontalComp}
        durationInFrames={75}
        fps={compositionSize.fps}
        width={compositionSize.width}
        height={compositionSize.height}
      />
      <Composition
        id="WarpVerticalComp"
        component={WarpVerticalComp}
        durationInFrames={75}
        fps={compositionSize.fps}
        width={compositionSize.width}
        height={compositionSize.height}
      />
      <Composition
        id="MinimalStarterKitShowcase"
        component={MinimalStarterKitShowcase}
        durationInFrames={216}
        fps={compositionSize.fps}
        width={compositionSize.width}
        height={compositionSize.height}
      />
      <Composition
        id="AssetShowcase"
        component={AssetShowcase}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="BlankHeading"
        component={BlankHeading}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
