import { For, IconButton, Pagination, VStack } from "@chakra-ui/react";

import type { AnimalShelterOutput } from "@/api/services/animal-shelters/core/interfaces";
import { ShelterShortItem } from "@/components/features";

interface SheltersListProps {
  shelters: AnimalShelterOutput[];
  totalItems: number;
  currentPage: number;
  pageSize: number;

  onPageChange: (page: number) => void;
}

export const SheltersList = ({
  shelters,
  totalItems,
  currentPage,
  pageSize,

  onPageChange,
}: SheltersListProps) => {
  return (
    <VStack spaceY={4} width="full">
      <For each={shelters}>
        {(shelter) => <ShelterShortItem key={shelter.id} shelter={shelter} />}
      </For>

      <Pagination.Root
        count={totalItems}
        pageSize={pageSize}
        page={currentPage}
        onPageChange={({ page }) => onPageChange(page)}
        siblingCount={1}
      >
        <Pagination.PrevTrigger />
        <Pagination.Items
          render={(page) => (
            <IconButton
              disabled={page.value === currentPage || totalItems <= pageSize}
              variant={{ base: "ghost", _selected: "outline" }}
            >
              {page.value}
            </IconButton>
          )}
        />
        <Pagination.NextTrigger />
        <Pagination.PageText format="long" />
      </Pagination.Root>
    </VStack>
  );
};
