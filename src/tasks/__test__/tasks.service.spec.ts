import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from '../tasks-enum';
import { TasksRepository } from '../tasks.repository';
import { TasksService } from '../tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'iqbal',
  id: 'testID',
  password: 'test',
  tasks: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository;

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

  describe('getTaskById', () => {
    it('calls TaksRepository.findOne and returns', async () => {
      const mockTask = {
        title: 'test',
        description: 'test',
        id: 'testID',
        status: TaskStatus.OPEN,
      };

      await tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTasksById('testID', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls taskRepository.findone and handles error', async () => {
      await tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTasksById('testID', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
