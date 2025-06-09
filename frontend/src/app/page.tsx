'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import JobGrid from '@/components/JobGrid';

type Job = {
  logo: string;
  role: string;
  posted: string;
  experience: string;
  type: string;
  salary: string;
  description?: string[];
};

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/jobs`);
        if (!res.ok) throw new Error('Failed to fetch jobs');
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }
    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <JobGrid jobs={jobs.length > 0 ? jobs : undefined} />
    </>
  );
}
