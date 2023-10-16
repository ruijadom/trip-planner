import { StarIcon } from "@chakra-ui/icons";
import { Box, HStack } from "@chakra-ui/layout";
import { Trip } from "../types";

export const StarRating = ({ rating }: Pick<Trip, "rating">) => {
  // Round the rating to the nearest whole number
  const roundedRating = Math.round(rating);

  return (
    <Box>
      <HStack spacing={1}>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < roundedRating ? "yellow.400" : "gray.300"}
            />
          ))}
      </HStack>
    </Box>
  );
};
