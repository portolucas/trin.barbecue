import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex justify-center w-full border-t border-gray-200 bg-white py-5 text-center">
      <Link href="/" className="flex items-center font-display text-2xl">
        <Image
          src="/logo.png"
          alt="Trin.bbq logo"
          width="30"
          height="30"
          className="mr-2 rounded-sm"
        />
      </Link>
    </div>
  );
}
