'use client';

import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Image,
  Modal,
  Select,
  Text,
  TextInput,
  Textarea,
  rem,
  RangeSlider,
} from '@mantine/core';
import {
  IconBriefcase,
  IconCalendar,
  IconChevronDown,
  IconMapPin,
  IconSearch,
} from '@tabler/icons-react';
import { useState } from 'react';
import type { Job } from './JobGrid';



export default function Navbar() {
  // State for form fields
  const [salaryRange, setSalaryRange] = useState<[number, number]>([50000, 150000]);
  const [showForm, setShowForm] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salaryMin, setSalaryMin] = useState('50000');
  const [salaryMax, setSalaryMax] = useState('150000');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const inputStyle = {
    border: 'none',
    boxShadow: 'none',
    backgroundColor: 'transparent',
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.currentTarget.value.replace(/[^0-9/]/g, '');
    setApplicationDeadline(filtered);
  };

  const handleSalaryMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.currentTarget.value.replace(/\D/g, '');
    setSalaryMin(filtered);
    
  };

  const handleSalaryMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.currentTarget.value.replace(/\D/g, '');
    setSalaryMax(filtered);
    
  };

  // Handle form submit: add job to UI
  const handlePublish = async () => {
    if (!jobTitle || !companyName || !selectedLocation || !jobType) {
      alert('Please fill in all required fields.');
      return;
    }

    const newJob: Job = {
      logo: '/cmwlogo.svg',
      role: jobTitle,
      posted: 'Now',
      experience: '0–1 yr Exp',
      type: jobType,
      salary: `₹${salaryMin}–₹${salaryMax}`,
      description: jobDescription ? [jobDescription] : [],
    };

    // Send to backend
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob),
      });
      if (!res.ok) throw new Error('Failed to add job to backend');
      setShowForm(false);
      setJobTitle('');
      setCompanyName('');
      setSelectedLocation('');
      setJobType('');
      setSalaryMin('50000');
      setSalaryMax('150000');
      setSalaryRange([50000, 150000]);
      setApplicationDeadline('');
      setJobDescription('');
    } catch  {
      alert('Failed to add job to backend');
    }
  };

  return (
    <>
      {/* Mantine Modal for Job Creation */}
      <Modal
        opened={showForm}
        onClose={() => setShowForm(false)}
        title="Create Job Opening"
        centered
        size="lg"
        padding="lg"
        radius="md"
      >
        <Flex direction="column" gap="md">
          <Flex gap="sm">
            <TextInput
              label="Job Title"
              placeholder="Full Stack Developer"
              w="100%"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.currentTarget.value)}
            />
            <TextInput
              label="Company Name"
              placeholder="Amazon, Microsoft, Swiggy"
              w="100%"
              value={companyName}
              onChange={(e) => setCompanyName(e.currentTarget.value)}
            />
          </Flex>

          <Flex gap="sm">
            <TextInput
              label="Location"
              placeholder="Enter Preferred Location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.currentTarget.value)}
              w="100%"
            />

            <Select
              label="Job Type"
              placeholder="Select job type"
              data={[
                { value: 'Full-time', label: 'Full-time' },
                { value: 'Part-time', label: 'Part-time' },
                { value: 'Internship', label: 'Internship' },
              ]}
              value={jobType}
              onChange={(value) => setJobType(value || '')}
              w="100%"
            />
          </Flex>

          <Flex gap="sm" align="flex-end">
             <TextInput
    label="Minimum Salary"
    placeholder="₹0"
    w={280}
    onChange={handleSalaryMinChange}
    rightSection={<Text size="sm">₹</Text>}
  />
  <TextInput
    label="Maximum Salary"
    placeholder="₹12,00,000"
    w={280}
    onChange={handleSalaryMaxChange}
    rightSection={<Text size="sm">₹</Text>}
  />

            <TextInput
              label="Application Deadline"
              placeholder="DD/MM/YYYY"
              rightSection={<IconCalendar size={16} />}
              w="100%"
              value={applicationDeadline}
              onChange={handleDeadlineChange}
            />
          </Flex>

          <Textarea
            label="Job Description"
            placeholder="Please share a description to let the candidate know more about the job role"
            autosize
            minRows={3}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.currentTarget.value)}
          />

          <Flex justify="space-between" mt="sm">
            <Button variant="default" radius="md" onClick={() => alert('Draft saved!')}>
              Save Draft
            </Button>
            <Button radius="md" size="md" variant="filled" color="blue" onClick={handlePublish}>
              Publish
            </Button>
          </Flex>
        </Flex>
      </Modal>

      {/* Main Navbar */}
      <Box
        style={{
          backgroundColor: 'white',
          borderRadius: rem(50),
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '0.75rem 2rem',
          marginTop: rem(10),
          marginBottom: rem(10),
          maxWidth: rem(680),
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Container px={0}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap={rem(30)} wrap="nowrap">
              <Image
                src="/cmwlogo.svg"
                width={38}
                height={38}
                alt="Logo"
                radius="xl"
                style={{ marginRight: rem(4) }}
              />
              <Flex gap={rem(20)} wrap="nowrap" align="center">
                {['Home', 'Find Jobs', 'Find Talents', 'About us', 'Testimonials'].map((link) => (
                  <Text
                    key={link}
                    component="a"
                    href="#"
                    size="sm"
                    fw={600}
                    c="dark"
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {link}
                  </Text>
                ))}
                <Button
                  radius="xl"
                  size="sm"
                  variant="gradient"
                  gradient={{ from: '#6100AD', to: '#A128FF', deg: 360 }}
                  onClick={() => setShowForm(true)}
                >
                  Create Jobs
                </Button>
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Box>

      {/* Filter Bar */}
      <Box
        bg="white"
        py="md"
        style={{
          borderBottom: '1px solid #eee',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
        }}
      >
        <Container size="lg">
          <Flex align="center" wrap="nowrap" gap={0}>
            <Box w={250}>
              <TextInput
                leftSection={<IconSearch size={16} />}
                placeholder="Search By Job Title, Role"
                w="100%"
                styles={{ input: inputStyle }}
              />
            </Box>

            <Divider orientation="vertical" color="#e0e0e0" />

            <Box w={200}>
              <Select
                leftSection={<IconMapPin size={16} />}
                placeholder="Preferred Location"
                data={['Chennai', 'Bangalore', 'Remote', 'Hyderabad']}
                w="100%"
                styles={{ input: inputStyle }}
                rightSection={<IconChevronDown size={16} />}
              />
            </Box>

            <Divider orientation="vertical" color="#e0e0e0" />

            <Box w={200}>
              <Select
                leftSection={<IconBriefcase size={16} />}
                placeholder="Job type"
                data={['Full-time', 'Part-time',  'Internship']}
                w="100%"
                styles={{ input: inputStyle }}
                rightSection={<IconChevronDown size={16} />}
              />
            </Box>

            <Divider orientation="vertical" color="#e0e0e0" />

            <Box w={250} pl="md">
              <Flex justify="space-between" mb={4}>
                <Text size="xs" fw={500} c="black">
                  Salary Per Month
                </Text>
                <Text size="xs" fw={700} c="black">
                  ₹{salaryRange[0] / 1000}k – ₹{salaryRange[1] / 1000}k
                </Text>
              </Flex>

              <RangeSlider
                min={10000}
                max={200000}
                step={10000}
                value={salaryRange}
                onChange={setSalaryRange}
                styles={{
                  track: {
                    height: 2,
                    backgroundColor: 'black',
                  },
                  bar: {
                    backgroundColor: 'black',
                  },
                  thumb: {
                    width: 12,
                    height: 12,
                    border: '2px solid black',
                    background: 'radial-gradient(circle, white 12%, black 13%)',
                  },
                }}
              />
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  );
}