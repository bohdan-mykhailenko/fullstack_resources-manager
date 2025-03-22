import {
  Container,
  For,
  HStack,
  Input,
  Text,
  VStack,
  createListCollection,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "@tanstack/react-router";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import { apiClient } from "@/api";
import {
  SortBy,
  SortOrder,
} from "@/api/services/animal-shelters/core/interfaces";
import { SheltersList } from "@/components/features/lists/shelters";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui";
import { LoadedContentController } from "@/components/utils";
import { useIsAdmin } from "@/store";

const PAGE_SIZE = 10;

const sortByCollection = createListCollection({
  items: [
    {
      value: `${SortBy.RATING}-${SortOrder.DESC}`,
      label: "Highest Rated",
    },
    {
      value: `${SortBy.RATING}-${SortOrder.ASC}`,
      label: "Lowest Rated",
    },
    {
      value: `${SortBy.CREATED_AT}-${SortOrder.DESC}`,
      label: "Newest First",
    },
    {
      value: `${SortBy.CREATED_AT}-${SortOrder.ASC}`,
      label: "Oldest First",
    },
  ],
});

const verificationCollection = createListCollection({
  items: [
    { value: "all", label: "All Shelters" },
    { value: "verified", label: "Verified Only" },
  ],
});

export const SheltersPage = () => {
  const isAdmin = useIsAdmin();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [verificationFilter, setVerificationFilter] = useState<
    "all" | "verified"
  >("all");
  const [sortBy, setSortBy] = useState<{
    field: SortBy;
    order: SortOrder;
  }>({
    field: SortBy.RATING,
    order: SortOrder.DESC,
  });

  const [debouncedSearch] = useDebounce(searchQuery, 300);

  if (isAdmin) {
    return <Navigate to="/admin" />;
  }

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: [
      "shelters",
      currentPage,
      debouncedSearch,
      verificationFilter,
      sortBy,
    ],
    queryFn: () =>
      apiClient.animalShelters.filter(
        {
          query: debouncedSearch || undefined,
          is_verified: verificationFilter === "verified",
          sortBy: sortBy.field,
          sortOrder: sortBy.order,
          page: currentPage,
          limit: PAGE_SIZE,
        },
        "graphql"
      ),
  });

  return (
    <Container maxW="2xl" py={8}>
      <VStack spaceY={6}>
        <VStack width="full" spaceY={4}>
          <Input
            placeholder="Search shelters..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            colorPalette="orange"
          />

          <HStack width="full" spaceX={4}>
            <SelectRoot
              colorPalette="orange"
              size="sm"
              collection={verificationCollection}
              value={[verificationFilter]}
              onValueChange={({ value }) =>
                setVerificationFilter(value[0] as typeof verificationFilter)
              }
            >
              <SelectTrigger>
                <SelectValueText
                  placeholder="Filter by verification"
                  fontWeight="semibold"
                />
              </SelectTrigger>

              <SelectContent>
                <For
                  each={verificationCollection.items}
                  fallback={<Text>No filters available</Text>}
                >
                  {(item) => (
                    <SelectItem item={item} key={item.value}>
                      {item.label}
                    </SelectItem>
                  )}
                </For>
              </SelectContent>
            </SelectRoot>

            <SelectRoot
              colorPalette="orange"
              size="sm"
              collection={sortByCollection}
              value={[`${sortBy.field}-${sortBy.order}`]}
              onValueChange={({ value }) => {
                const [field, order] = value[0].split("-") as [
                  SortBy,
                  SortOrder,
                ];
                setSortBy({ field, order });
              }}
            >
              <SelectTrigger>
                <SelectValueText placeholder="Sort by" fontWeight="semibold" />
              </SelectTrigger>

              <SelectContent>
                <For
                  each={sortByCollection.items}
                  fallback={<Text>No sorting options</Text>}
                >
                  {(item) => (
                    <SelectItem item={item} key={item.value}>
                      {item.label}
                    </SelectItem>
                  )}
                </For>
              </SelectContent>
            </SelectRoot>
          </HStack>
        </VStack>

        <LoadedContentController
          isLoading={isLoading}
          isError={!!error}
          isEmpty={isSuccess && data?.items?.length === 0}
          errorMessage="Failed to fetch shelters. Please try again."
          emptyMessage="No shelters found"
          data={data ?? null}
        >
          {(shelters) => (
            <SheltersList
              shelters={shelters?.items ?? []}
              totalItems={shelters?.total ?? 0}
              pageSize={PAGE_SIZE}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          )}
        </LoadedContentController>
      </VStack>
    </Container>
  );
};
