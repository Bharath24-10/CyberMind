'use client';

import {Box, Button, Card, Flex, Grid, Image, Text,} from '@mantine/core';
import { IconUser, IconMapPin, IconBriefcase } from '@tabler/icons-react';
import { useState } from 'react';

const jobs = [
  {
    logo: '/amazon.jpg',
    role: 'Full Stack Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
  },
  {
    logo: '/tesla-logo-tesla-icon-transparent-png-free-vector.jpg',
    role: 'Node Js Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
  },
  {
    logo: '/swiggyi.jpg',
    role: 'UX/UI Designer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
  },
  {
    logo: '/amazon.jpg',
    role: 'Full Stack Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
  },
  {
    logo: '/tesla-logo-tesla-icon-transparent-png-free-vector.jpg',
    role: 'Node JS Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
  },
  {
    logo: '/swiggyi.jpg',
    role: 'UI/UX Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
  },
  {
    logo: '/amazon.jpg',
    role: 'Full Stack Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
  },
  {
    logo: '/tesla-logo-tesla-icon-transparent-png-free-vector.jpg',
    role: 'Node JS Developer',
    posted: '24h Ago',
    experience: '1–3 yr Exp',
    type: 'Onsite',
    salary: '12LPA',
  },
  
  // You can add more jobs as needed
];

export default function JobGrid() {
  // Track which jobs are applied, store index keys in a Set
  const [appliedJobs, setAppliedJobs] = useState<Set<number>>(new Set());

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
                {/* Enlarged Logo */}
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
                    root: { backgroundColor: '#B0D9FF' }, // Mantine's blue[6]
                    label: { color: 'black' }
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
                  <li style={{ fontSize: '12px' }}>
                    A user-friendly interface lets you browse stunning photos and videos
                  </li>
                  <li style={{ fontSize: '12px' }}>
                    Filter destinations based on interests and travel style, and create personalized
                  </li>
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
