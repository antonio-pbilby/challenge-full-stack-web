'use client'
import { Input } from "@/components/Input";
import { Button } from "@/components/ui/button";
import { api } from "@/utils/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod"

const createPatientSchema = z.object({
  name: z.string().min(1),
  birthDate: z.string().date().optional(),
  gender: z.enum(["MALE", "FEMALE", "OTHERS"]).optional(),
  healthInsuranceId: z.string().min(1),
  document: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
});

type CreatePatient = z.infer<typeof createPatientSchema>;

export default function CreatePatient() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CreatePatient>({
    resolver: zodResolver(createPatientSchema),
    defaultValues: {
      birthDate: '2000-02-10',
      gender: "MALE",
      name: '',
      healthInsuranceId: ''
    }
  });

  const { mutate: createPatient } = useMutation({
    mutationFn: async (data: CreatePatient) => {
      await api.post('/patient', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      alert('Created patient successfully');
      router.push('/platform/patients');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        console.log(error.response?.data.errors);
        return alert(`Failed to create patient. ${error.response?.data.message}`)
      }
      return alert('Failed to create patient');
    }
  });

  const onSubmit: SubmitHandler<CreatePatient> = (data) => {
    createPatient(data);
  }

  return (<>
    <h1 className="text-2xl text-lime-700 mb-4">Create new patient</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-2 gap-2 mb-2">
        <Input.Wrapper>
          <Input.Label htmlFor="name">Name</Input.Label>
          <Input.Field {...register("name")} placeholder="John Doe" />
          {errors.name && <Input.Error>{errors.name.message}</Input.Error>}
        </Input.Wrapper>
        <Input.Wrapper>
          <Input.Label htmlFor="birthDate">Birth Date</Input.Label>
          <Input.Field {...register("birthDate")} placeholder="John Doe" />
          {errors.birthDate && <Input.Error>{errors.birthDate.message}</Input.Error>}
        </Input.Wrapper>
        <Input.Wrapper>
          <Input.Label htmlFor="gender">Gender</Input.Label>
          <Input.Field {...register("gender")} placeholder="John Doe" />
          {errors.gender && <Input.Error>{errors.gender.message}</Input.Error>}
        </Input.Wrapper>
        <Input.Wrapper>
          <Input.Label htmlFor="healthInsuranceId">Health Insurance ID</Input.Label>
          <Input.Field {...register("healthInsuranceId")} placeholder="John Doe" />
          {errors.healthInsuranceId && <Input.Error>{errors.healthInsuranceId.message}</Input.Error>}
        </Input.Wrapper>
        <Input.Wrapper>
          <Input.Label htmlFor="phone">Phone</Input.Label>
          <Input.Field {...register("phone")} placeholder="1234 1234" />
          {errors.phone && <Input.Error>{errors.phone.message}</Input.Error>}
        </Input.Wrapper>
        <Input.Wrapper>
          <Input.Label htmlFor="email">Email</Input.Label>
          <Input.Field {...register("email")} placeholder="john@doe.com" />
          {errors.email && <Input.Error>{errors.email.message}</Input.Error>}
        </Input.Wrapper>
        <Input.Wrapper>
          <Input.Label htmlFor="document">Document</Input.Label>
          <Input.Field {...register("document")} placeholder="123.123.123-12" />
          {errors.document && <Input.Error>{errors.document.message}</Input.Error>}
        </Input.Wrapper>
      </div>
      <div className="flex justify-end gap-2">
        <Button variant={"secondary"} asChild><Link href="/platform/patients">Cancel</Link></Button>
        <Button type="submit" disabled={isSubmitting}>Create</Button>
      </div>
    </form>
  </>)
}