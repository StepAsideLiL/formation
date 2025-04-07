import Image from "next/image";
import Link from "next/link";

export default function Logo({ fill = "black" }: { fill?: "black" | "white" }) {
  return (
    <Link href={"/"}>
      {fill === "black" ? (
        <Image src={"/logo/logo-bfill.png"} alt="Logo" width={28} height={28} />
      ) : (
        <Image src={"/logo/logo-wfill.png"} alt="Logo" width={28} height={28} />
      )}
    </Link>
  );
}
