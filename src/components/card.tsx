import { forwardRef } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Box,
  Image,
  Heading,
  Text,
  Flex,
  Stack,
  VStack,
  Center,
} from "@chakra-ui/react";
import { StarRating } from "./star-rating";

interface CardProps {
  id: number;
  title: string;
  countries: string[];
  days: number;
  emissions: string;
  img: string;
  rating: number;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ id, title, countries, days, emissions, img, rating }: CardProps, ref) => {
    return (
      <Box
        ref={ref}
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
              <Link to={`/trips/${id}`}>
                <Button colorScheme="blue" borderRadius="lg">
                  Learn more
                </Button>
              </Link>
            </Center>

            <Stack w="full" display="flex" spacing={2}>
              <Flex
                justifyContent="space-between"
                mx="8"
                p="4"
                bg="brand.900"
                borderRadius="lg"
              >
                <Text color="white" fontSize="sm" isTruncated>
                  Emissions offset:
                </Text>
                <Text color="white" fontSize="sm" isTruncated>
                  {emissions} CO <Text as="sup">2</Text>e
                </Text>
              </Flex>

              <Flex
                justifyContent="space-between"
                mx="8"
                p="4"
                bg="white"
                borderTopRadius="lg"
              >
                <Text fontSize="sm" fontWeight="bold" isTruncated>
                  Trip rating
                </Text>

                <Flex alignItems="center">
                  <StarRating rating={rating} />
                  <Text fontSize="sm" fontWeight="bold" ml="2">
                    {rating}
                  </Text>
                </Flex>
              </Flex>
            </Stack>
          </Box>
        </Box>
      </Box>
    );
  }
);
