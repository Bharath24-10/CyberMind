import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobTitle: string;

  @Column()
  companyName: string;

  @Column()
  location: string;

  @Column()
  jobType: string;

  @Column()
  salaryRange: string;

  @Column('text')
  jobDescription: string;

  @Column('text', { nullable: true })
  requirements: string;

  @Column('text', { nullable: true })
  responsibilities: string;

  @Column()
  applicationDeadline: string; // or Date if you want date type
}
