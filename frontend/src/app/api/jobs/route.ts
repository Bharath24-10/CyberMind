import { NextRequest, NextResponse } from 'next/server';

let jobs: any[] = []; // In-memory store

export async function GET() {
  return NextResponse.json(jobs);
}

export async function POST(req: NextRequest) {
  const job = await req.json();
  jobs.push(job);
  return NextResponse.json(job, { status: 201 });
}