import { z } from "zod";

const signUpFormSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPass: z.string(),
});

const signInFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

const schema = {
  signUpFormSchema,
  signInFormSchema,
};

export default schema;
