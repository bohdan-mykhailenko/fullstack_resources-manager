import {
  Box,
  Button,
  Fieldset,
  Field as FormControl,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";
import { Link, useNavigate } from "@tanstack/react-router";

import { apiClient } from "@/api";
import { useMutation } from "@/api/hooks/useMutation";
import { SignInInput, UserOutput } from "@/api/services/users/interfaces";
import { FormFieldError } from "@/components/ui";
import { useAuthActions } from "@/store/current-user";

import { signInSchema } from "./validation";

export const SignInForm = () => {
  const { loginUser } = useAuthActions();
  const navigate = useNavigate();

  const { mutate: signIn, isPending } = useMutation<UserOutput, SignInInput>({
    mutationFn: (input) => apiClient.users.signIn(input),
    onSuccess: (user) => {
      loginUser(user);

      navigate({ to: "/" });
    },
    successMessage: "Successfully logged in!",
  });

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => {
      signIn(value);
    },
    validators: {
      onChange: signInSchema,
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
            name="email"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Email:
                </FormControl.Label>

                <Input
                  id={field.name}
                  type="email"
                  colorPalette="orange"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter your email"
                />

                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="password"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Password:
                </FormControl.Label>

                <Input
                  id={field.name}
                  type="password"
                  colorPalette="orange"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter your password"
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
              loadingText="Processing..."
              color="white"
            >
              Sign in
            </Button>

            <HStack
              align="center"
              justify="center"
              css={{
                "& a": {
                  textDecoration: "none",
                  color: "blue.600",
                  fontWeight: "bold",
                  fontSize: "sm",
                },
              }}
            >
              <Text>Don&apos;t have an account?</Text>

              <Link to="/sign-up">Sign up</Link>
            </HStack>
          </VStack>
        </Fieldset.Root>
      </form>
    </Box>
  );
};
