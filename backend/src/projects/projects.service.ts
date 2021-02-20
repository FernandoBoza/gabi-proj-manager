import { Injectable } from '@nestjs/common';
import { CreateProjectInput } from './dto/create-project.input';
import { UpdateProjectInput } from './dto/update-project.input';

@Injectable()
export class ProjectsService {
  async create(createProjectInput: CreateProjectInput) {
    try {
      return 'This action adds a new project';
    } catch (err) {
      console.error(err);
    }
  }

  async findAll() {
    try {
      return `This action returns all projects`;
    } catch (err) {
      console.error(err);
    }
  }

  async findOne(id: number) {
    try {
      return `This action returns a #${id} project`;
    } catch (err) {
      console.error(err);
    }
  }

  async update(id: number, updateProjectInput: UpdateProjectInput) {
    try {
      return `This action updates a #${id} project`;
    } catch (err) {
      console.error(err);
    }
  }

  async remove(id: number) {
    try {
      return `This action removes a #${id} project`;
    } catch (err) {
      console.error(err);
    }
  }
}
