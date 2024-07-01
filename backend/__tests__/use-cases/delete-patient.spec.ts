import 'reflect-metadata'
import { it, describe, vi, expect } from 'vitest';
import { PatientService } from '../../src/application/services/patient.service';
import { FakePatientRepository } from '../fake-repositories/patient.fake-repository';
import { AppException } from '../../src/application/exceptions/app.exception';

describe('Delete Patient', () => {
  let patientRepository = new FakePatientRepository();
  let patientService = new PatientService(patientRepository);

  it('should throw an error if patient does not exist', async () => {
    const spy = vi.spyOn(patientRepository, 'findById');
    spy.mockResolvedValueOnce(undefined);

    await expect(() => patientService.delete('id', 'user')).rejects.toThrowError(new AppException(400, "Patient does not exist"))
  })
})