import { Card, HStack, Table, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";

import type { UsersStatistics as UsersStatisticsType } from "@/api/services/admin/interfaces";
import { Icon } from "@/components/ui";

interface UsersStatisticsProps {
  statistics: UsersStatisticsType;
}

export const UsersStatistics = ({ statistics }: UsersStatisticsProps) => {
  const { totalUsers, recentUsers, userActivity } = statistics;

  return (
    <Card.Root width="full" bg="black">
      <Card.Body>
        <VStack spaceY={8}>
          <HStack spaceX={8} justify="center">
            <VStack spaceY={2} align="center">
              <HStack spaceX={2}>
                <Icon name="Users" size={16} />
                <Text fontWeight="bold">Total Users</Text>
              </HStack>
              <Text fontSize="md">{totalUsers}</Text>
            </VStack>

            <VStack spaceY={2} align="center">
              <HStack spaceX={2}>
                <Icon name="MessageCircle" size={16} />
                <Text fontWeight="bold">Total Feedbacks</Text>
              </HStack>
              <Text fontSize="md">{userActivity.totalFeedbacks}</Text>
            </VStack>

            <VStack spaceY={2} align="center">
              <HStack spaceX={2}>
                <Icon name="Star" size={16} />
                <Text fontWeight="bold">Total Ratings</Text>
              </HStack>
              <Text fontSize="md">{userActivity.totalRatings}</Text>
            </VStack>
          </HStack>

          <VStack spaceY={4} width="full">
            <Text fontWeight="bold" fontSize="md">
              Most Active Users
            </Text>

            <Table.Root variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>User</Table.ColumnHeader>
                  <Table.ColumnHeader>Feedbacks</Table.ColumnHeader>
                  <Table.ColumnHeader>Ratings</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {userActivity.mostActiveUsers.map((user) => (
                  <Table.Row key={user.id}>
                    <Table.Cell>
                      <VStack align="start" spaceY={1}>
                        <Text fontWeight="medium">
                          {user.firstName} {user.lastName}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {user.email}
                        </Text>
                      </VStack>
                    </Table.Cell>
                    <Table.Cell>{user.feedbacks_count}</Table.Cell>
                    <Table.Cell>{user.ratings_count}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </VStack>

          <VStack spaceY={4} width="full">
            <Text fontWeight="bold" fontSize="md">
              Recently Joined Users
            </Text>

            <Table.Root variant="outline">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>User</Table.ColumnHeader>
                  <Table.ColumnHeader>Email</Table.ColumnHeader>
                  <Table.ColumnHeader>Joined</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {recentUsers.map((user) => (
                  <Table.Row key={user.id}>
                    <Table.Cell>
                      {user.firstName} {user.lastName}
                    </Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>
                      {format(new Date(user.created_at), "MMM d, yyyy")}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </VStack>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
