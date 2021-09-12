import { Test } from '@nestjs/testing';
import { TasksRepository } from '../tasks.repository';
import { TasksService } from '../tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  username: 'iqbal',
  id: 'test',
  password: 'test',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: TasksRepository;

  beforeEach(async () => {
    //initialize  a NestJs module
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get(TasksService);
    tasksRepository = module.get(TasksRepository);
  });

  describe('GetTasks', () => {
    it('calls TaksRepository.getTasks and returns', () => {
      tasksService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
    });
  });
});
