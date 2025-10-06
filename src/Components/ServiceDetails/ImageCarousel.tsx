"use client";
import { useState } from "react";

export default function ImageCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-2">
      <img src={images[current]} className="w-full h-96 object-cover rounded" />
      <div className="flex justify-center gap-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full cursor-pointer ${i === current ? "bg-blue-600" : "bg-gray-300"}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
