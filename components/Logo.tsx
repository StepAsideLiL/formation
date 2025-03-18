import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image src={"/logo/logo-bfill.png"} alt="Logo" width={28} height={28} />
    </Link>
  );
}
