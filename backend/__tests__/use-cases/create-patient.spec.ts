import 'reflect-metadata'
import { it, describe, vi, expect } from 'vitest';
import { PatientService } from '../../src/application/services/patient.service';
import { FakePatientRepository } from '../fake-repositories/patient.fake-repository';
import { Patient } from '../../src/domain/patients/entity';
import { CreatePatientDTO } from '../../src/interfaces/http/validation/create-patient.schema';
import { AppException } from '../../src/application/exceptions/app.exception';

describe('Create Patient', () => {
  let patientRepository = new FakePatientRepository();
  let patientService = new PatientService(patientRepository);

  it('should not allow to create a patient with the same email', async () => {
    const spy = vi.spyOn(patientRepository, 'find');
    spy.mockResolvedValue({} as Patient);
    await expect(() => patientService.create({} as CreatePatientDTO, '')).rejects.toThrowError(new AppException(400, 'A patient already exists with this email'));
  });

  it('should not allow to create a patient with the same document', async () => {
    const spy = vi.spyOn(patientRepository, 'find');
    spy.mockResolvedValueOnce(undefined).mockResolvedValueOnce({} as Patient);
    await expect(() => patientService.create({} as CreatePatientDTO, '')).rejects.toThrowError(new AppException(400, 'A patient already exists with this document'));
  });

  it('should not allow to create a patient with the same health insurance id', async () => {
    const spy = vi.spyOn(patientRepository, 'find');
    spy.mockResolvedValueOnce(undefined).mockResolvedValueOnce(undefined).mockResolvedValueOnce({} as Patient);
    await expect(() => patientService.create({} as CreatePatientDTO, '')).rejects.toThrowError(new AppException(400, 'A patient already exists with this health insurance id'));
  });
})