import { Table, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { memo } from "react";

import { DetailedUserOutput } from "@/api/services/admin/interfaces";

interface UsersListProps {
  users: DetailedUserOutput[];
}

export const UsersList = memo(({ users }: UsersListProps) => {
  return (
    <VStack align="stretch" spaceY={4}>
      <Table.Root variant="outline">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader>Email</Table.ColumnHeader>
            <Table.ColumnHeader>Joined</Table.ColumnHeader>
            <Table.ColumnHeader>Feedbacks</Table.ColumnHeader>
            <Table.ColumnHeader>Ratings</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map((user) => (
            <Table.Row key={user.id}>
              <Table.Cell>
                <Text>
                  {user.firstName} {user.lastName}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{user.email}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{format(new Date(user.createdAt), "MMM d, yyyy")}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{user.feedbacksCount}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text>{user.ratingsCount}</Text>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </VStack>
  );
});
