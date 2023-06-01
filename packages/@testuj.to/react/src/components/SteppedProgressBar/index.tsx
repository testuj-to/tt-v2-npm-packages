import { useEffect, useState } from "react";
import * as Progress from "@radix-ui/react-progress";

import "./styles.css";

export interface SteppedProgressBarProps {}

export const SteppedProgressBar = ({ ...props }: SteppedProgressBarProps) => {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (<></>
    // <Progress.Root className="ProgressRoot" value={progress}>
    //   {/* <Progress.Indicator
    //     className="ProgressIndicator"
    //     style={{ transform: `translateX(-${100 - progress}%)` }}
    //   /> */}
    // </Progress.Root>
  );
};
