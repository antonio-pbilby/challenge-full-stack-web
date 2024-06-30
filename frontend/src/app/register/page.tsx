'use client'
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
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

  const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
    console.log(data);
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
    </div>
  </main>)
}