import SignIn from "@/components/SignIn";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In to Formation",
  description: "Sign in to your Formation account",
};

export default function Page() {
  return <SignIn />;
}
