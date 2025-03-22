import {
  For,
  HStack,
  IconButton,
  Pagination,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { AnimalShelterOutput } from "@/api/services/animal-shelters/core/interfaces";
import { UpdateShelterForm } from "@/components/features/forms";
import { Dialog, Icon, Tooltip } from "@/components/ui";

interface AdminSheltersListProps {
  shelters: AnimalShelterOutput[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onDelete: (id: string) => void;
  onVerify: (id: string) => void;
  onUnverify: (id: string) => void;
  onRefetchList: () => void;
}

export const AdminSheltersList = ({
  shelters,
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onDelete,
  onVerify,
  onUnverify,
  onRefetchList,
}: AdminSheltersListProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <VStack
      spaceY={4}
      width={{
        base: "full",
        md: 500,
        lg: 600,
        xl: 700,
      }}
    >
      <For each={shelters}>
        {(shelter) => {
          return (
            <HStack
              key={shelter.id}
              justify="space-between"
              w="full"
              p={4}
              borderWidth={1}
              borderRadius="md"
            >
              <HStack spaceX={2}>
                <IconButton
                  size="xs"
                  aria-label="View shelter"
                  colorPalette="orange"
                  variant="ghost"
                >
                  <Link
                    to="/shelters/$shelterId"
                    params={{ shelterId: shelter.id }}
                  >
                    <Icon name="ExternalLink" />
                  </Link>
                </IconButton>

                <Text fontWeight="semibold">{shelter.name}</Text>
              </HStack>

              <HStack spaceX={2}>
                <Dialog
                  title="Edit Shelter"
                  trigger={
                    <IconButton
                      size="xs"
                      aria-label="Edit shelter"
                      colorPalette="blue"
                      variant="ghost"
                    >
                      <Tooltip content="Edit shelter">
                        <Icon name="Pencil" />
                      </Tooltip>
                    </IconButton>
                  }
                  isOpen={isEditDialogOpen}
                  onOpenChange={(event) => setIsEditDialogOpen(event.open)}
                >
                  <UpdateShelterForm
                    shelter={shelter}
                    onSuccess={() => {
                      setIsEditDialogOpen(false);
                      onRefetchList();
                    }}
                  />
                </Dialog>

                <Tooltip
                  content={
                    shelter.is_verified ? "Unverify shelter" : "Verify shelter"
                  }
                >
                  <IconButton
                    size="xs"
                    aria-label="Verify shelter"
                    colorPalette={shelter.is_verified ? "red" : "green"}
                    onClick={() =>
                      shelter.is_verified
                        ? onUnverify(shelter.id)
                        : onVerify(shelter.id)
                    }
                    variant="ghost"
                  >
                    <Icon
                      name={shelter.is_verified ? "ShieldX" : "ShieldCheck"}
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip content="Delete shelter">
                  <IconButton
                    size="xs"
                    aria-label="Delete shelter"
                    colorPalette="red"
                    variant="subtle"
                    onClick={() => onDelete(shelter.id)}
                  >
                    <Icon name="Trash" />
                  </IconButton>
                </Tooltip>
              </HStack>
            </HStack>
          );
        }}
      </For>

      {totalItems > pageSize && (
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
              <IconButton variant={{ base: "ghost", _selected: "outline" }}>
                {page.value}
              </IconButton>
            )}
          />
          <Pagination.NextTrigger />
          <Pagination.PageText format="long" />
        </Pagination.Root>
      )}
    </VStack>
  );
};
