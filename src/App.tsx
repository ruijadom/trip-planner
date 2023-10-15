import { useEffect, Fragment } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { api } from "./services/api";
import { Trip } from "./types";

import { Container, VStack, Grid, Box, Center, Text } from "@chakra-ui/react";
import { Card } from "./components/card";

import { kgToMetricTons } from "./utils/measures"

// This are the variables that we will use to implement pagination.
// Since we don't have a ready response from an database for implementing cursor-based pagination,
// which is my preferred type of pagination for these scenarios,
// I will instead set the page size variable to implement pagination using an offset-based approach.
const pageSize = 9;
// The number of pages is the total number of items divided by the number of items per page (9)
const totalNumberOfTrips = 70;

/**
 * A function to fetch a page of trips from the API.
 *
 * @param {Object} param - The parameters for fetching a page.
 * @param {number} param.pageParam - The page number to fetch.
 * @returns {Promise<Trip[]>} - A promise that resolves to an array of Trip objects.
 */
async function fetchTrips({ pageParam = 1 }): Promise<Trip[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await api.get(
    `/trips?_page=${pageParam}&_limit=${pageSize}`
  );
  return response.data;
}

/**
 * The main application component.
 */
function App() {
  const { ref, inView } = useInView();

  const currentPage = 1;
  const numberOfPages = Math.round(totalNumberOfTrips / pageSize);

  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["trips", currentPage], fetchTrips, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < numberOfPages) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return isLoading ? (
    <p>loading...</p>
  ) : isError ? (
    <p>{(error as Error).message}</p>
  ) : (
    <VStack bg="gray.100" padding={0} margin={0}>
      <Container
        maxW="7xl"
        py="12"
        px={{
          base: 4,
          md: 6,
          lg: 8,
        }}
      >
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          margin={0}
          gap={{
            base: 4,
            md: 4,
            lg: 6,
          }}
          gridAutoFlow="dense"
          justifyContent="center"
          alignItems="center"
        >
          {data?.pages.map((group, idx) => {
            return (
              <Fragment key={idx}>
                {group.map((trip: Trip) => (
                  <Card
                    key={trip.id}
                    title={trip?.title}
                    img={trip?.photoUrl}
                    countries={trip?.countries}
                    days={trip?.days}
                    action={null}
                    emissions={kgToMetricTons(trip?.co2kilograms)}
                    rating={trip?.rating}
                  />
                ))}
              </Fragment>
            );
          })}
        </Grid>
        <Box mt="12">
          <Center w="full" ref={ref}>
            <Text fontSize="lg" fontWeight="light">
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "No more trips to plan"}
            </Text>
          </Center>
        </Box>
      </Container>
    </VStack>
  );
}

export default App;
