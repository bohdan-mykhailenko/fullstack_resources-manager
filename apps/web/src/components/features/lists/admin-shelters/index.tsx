import {
  Button,
  For,
  HStack,
  IconButton,
  Pagination,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

import { AnimalShelterOutput } from "@/api/services/animal-shelters/core/interfaces";
import {
  CreateShelterForm,
  UpdateShelterForm,
} from "@/components/features/forms";
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
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
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
      <HStack justify="space-between" w="full">
        <Text fontSize="2xl" fontWeight="bold">
          Shelters Management
        </Text>
        <Dialog
          title="Create New Shelter"
          trigger={
            <Button colorPalette="black" variant="subtle">
              <Icon name="Plus" />
              Create Shelter
            </Button>
          }
          onOpenChange={(event) => setIsCreateDialogOpen(event.open)}
          isOpen={isCreateDialogOpen}
        >
          <CreateShelterForm
            onSuccess={() => {
              setIsCreateDialogOpen(false);
              onRefetchList();
            }}
          />
        </Dialog>
      </HStack>

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
              <Text fontWeight="semibold">{shelter.name}</Text>
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
                    shelter.isVerified ? "Unverify shelter" : "Verify shelter"
                  }
                >
                  <IconButton
                    size="xs"
                    aria-label="Verify shelter"
                    colorPalette={shelter.isVerified ? "gray" : "green"}
                    onClick={() =>
                      shelter.isVerified
                        ? onUnverify(shelter.id)
                        : onVerify(shelter.id)
                    }
                    variant="ghost"
                  >
                    <Icon name="Check" />
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
