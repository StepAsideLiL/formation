/* eslint-disable react/no-children-prop */

"use client";

import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import schema from "@/lib/schema";
import signIn from "@/lib/actions/sign-in";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Icons from "@/lib/icons";
import { toast } from "sonner";

export default function SignIn() {
  return (
    <section className="space-y-5">
      <h1 className="text-3xl">Sign In to Formation</h1>

      <div className="min-w-96 border p-5">
        <Form />
      </div>

      <p>
        Don&apos;t an account?{" "}
        <Link href={"/auth/sign-up"} className="underline">
          Sign Up
        </Link>
      </p>
      <p>
        <Link href={"/"} className="underline">
          Go Back To Home Page
        </Link>
      </p>
    </section>
  );
}

function Form() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onChange: schema.signInFormSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);

      const { error, data } = await signIn(value);

      if (error) {
        toast.error(error.message);
        setLoading(false);
      }

      if (data) {
        router.push("/auth/sign-in");
      }
    },
  });

  return (
    <form
      className="space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="email"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Email</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          </div>
        )}
      />

      <form.Field
        name="password"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Password</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          </div>
        )}
      />

      <form.Subscribe
        children={() => (
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                <Icons.Loading
                  className="-ms-1 animate-spin"
                  size={16}
                  aria-hidden="true"
                />
                Signing In
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        )}
      />
    </form>
  );
}
