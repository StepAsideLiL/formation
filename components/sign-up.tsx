/* eslint-disable react/no-children-prop */
"use client";

import { useForm } from "@tanstack/react-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import signUp from "@/lib/actions/sign-up";
import schema from "@/lib/schema";

export default function SignUp() {
  return (
    <section className="space-y-5">
      <h1 className="text-3xl">Sign Up In Formation</h1>

      <div className="min-w-96 border p-5">
        <Form />
      </div>

      <p>
        Have an account?{" "}
        <Link href={"/auth/sign-in"} className="underline">
          Sign In
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
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPass: "",
    },
    validators: {
      onChange: schema.signUpFormSchema,
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      const { error, data } = await signUp(value);
      console.log(error, data);
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
        name="username"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Username</Label>
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

      <form.Field
        name="confirmPass"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Confirm Password</Label>
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

      <form.Subscribe children={() => <Button type="submit">Sign Up</Button>} />
    </form>
  );
}
