'use client'
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginInputs = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const router = useRouter();

  const { mutate: login } = useMutation({
    mutationFn: async (data: LoginInputs) => {
      await axios.post('http://localhost:3000/login', data);
    },
    onSuccess: () => {
      router.push('/');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return alert(`Failed to login. ${error.response?.data.message}`)
      }
      return alert('Failed to login');
    }
  })

  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    login(data);
  }

  return (<main className="flex justify-center align-middle h-screen w-screen">
    <div className="flex flex-col justify-center">
      <form
        className="flex flex-col w-96 bg-slate-200 p-4 h-auto rounded-md space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold text-lime-700">Login</h1>
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

        <Button.Primary type="submit">Login</Button.Primary>
      </form>
      <span>Don&apos;t have an account? <Link href={"/register"} className="underline text-lime-700">Register</Link></span>

    </div>
  </main>)
}