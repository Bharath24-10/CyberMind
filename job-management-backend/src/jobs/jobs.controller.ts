import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { Job } from './dto/job.dto';

@Controller('jobs')
export class JobsController {
  private jobs: Job[] = [];
  private idCounter = 1;

  @Get()
  getAllJobs() {
    return this.jobs;
  }

  @Get(':id')
  getJobById(@Param('id') id: string) {
    const job = this.jobs.find(j => j['id'] === Number(id));
    if (!job) {
      return { message: 'Job not found' };
    }
    return job;
  }

  @Post()
  createJob(@Body() jobData: Job) {
    const jobWithId = { ...jobData, id: this.idCounter++ };
    this.jobs.push(jobWithId);
    return {
      message: 'Job created successfully',
      job: jobWithId,
    };
  }
}