import { useEffect, Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
// import { useInView } from "react-intersection-observer";
import useIntersectionObserver from "@/utils/hooks/use-intersection-observer"

import { Grid, Box, Center, Text } from "@chakra-ui/react";

import { api } from "@/services/api";
import { Trip } from "@/types";

import { Card } from "@/components/card";
import { kgToMetricTons } from "@/utils/metrics";


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
  const response = await api.get(
    `/trips?_page=${pageParam}&_limit=${pageSize}`
  );
  return response.data;
}

export const TripsPage = () => {
  // const { ref, inView } = useInView();

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
    cacheTime: 1000 * 60 * 30, // Cache data for 30 minutes
    staleTime: 1000 * 60 * 30, // Refetch data every 30 minutes
  });

  const loadMoreRef = useIntersectionObserver(fetchNextPage, {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  });


  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isError) {
    return <p>{(error as Error).message}</p>;
  }

  if (!data) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
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
          lg: 4,
          xl: 6,
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
                  ref={idx === data.pages.length - 1 ? loadMoreRef : null}
                  key={trip.id}
                  id={trip.id}
                  title={trip?.title}
                  img={trip?.photoUrl}
                  countries={trip?.countries}
                  days={trip?.days}
                  emissions={kgToMetricTons(trip?.co2kilograms)}
                  rating={trip?.rating}
                />
              ))}
            </Fragment>
          );
        })}
      </Grid>
      <Box mt="12">
        <Center w="full">
          <Text fontSize="lg" fontWeight="light">
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "No more trips to plan"}
          </Text>
        </Center>
      </Box>
    </>
  );
};
