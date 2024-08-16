import "./ImagePlaceholder.css"
import { useState } from "react";

export default function ImagePlaceholder({src, placeholder, alt, ...rest }: {src: string; placeholder: string; alt:string; [key: string]: any}){

    const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{maxWidth:"15%"}}>
      {/* Placeholder image */}
      {!isLoaded && (
        <img
          src={placeholder}
          alt="placeholder"
          {...rest}
          style={{objectFit: "fill"}}
        />
      )}

      {/* Target image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        {...rest}
        style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease-in-out', objectFit: "cover" }}
      />
    </div>
  );
};

