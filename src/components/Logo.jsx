import Image from "next/image";

export default function Logo({ className = "", src = "/logo.png" }) {
  return (
    <a href="#top" className={`inline-block group ${className}`}>
      <Image
        src={src}
        alt="TrillioTek"
        width={200}
        height={48}
        className="h-8 w-auto transition-opacity duration-300 group-hover:opacity-90 sm:h-9"
        priority
      />
    </a>
  );
}
