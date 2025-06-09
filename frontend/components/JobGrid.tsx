'use client';

import { Box, Button, Card, Flex, Grid, Image, Text } from '@mantine/core';
import { IconUser, IconMapPin, IconBriefcase } from '@tabler/icons-react';
import React from 'react';

type Job = {
  logo: string;
  role: string;
  posted: string;
  experience: string;
  type: string;
  salary: string;
  description?: string[];
};

const defaultJobs: Job[] = [
  {
    logo: '/amazon.jpg',
    role: 'Full Stack Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
    description: [
      'A user-friendly interface lets you browse stunning photos and videos',
      'Filter destinations based on interests and travel style, and create personalized',
    ],
  },
  {
    logo: '/tesla-logo-tesla-icon-transparent-png-free-vector.jpg',
    role: 'Node JS Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
    description: [
      'Work with cutting-edge Node.js technologies',
      'Collaborate with frontend developers to create seamless user experiences',
    ],
  },
  {
    logo: '/swiggyi.jpg',
    role: 'UI/UX Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
    description: [
      'Design intuitive user interfaces',
      'Work closely with product and development teams',
    ],
  },
  {
    logo: '/amazon.jpg',
    role: 'Full Stack Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
    description: [
      'Develop scalable backend services',
      'Implement RESTful APIs and database integration',
    ],
  },
  {
    logo: '/tesla-logo-tesla-icon-transparent-png-free-vector.jpg',
    role: 'Node JS Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
    description: [
      'Optimize performance and scalability',
      'Write clean, maintainable code',
    ],
  },
  {
    logo: '/swiggyi.jpg',
    role: 'UI/UX Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
    description: [
      'Conduct user research and testing',
      'Create wireframes and prototypes',
    ],
  },
  {
    logo: '/amazon.jpg',
    role: 'Full Stack Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
    description: [
      'Manage cloud infrastructure',
      'Ensure application security',
    ],
  },
  {
    logo: '/tesla-logo-tesla-icon-transparent-png-free-vector.jpg',
    role: 'Node JS Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
    description: [
      'Implement microservices architecture',
      'Collaborate with cross-functional teams',
    ],
  },
];

export default function JobGrid({ jobs = defaultJobs }: { jobs?: Job[] }) {
  const [appliedJobs, setAppliedJobs] = React.useState<Set<number>>(new Set());

  const handleApplyClick = (index: number) => {
    setAppliedJobs((prev) => new Set(prev).add(index));
  };

  return (
    <Box p="lg" bg="#f9f9f9">
      <Grid gutter="lg">
        {jobs.map((job, index) => (
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }} key={index}>
            <Card shadow="sm" padding="md" radius="md" withBorder bg="white">
              <Flex justify="space-between" align="center">
                <Box w={60} h={60} style={{ overflow: 'hidden', borderRadius: '50%' }}>
                  <Image
                    src={job.logo}
                    alt={`${job.role} logo`}
                    width="100%"
                    height="100%"
                    fit="contain"
                  />
                </Box>

                <Button
                  variant="light"
                  size="xs"
                  radius="l"
                  styles={{
                    root: { backgroundColor: '#B0D9FF' },
                    label: { color: 'black' },
                  }}
                >
                  {job.posted}
                </Button>
              </Flex>

              <Text fw={600} mt="sm" size="md">
                {job.role}
              </Text>

              <Flex mt="xs" gap="md" wrap="wrap">
                <Flex gap={4} align="center">
                  <IconUser size={14} />
                  <Text size="xs">{job.experience}</Text>
                </Flex>
                <Flex gap={4} align="center">
                  <IconMapPin size={14} />
                  <Text size="xs">{job.type}</Text>
                </Flex>
                <Flex gap={4} align="center">
                  <IconBriefcase size={14} />
                  <Text size="xs">{job.salary}</Text>
                </Flex>
              </Flex>

              <Box mt="xs" ml="xs">
                <ul style={{ paddingLeft: 16, marginBottom: 10 }}>
                  {job.description?.map((desc, i) => (
                    <li key={i} style={{ fontSize: '12px' }}>
                      {desc}
                    </li>
                  )) || <li style={{ fontSize: '12px' }}>No description available.</li>}
                </ul>
              </Box>

              <Button
                fullWidth
                radius="md"
                color={appliedJobs.has(index) ? 'gray' : '#00AAFF'}
                disabled={appliedJobs.has(index)}
                onClick={() => handleApplyClick(index)}
              >
                {appliedJobs.has(index) ? 'Applied' : 'Apply Now'}
              </Button>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
