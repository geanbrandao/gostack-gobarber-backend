import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

// Rota: Receeber requisição, chamar outro arquivo, devolver uma resposta

// Lista todos os appointments
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

// cria um appointment
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parseddate = parseISO(date); // transformacao de dado
    // const appointmentDate = startOfHour(parseddate); // regra de negocio

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parseddate,
      provider_id,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: `${err.message}` });
  }
});

export default appointmentsRouter;
