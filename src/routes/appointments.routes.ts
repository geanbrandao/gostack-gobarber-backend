import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// authentica
appointmentsRouter.use(ensureAuthenticated);

// Rota: Receeber requisição, chamar outro arquivo, devolver uma resposta

// Lista todos os appointments
appointmentsRouter.get('/', async (request, response) => {
  console.log(request.user);

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

// cria um appointment
appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parseddate = parseISO(date); // transformacao de dado
  // const appointmentDate = startOfHour(parseddate); // regra de negocio

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.execute({
    date: parseddate,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
