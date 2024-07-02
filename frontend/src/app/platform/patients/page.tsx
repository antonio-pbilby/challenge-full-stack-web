'use client'
import { Input } from "@/components/Input";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/utils/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";
import { Trash } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { AxiosError } from "axios";
import { useDebounce } from 'use-debounce'
import { formatDate } from "@/utils/format-date";

interface Patients {
  _id: string;
  name: string;
  birthDate: string;
  gender: string;
  healthInsuranceId: string;
}

interface PatientsResponse {
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
  };
  data: Patients[];
}

export default function PatientsPage() {
  const queryClient = useQueryClient();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5
  });
  const [nameFilter, setNameFilter] = useState('');
  const [nameDebounced] = useDebounce(nameFilter, 300);

  const { data: patientsResponse, isLoading, isFetched } = useQuery<PatientsResponse>({
    queryFn: async () => {
      const patients = await api.get('/patients', {
        params: {
          page: pagination.page,
          pageSize: pagination.pageSize,
          name: nameDebounced
        }
      });

      return patients.data;
    },
    queryKey: ['patients', pagination.page, pagination.pageSize, nameDebounced]
  });

  const totalPages = isFetched && patientsResponse?.pagination && Math.ceil(patientsResponse?.pagination.totalItems / pagination.pageSize);

  const { mutate: deletePatient } = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/patients/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['patients']
      });
      alert('Deleted patient successfully');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return alert(`Failed to delete patient. ${error.response?.data.message}`);
      }
      return alert(`Failed to delete patient`);
    }
  });

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-2xl text-lime-700 mb-4">Patients</h1>
        <Link href="/platform/patients/create" className="bg-lime-700 text-white p-2 rounded-md hover:brightness-110">New Patient</Link>
      </div>
      <Input.Field placeholder="Digite sua busca..." className="border-2 p-2" value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />

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
            <TableHead>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <TableRow>
            <TableCell>
              <Skeleton className="h-11" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-11" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-11" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-11" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-11" />
            </TableCell>
          </TableRow>}
          {isFetched && !!patientsResponse?.data?.length && patientsResponse?.data.map(({ birthDate, gender, healthInsuranceId, _id: id, name }) => {
            return (<TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{formatDate(birthDate)}</TableCell>
              <TableCell>{gender}</TableCell>
              <TableCell>{healthInsuranceId}</TableCell>
              <TableCell>
                <Button onClick={() => deletePatient(id)} size="icon" variant={"outline"}>
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>)
          })}
          {isFetched && !patientsResponse?.data?.length && <TableRow>
            <TableCell colSpan={4}>No patients found</TableCell>
          </TableRow>}
        </TableBody>
      </Table>

      {isLoading && <Skeleton className="h-11" />}
      {isFetched && !!totalPages &&
        <div className="flex justify-center gap-1">
          <Button
            variant={"ghost"}
            disabled={pagination.page === 1}
            onClick={() => setPagination((value) => ({ ...value, page: value.page - 1 }))}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, idx) => idx + 1)
            .map((page) => {
              return (
                <Button
                  key={`page-${page}`}
                  variant={page === pagination.page ? "default" : "ghost"}
                  disabled={page === pagination.page}
                  onClick={() => setPagination((value) => ({ ...value, page }))}
                >
                  {page}
                </Button>
              )
            })}
          <Button
            variant={"ghost"}
            disabled={pagination.page === totalPages}
            onClick={() => setPagination((value) => ({ ...value, page: value.page + 1 }))}
          >
            Next
          </Button>
        </div >
      }
    </>
  )
}