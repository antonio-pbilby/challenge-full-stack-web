'use client'
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface Patients {
  id: string;
  name: string;
  birthDate: Date;
  gender: string;
  healthInsuranceId: string;
}

export default function PatientsPage() {
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 15
  });

  const { data: patients, isLoading, isFetched } = useQuery<Patients[]>({
    queryFn: async () => {
      const patients = await api.get('/patients', {
        params: {
          page: pagination.page,
          pageSize: pagination.pageSize
        }
      });

      return patients.data;
    },
    queryKey: ['patients', pagination.page, pagination.pageSize]
  });

  return (
    <>
      <div className="flex justify-between">
        <h1>Listagem de pacientes</h1>
        <Button.Primary>Novo paciente</Button.Primary>
      </div>
      <Input.Field placeholder="Digite sua busca..." className="border-2 p-2" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Name
            </TableHead>
            <TableHead>
              Birth Date
            </TableHead>
            <TableHead>
              Gender
            </TableHead>
            <TableHead>
              Health Insurance ID
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <>
            <Skeleton className="h-11" />
          </>}
          {isFetched && patients?.length && patients.map(({ birthDate, gender, healthInsuranceId, id, name }) => {
            return (<TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{birthDate.toISOString()}</TableCell>
              <TableCell>{gender}</TableCell>
              <TableCell>{healthInsuranceId}</TableCell>
            </TableRow>)
          })}
          {isFetched && !patients?.length && <TableRow>
            <TableCell colSpan={4}>No patients found</TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </>
  )
}