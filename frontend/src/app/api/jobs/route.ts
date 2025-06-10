import { NextRequest, NextResponse } from 'next/server';

type Job = {
  logo: string;
  role: string;
  posted: string;
  experience: string;
  type: string;
  salary: string;
  description: string[];
};

const jobs: Job[] = []; // Use const and a specific type

export async function GET() {
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const job = await req.json();
  jobs.push(job);
  return NextResponse.json(job, { status: 201 });
}