import {
  HStack,
  VStack,
  Button,
  Box,
  Image,
  Heading,
  Text,
  Flex,
  Stack,
  Card as ChakraCard,
  Center,
} from "@chakra-ui/react";

interface CardProps {
  title: string;
  countries: string[];
  days: number;
  action: React.ReactNode;
  emissions: string;
  img: string;
  rating: number;
}

export const Card = ({
  title,
  countries,
  days,
  action,
  emissions,
  img,
  rating,
}: CardProps) => {
  return (
    <Box
      display="flex"
      shadow="12"
      bg="white"
      borderRadius="12"
      position="relative"
    >
      <Box h="337px" w="full" position="relative" m="3">
        <Image
          src={img}
          position="absolute"
          objectFit="cover"
          h="full"
          w="full"
          borderRadius="6"
          alt="trip photo"
          fontSize="16px"
          filter="brightness(0.5)"
        />

        <Box position="relative" h="full" w="full">
          <VStack spacing={2} w="full" mt="12">
            <Heading
              as="h1"
              color="white"
              fontWeight="bold"
              fontSize="x-large"
              px="2"
              isTruncated
            >
              {title}
            </Heading>

            <Text color="white" fontSize="sm">
              {countries.length} Countries, {days} Days
            </Text>
          </VStack>

          <Center my="10">
            <Button colorScheme="blue" borderRadius="lg">
              Learn more
            </Button>
          </Center>

          <Stack w="full" display="flex" spacing={2}>
            <Flex
              justifyContent="space-between"
              mx="8"
              p="4"
              bg="brand.900"
              borderRadius="lg"
            >
              <Text color="white" fontSize="sm">
                Emissions offset:
              </Text>
              <Text color="white" fontSize="sm">
                {emissions} CO<sub>2</sub>e
              </Text>
            </Flex>

            <Flex
              justifyContent="space-between"
              mx="8"
              p="4"
              bg="white"
              borderTopRadius="lg"
            >
              <Text fontSize="sm" fontWeight="bold">
                Trip rating
              </Text>
              <Text fontSize="sm" fontWeight="bold">
                {rating}
              </Text>
            </Flex>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
