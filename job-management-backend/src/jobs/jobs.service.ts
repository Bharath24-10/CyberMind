import { Injectable } from '@nestjs/common';
import { Job } from './dto/job.dto'; // ✅ Make sure the path is correct

@Injectable()
export class JobsService {
  private jobs: Job[] = [];

  create(job: Job): Job {
    this.jobs.push(job);
    return job;
  }

  findAll(): Job[] {
    return this.jobs;
  }
}
