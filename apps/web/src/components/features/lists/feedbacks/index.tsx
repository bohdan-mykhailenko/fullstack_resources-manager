import { Avatar, Card, For, HStack, Text, VStack } from "@chakra-ui/react";
import { format } from "date-fns";

import type { FeedbackOutput } from "@/api/encore-client/services/animal-shelters/feedback/interface";

interface FeedbackListProps {
  feedbacks: FeedbackOutput[];
}

export const FeedbackList = ({ feedbacks }: FeedbackListProps) => {
  return (
    <VStack spaceY={2} width="full" align="start">
      <Text fontSize="md" fontWeight="medium">
        Feedbacks ({feedbacks.length})
      </Text>

      <For each={feedbacks}>
        {(feedback) => (
          <Card.Root key={feedback.id} p={2} width="full">
            <Card.Body px={2} py={1}>
              <VStack align="start" spaceY={2}>
                <HStack spaceX={3}>
                  <Avatar.Root size="sm">
                    <Avatar.Fallback
                      name={`${feedback.first_name} ${feedback.last_name}`}
                    />
                  </Avatar.Root>

                  <VStack align="start" spaceY={0}>
                    <Text fontWeight="bold">
                      {feedback.first_name} {feedback.last_name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {format(new Date(feedback.created_at), "PPP")}
                    </Text>
                  </VStack>
                </HStack>

                <Text>{feedback.content}</Text>
              </VStack>
            </Card.Body>
          </Card.Root>
        )}
      </For>
    </VStack>
  );
};
