import * as  React from "react";
import { BackgroundLines } from "../components/ui/background-lines";
import HeroHighlightDemo from  './HeroHi'

export function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 -z-10">
      <HeroHighlightDemo/>
    </BackgroundLines>
  );
}

export default BackgroundLinesDemo;
