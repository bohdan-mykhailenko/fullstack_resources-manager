import {
  Box,
  Button,
  Fieldset,
  Field as FormControl,
  Input,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";

import { apiClient } from "@/api";
import { useMutation } from "@/api/hooks/useMutation";
import { AdminInput, AdminOutput } from "@/api/services/admin/interfaces";
import { FormFieldError } from "@/components/ui";
import { useAdminActions } from "@/store";

import { adminAuthSchema } from "./validation";

export const AdminVerificationForm = () => {
  const { loginAdmin } = useAdminActions();
  const navigate = useNavigate();

  const { mutate: verifyAdmin, isPending } = useMutation<
    AdminOutput,
    AdminInput
  >({
    mutationFn: (input) => apiClient.admin.authenticate(input),
    onSuccess: (data) => {
      loginAdmin(data.token);
      navigate({ to: "/admin" });
    },
    successMessage: "Successfully authenticated as admin!",
  });

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      password: "",
    },
    onSubmit: ({ value }) => {
      verifyAdmin(value);
    },
    validators: {
      onChange: adminAuthSchema,
    },
  });

  return (
    <Box w="full" minW={320}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <Fieldset.Root spaceY={4}>
          <Field
            name="password"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Admin Password:
                </FormControl.Label>

                <Input
                  id={field.name}
                  type="password"
                  colorPalette="orange"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter admin password"
                />

                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <VStack spaceY={4} mt={6}>
            <Button
              w="full"
              type="submit"
              colorPalette="orange"
              loading={isPending}
              loadingText="Verifying..."
              color="white"
            >
              Verify Admin Access
            </Button>
          </VStack>
        </Fieldset.Root>
      </form>
    </Box>
  );
};
