
import { useEffect, useState } from "react";

interface DynamicBackgroundProps {
  albumCover: string;
  isActive: boolean;
}

export default function DynamicBackground({ albumCover, isActive }: DynamicBackgroundProps) {
  const [gradientColors, setGradientColors] = useState<string[]>(["#9b87f5", "#7E69AB"]);

  useEffect(() => {
    if (!albumCover || !isActive) return;
    
    // Create image element to analyze
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = albumCover;
    
    img.onload = () => {
      // Create canvas to extract colors
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Set canvas size
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image to canvas
      ctx.drawImage(img, 0, 0);
      
      // Sample colors from different areas of the image
      const topLeft = ctx.getImageData(0, 0, 1, 1).data;
      const topRight = ctx.getImageData(img.width - 1, 0, 1, 1).data;
      const bottomLeft = ctx.getImageData(0, img.height - 1, 1, 1).data;
      const bottomRight = ctx.getImageData(img.width - 1, img.height - 1, 1, 1).data;
      const center = ctx.getImageData(Math.floor(img.width / 2), Math.floor(img.height / 2), 1, 1).data;
      
      // Convert RGB to hex
      const rgbToHex = (r: number, g: number, b: number) => 
        '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
      
      // Extract primary and secondary colors
      const colors = [
        rgbToHex(center[0], center[1], center[2]),
        rgbToHex(topLeft[0], topLeft[1], topLeft[2]),
        rgbToHex(topRight[0], topRight[1], topRight[2]),
        rgbToHex(bottomLeft[0], bottomLeft[1], bottomLeft[2]),
        rgbToHex(bottomRight[0], bottomRight[1], bottomRight[2]),
      ];
      
      // Use the most vibrant colors
      setGradientColors([colors[0], colors[1]]);
    };
  }, [albumCover, isActive]);
  
  return (
    <div 
      className="absolute inset-0 -z-10 opacity-60 transition-all duration-1000 ease-in-out"
      style={{
        background: `linear-gradient(135deg, ${gradientColors[0]} 0%, ${gradientColors[1]} 100%)`,
      }}
    />
  );
}
