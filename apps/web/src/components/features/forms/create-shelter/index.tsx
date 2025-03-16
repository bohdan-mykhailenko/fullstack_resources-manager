import {
  Button,
  Fieldset,
  Field as FormControl,
  Grid,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";

import { apiClient } from "@/api";
import { useMutation } from "@/api/hooks/useMutation";
import { CreateAnimalShelterInput } from "@/api/services/animal-shelters/core/interfaces";
import { FormFieldError } from "@/components/ui";

import { shelterSchema } from "./validation";

interface CreateShelterFormProps {
  onSuccess: () => void;
}

export const CreateShelterForm = ({ onSuccess }: CreateShelterFormProps) => {
  const { mutate: createShelter, isPending } = useMutation({
    mutationFn: (input: CreateAnimalShelterInput) =>
      apiClient.animalShelters.create(input),
    onSuccess,
    successMessage: "Shelter created successfully!",
  });

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      description: "",
      email: "",
      websiteUrl: "",
      imageUrl: "",
      address: "",
      phone: "",
    },
    onSubmit: ({ value }) => {
      createShelter(value);
    },
    validators: {
      onChange: shelterSchema,
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleSubmit();
      }}
    >
      <Fieldset.Root>
        <Grid
          gridTemplateColumns={{
            base: "1fr",
            md: "1fr 1fr",
          }}
          gap={4}
        >
          <Field
            name="name"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Shelter Name
                </FormControl.Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter shelter name"
                  colorPalette="orange"
                />
                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="email"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Email Address
                </FormControl.Label>
                <Input
                  id={field.name}
                  type="email"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter shelter email"
                  colorPalette="orange"
                />
                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="websiteUrl"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Website URL
                </FormControl.Label>
                <Input
                  id={field.name}
                  type="url"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter website URL"
                  colorPalette="orange"
                />
                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="imageUrl"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Image URL
                </FormControl.Label>
                <Input
                  id={field.name}
                  type="url"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter image URL"
                  colorPalette="orange"
                />
                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="address"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Address
                </FormControl.Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter shelter address"
                  colorPalette="orange"
                />
                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="phone"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Phone Number
                </FormControl.Label>
                <Input
                  id={field.name}
                  type="tel"
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter phone number"
                  colorPalette="orange"
                />
                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />

          <Field
            name="description"
            children={(field) => (
              <FormControl.Root>
                <FormControl.Label htmlFor={field.name}>
                  Description
                </FormControl.Label>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(event) => field.handleChange(event.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Enter shelter description"
                  colorPalette="orange"
                  rows={4}
                />
                <FormFieldError state={field.state} />
              </FormControl.Root>
            )}
          />
        </Grid>

        <Button
          color="white"
          fontWeight="bold"
          width="full"
          type="submit"
          colorPalette="orange"
          loading={isPending}
          loadingText="Creating Shelter..."
        >
          Create Shelter
        </Button>
      </Fieldset.Root>
    </form>
  );
};
