import { Controller, Post, Body, Get } from '@nestjs/common';
import { Job } from './dto/job.dto';

@Controller('jobs')
export class JobsController {
  private jobs: Job[] = []; // 👈 Type is now defined!

  @Get()
  getAllJobs() {
    return this.jobs;
  }

  @Post()
  createJob(@Body() jobData: Job) {
    this.jobs.push(jobData);
    return {
      message: 'Job created successfully',
      job: jobData,
    };
  }
}
