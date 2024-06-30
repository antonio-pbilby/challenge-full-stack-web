'use client'
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character",
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ['confirmPassword']
});

type RegisterInputs = z.infer<typeof registerSchema>;

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      confirmPassword: '',
      email: '',
      name: '',
      password: ''
    }
  });

  const { mutate: createAccount } = useMutation({
    mutationFn: async (data: RegisterInputs) => {
      await axios.post('http://localhost:3000/user', data);
    },
    onSuccess: () => {
      alert('Registrado com sucesso')
    },
    onError: () => {
      alert('Erro ao registrar')
    }
  });

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    createAccount(data);
  }

  return (<main className="flex justify-center align-middle h-screen w-screen">
    <div className="flex flex-col justify-center">
      <form
        className="flex flex-col w-96 bg-slate-200 p-4 h-auto rounded-md space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold text-lime-700">Create your account</h1>
        <Input.Wrapper>
          <Input.Label htmlFor="name">Name</Input.Label>
          <Input.Field {...register("name")} placeholder="John Doe" />
          {errors.name && <Input.Error>{errors.name.message}</Input.Error>}
        </Input.Wrapper>
        <Input.Wrapper>
          <Input.Label htmlFor="email">Email</Input.Label>
          <Input.Field {...register("email")} placeholder="john.doe@email.com" />
          {errors.email && <Input.Error>{errors.email.message}</Input.Error>}
        </Input.Wrapper>
        <Input.Wrapper>
          <Input.Label htmlFor="password">Password</Input.Label>
          <Input.Field type="password" {...register("password")} placeholder="••••••••" />
          {errors.password && <Input.Error>{errors.password.message}</Input.Error>}
        </Input.Wrapper>
        <Input.Wrapper>
          <Input.Label htmlFor="confirmPassword">Confirm Password</Input.Label>
          <Input.Field type="password" {...register("confirmPassword")} placeholder="••••••••" />
          {errors.confirmPassword && <Input.Error>{errors.confirmPassword.message}</Input.Error>}
        </Input.Wrapper>

        <Button.Primary type="submit">Register</Button.Primary>
      </form>
      <span>Already have an account? <Link href={"/login"} className="underline text-lime-700">Login</Link></span>

    </div>
  </main>)
}