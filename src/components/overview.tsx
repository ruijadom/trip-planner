import { Box, Flex, Heading, SimpleGrid, Text, Divider } from "@chakra-ui/react";
import { CalendarIcon, ChatIcon, PhoneIcon, SunIcon } from "@chakra-ui/icons";
import { Trip } from "@/types"

interface OverviewProps {
  advantages?: Trip["advantages"]
  description?: Trip["description"];
}

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

export const Overview = ({ advantages, description } : OverviewProps) => {
  return (
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
  )
  }