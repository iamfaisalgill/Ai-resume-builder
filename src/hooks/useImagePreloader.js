// hooks/useImagePreloader.js
import { useEffect, useState } from "react";

const useImagePreloader = (images) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const preload = async () => {
      try {
        await Promise.all(
          images.map(
            (img) =>
              new Promise((resolve, reject) => {
                const image = new Image();
                image.src = img.src;
                image.onload = resolve;
                image.onerror = reject;
              })
          )
        );
        setLoaded(true);
      } catch (err) {
        console.error("Image preload error:", err);
      }
    };

    preload();
  }, [images]);

  return loaded;
};

export default useImagePreloader;
