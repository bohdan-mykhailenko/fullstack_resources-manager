import {
  Button,
  Fieldset,
  Field as FormControl,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";

import { apiClient } from "@/api";
import { useMutation } from "@/api/hooks/useMutation";
import { FormFieldError } from "@/components/ui";
import { useCurrentUserData } from "@/store";

import { feedbackSchema } from "./validation";

interface FeedbackFormProps {
  shelterId: string;
  onSuccess?: () => void;
}

export const FeedbackForm = ({ shelterId, onSuccess }: FeedbackFormProps) => {
  const currentUser = useCurrentUserData();

  const { mutate: addFeedback, isPending } = useMutation({
    mutationFn: (input: { content: string }) =>
      apiClient.animalSheltersFeedback.add(shelterId, {
        content: input.content,
        userId: Number(currentUser?.id),
      }),
    onSuccess,
    successMessage: "Feedback submitted successfully!",
  });

  const { Field, handleSubmit, reset } = useForm({
    defaultValues: {
      content: "",
    },
    onSubmit: ({ value }) => {
      addFeedback(value);
      reset();
    },
    validators: {
      onChange: feedbackSchema,
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <Fieldset.Root spaceY={4}>
        <Field
          name="content"
          children={(field) => (
            <FormControl.Root>
              <FormControl.Label fontSize="md" fontWeight="medium">
                Your Feedback:
              </FormControl.Label>

              <Textarea
                value={field.state.value}
                onChange={(event) => field.handleChange(event.target.value)}
                onBlur={field.handleBlur}
                placeholder="Share your experience with this shelter..."
                rows={4}
              />

              <FormFieldError state={field.state} />
            </FormControl.Root>
          )}
        />

        <Button
          color="white"
          fontWeight="bold"
          type="submit"
          colorPalette="orange"
          loading={isPending}
          loadingText="Submitting..."
        >
          Submit Feedback
        </Button>
      </Fieldset.Root>
    </form>
  );
};
