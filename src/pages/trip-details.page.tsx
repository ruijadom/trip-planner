import { Link as ReactRouterLink, useParams } from "react-router-dom";
import {
  Link as ChakraLink,
  Heading,
  Stack,
  Image,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";
import { Trip } from "@/types";
import { Overview } from "@/components/overview";
import { InfoCard } from "@/components/info-card";

export const TripDetailsPage = () => {
  const { tripId } = useParams(); // Get the tripId from the URL

  async function fetchTrip(): Promise<Trip> {
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

      {/* Heading */}
      <Box position="relative" mt="12" h="full" w="full">
        {title && (
          <Heading as="h1" fontWeight="bold" fontSize="3xl" isTruncated>
            {title}
          </Heading>
        )}

        {subtitle && (
          <Text fontSize="sm" mt="1">
            {subtitle}
          </Text>
        )}
      </Box>

      {/* Image, Overview, and InfoCard */}
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
          <Overview advantages={advantages} description={description} />
        </Box>

        <InfoCard
          days={days}
          co2kilograms={co2kilograms}
          countries={countries}
        />
      </Flex>
    </Stack>
  );
};
