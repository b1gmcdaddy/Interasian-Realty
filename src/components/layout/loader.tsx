// src/components/ui/loading-overlay.tsx
import Image from "next/image";

export default function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/40">
      <Image
        src="/logo.png"
        alt={"Inter Asian Realty Services Inc."}
        width={80}
        height={80}
        className="animate-spin mb-4"
        priority
      />
      <span className="text-white text-lg font-semibold tracking-wide">
        Loading...
      </span>
    </div>
  );
}
