import {
  Box,
  Heading,
  Text,
  Divider,
  SimpleGrid,
  Flex,
} from "@chakra-ui/react";
import { Dot } from "@/components/dot";

import { Trip } from "@/types"

import { kgToMetricTons } from "@/utils/metrics";

interface InfoCardProps {
  days?: Trip["days"];
  co2kilograms?: Trip["co2kilograms"];
  countries?: Trip["countries"];
}

export const InfoCard = ({ days, co2kilograms, countries }: InfoCardProps) => {
  return (
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
        <Heading as="h1" fontSize="2xl" isTruncated>
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
          <Text fontSize="sm">Countries included:</Text>
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
  );
};
