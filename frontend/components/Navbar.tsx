'use client';

import {
  Box,
  Button,
  CloseButton,
  Container,
  Divider,
  Flex,
  Image,
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
    setSalaryRange([Number(filtered || 0), salaryRange[1]]);
  };

  const handleSalaryMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.currentTarget.value.replace(/\D/g, '');
    setSalaryMax(filtered);
    setSalaryRange([salaryRange[0], Number(filtered || 0)]);
  };

  // The main function to POST job data to backend
  const handlePublish = async () => {
  if (!jobTitle || !companyName || !selectedLocation || !jobType) {
    alert('Please fill in all required fields.');
    return;
  }

  const jobData = {
    title: jobTitle,
    company: companyName,
    location: selectedLocation,
    jobType,
    salaryMin: Number(salaryMin),
    salaryMax: Number(salaryMax),
    applicationDeadline,
    description: jobDescription,
  };

  try {
    const response = await fetch('https://cybermind-di3j.onrender.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const result = await response.json();
    console.log('Job created:', result);
    alert('Job created successfully!');
    setShowForm(false);
    // Reset form states...
  } catch (error) {
    console.error('Error creating job:', error);
    alert('Failed to create job');
  }
};


  return (
    <>
      {showForm && (
        <>
          <Box
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              zIndex: 999,
            }}
          />

          <Box
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              padding: rem(24),
              borderRadius: rem(12),
              boxShadow: '0 0 8px rgba(0,0,0,0.15)',
              zIndex: 1000,
              width: rem(640),
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            <Flex justify="space-between" align="center" mb="md">
              <Text fw={700} size="lg">
                Create Job Opening
              </Text>
              <CloseButton onClick={() => setShowForm(false)} />
            </Flex>

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

                <TextInput
                  label="Job Type"
                  placeholder="e.g., Full-time, Part-time"
                  value={jobType}
                  onChange={(e) => setJobType(e.currentTarget.value)}
                  w="100%"
                />
              </Flex>

              <Flex gap="sm" align="flex-end">
                <Box w="100%">
                  <Text size="sm" fw={500} mb={4}>
                    Salary Range
                  </Text>
                  <Flex gap="sm">
                    <TextInput
                      placeholder="₹0"
                      w="100%"
                      value={salaryMin}
                      onChange={handleSalaryMinChange}
                      rightSection={<Text size="sm">₹</Text>}
                    />
                    <TextInput
                      placeholder="₹12,00,000"
                      w="100%"
                      value={salaryMax}
                      onChange={handleSalaryMaxChange}
                      rightSection={<Text size="sm">₹</Text>}
                    />
                  </Flex>
                </Box>

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
          </Box>
        </>
      )}

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
                data={['Full-time', 'Part-time', 'Contract', 'Internship']}
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
