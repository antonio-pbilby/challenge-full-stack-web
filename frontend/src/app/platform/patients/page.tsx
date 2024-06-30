import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export default function PatientsPage() {
  return (
    <>
      <div className="flex justify-between">
        <h1>Listagem de pacientes</h1>
        <Button.Primary>Novo paciente</Button.Primary>
      </div>
      <Input.Field placeholder="Digite sua busca..." className="border-2 p-2" />
    </>
  )
}