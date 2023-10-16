import { Link as ReactRouterLink, useParams } from "react-router-dom";
import {
  Link as ChakraLink,
  Heading,
  Stack,
  Divider,
  Image,
  Text,
  Box,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";

import { api } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import { Trip } from "../types";
import { kgToMetricTons } from "../utils/metrics";

import { CalendarIcon, ChatIcon, PhoneIcon, SunIcon } from "@chakra-ui/icons";

import { Dot } from "../components/dot";

// Define an array of icon components
const icons: (
  | typeof CalendarIcon
  | typeof ChatIcon
  | typeof PhoneIcon
  | typeof SunIcon
)[] = [CalendarIcon, ChatIcon, PhoneIcon, SunIcon];

// Create an object map with icons and their respective keys/index
const iconMap: Record<
  number,
  typeof CalendarIcon | typeof ChatIcon | typeof PhoneIcon | typeof SunIcon
> = {};

icons.forEach((IconComponent, index) => {
  // You can use the index as the key, or provide custom keys if needed
  iconMap[index] = IconComponent;
});

export const TripDetailsPage = () => {
  const { tripId } = useParams(); // Get the tripId from the URL

  async function fetchTrip(): Promise<Trip> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await api.get(`/trips/${tripId}`);
    return response.data;
  }

  const { isLoading, isError, error, data } = useQuery(
    ["trip", tripId],
    fetchTrip,
    {
      cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
    }
  );

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>{(error as Error).message}</p>;
  }

  if (!data) {
    return <p>Something went wrong</p>;
  }

  const {
    title,
    subtitle,
    photoUrl,
    days,
    co2kilograms,
    countries,
    description,
    advantages,
  } = data;

  return (
    <Stack>
      <ChakraLink as={ReactRouterLink} to="/">
        Go back
      </ChakraLink>

      <Box position="relative" mt="12" h="full" w="full">
        {title && (
          <Heading as="h1" fontWeight="bold" fontSize="x-large" isTruncated>
            {title}
          </Heading>
        )}

        {subtitle && (
          <Text fontSize="sm" mt="1">
            {subtitle}
          </Text>
        )}
      </Box>

      <Flex
        mt="6"
        justify={{ base: "center", md: "space-between", xl: "space-between" }}
        direction={{ base: "column", md: "row" }}
      >
        <Box w={{ base: "100%", sm: "100%", md: "70%" }}>
          <Image
            src={photoUrl}
            objectFit="cover"
            h="450px"
            w="full"
            borderRadius="12"
            shadow="xl"
          />
          <Box mt="8">
            <Heading as="h2" fontSize="lg">
              Overview
            </Heading>

            {advantages && (
              <SimpleGrid columns={2} spacing={2} mt="4">
                {advantages.map((advantage, index) => {
                  const IconAtIndex = iconMap[index];

                  return (
                    <Flex>
                      <Box>{iconMap[index] && <IconAtIndex mr="2" />}</Box>

                      <Box>
                        <Text fontSize="md" fontWeight="semibold">
                          {advantage.title}
                        </Text>
                        <Text fontSize="xs" fontWeight="light">
                          {advantage.description}
                        </Text>
                      </Box>
                    </Flex>
                  );
                })}
              </SimpleGrid>
            )}

            <Divider my="6" />

            {description && (
              <Text mt="2" fontSize="sm">
                {description}
              </Text>
            )}
          </Box>
        </Box>

        <Box
          h="full"
          w={{ base: "100%", md: "30%" }}
          mt={{ base: 12, md: 0 }}
          ml={{ base: 0, md: 10 }}
          bg="white"
          border={{ base: "none", md: "1px solid #E2E8F0" }}
          borderRadius="12"
          p="6"
        >
          {days && (
            <Heading
              as="h1"
              fontSize="x-large"
              size="xl"
              fontWeight="bold"
              color="primary.800"
              isTruncated
            >
              {days} Days
            </Heading>
          )}
          {co2kilograms && (
            <Text fontSize="sm" mt="1">
              Emissions: {kgToMetricTons(co2kilograms)} CO
              <Text as="sup">2</Text>e
            </Text>
          )}

          <Divider my="4" />

          {countries && (
            <Box>
              Countries included:
              <SimpleGrid columns={2} spacing={2} mt="2">
                {countries.map((country) => (
                  <Flex alignItems="center">
                    <Dot />
                    <Text fontSize="sm" ml="2">
                      {country}
                    </Text>
                  </Flex>
                ))}
              </SimpleGrid>
            </Box>
          )}
        </Box>
      </Flex>
    </Stack>
  );
};
