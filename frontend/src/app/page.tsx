"use client";
import Navbar from '@/components/Navbar';
import JobGrid from '@/components/JobGrid';
import { useEffect, useState } from 'react';
import { defaultJobs, Job } from '@/components/JobGrid';
import { Select } from '@mantine/core';

import '@mantine/core/styles.css';

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/jobs');
        if (!res.ok) throw new Error(`Failed to fetch jobs: ${res.status}`);
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    }

    fetchJobs();
    const interval = setInterval(fetchJobs, 10000);
    return () => clearInterval(interval);
  }, []);

  // Combine static and backend jobs (static first, then backend)
  const allJobs = [...defaultJobs, ...jobs];

  return (
    <>
      <Navbar onAddJob={(job) => setJobs((prev) => [...prev, job])} />
      <JobGrid jobs={allJobs} />
    </>
  );
}