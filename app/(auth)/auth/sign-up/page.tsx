import SignUp from "@/components/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create a new account",
  description: "Create a new account in Formation.",
};

export default function Page() {
  return <SignUp />;
}
