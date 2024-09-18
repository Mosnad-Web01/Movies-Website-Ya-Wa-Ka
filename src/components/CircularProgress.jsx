// components/CircularProgress.js

import React from "react";
import { CircularProgress } from "@nextui-org/react";

export default function Circularprogress({progress}) {
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <CircularProgress
      aria-label="Loading..."
      size="lg"
      value={progress} 
      color="warning"
      showValueLabel={true}
      className="absolute top-[2px] left-[2px] z-20 bg-white rounded-full" // Ensure it's above other content
    />
  );
}
