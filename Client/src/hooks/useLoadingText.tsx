import { useEffect, useState } from "react";

export const useLoadingText = () => {
  const [loadingText, setLoadingText] = useState<string>(".");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((oldText) => {
        if (oldText?.length === 3) {
          return ".";
        } else {
          return oldText + ".";
        }
      });
    }, 400);

    return () => clearInterval(interval);
  });

  return loadingText;
};
