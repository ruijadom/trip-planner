import { useEffect, Fragment } from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { api } from "./services/api";
import { Trip } from "./types";

async function fetchTrips({ pageParam = 1 }): Promise<Trip[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const response = await api.get(`/trips?_page=${pageParam}&_limit=12`);
  return response.data;
}

function App() {
  const { ref, inView } = useInView();

  const pageNumber = 1;

  const {
    isLoading,
    isError,
    error,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(["trips", pageNumber], fetchTrips, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  useEffect(() => {
    if (inView) {
      console.log("fetching next page");
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return isLoading ? (
    <p>loading...</p>
  ) : isError ? (
    <p>{(error as Error).message}</p>
  ) : (
    <div className="App">
      {data?.pages.map((group, idx) => {
        return (
          <Fragment key={idx}>
            {group.map((trip: Trip) => (
              <div key={trip.id}>
                <p>{trip.title}</p>
                <p>{trip.rating} stars</p>
              </div>
            ))}
          </Fragment>
        );
      })}
      <div>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
}

export default App;
