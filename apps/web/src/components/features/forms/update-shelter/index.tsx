import {
  Button,
  Fieldset,
  Field as FormControl,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";

import { apiClient } from "@/api";
import { useMutation } from "@/api/hooks/useMutation";
import { AnimalShelterOutput } from "@/api/services/animal-shelters/core/interfaces";
import { FormFieldError } from "@/components/ui";

import { updateShelterSchema } from "./validation";

interface UpdateShelterFormProps {
  shelter: AnimalShelterOutput;
  onSuccess: () => void;
}

export const UpdateShelterForm = ({
  shelter,
  onSuccess,
}: UpdateShelterFormProps) => {
  const { mutate: updateShelter, isPending } = useMutation({
    mutationFn: (input: Partial<AnimalShelterOutput>) =>
      apiClient.animalShelters.update(shelter.id, input),
    onSuccess,
    successMessage: "Shelter updated successfully!",
  });

  const { Field, handleSubmit } = useForm({
    defaultValues: {
      name: shelter.name,
      description: shelter.description,
      email: shelter.email,
      website_url: shelter.website_url,
      image_url: shelter.image_url,
      address: shelter.address,
      phone: shelter.phone,
    },
    onSubmit: ({ value }) => {
      updateShelter(value);
    },
    validators: {
      onChange: updateShelterSchema,
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
        <VStack spaceY={4}>
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
            name="website_url"
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
            name="image_url"
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

          <Button
            color="white"
            fontWeight="bold"
            width="full"
            type="submit"
            colorPalette="orange"
            loading={isPending}
            loadingText="Updating Shelter..."
          >
            Update Shelter
          </Button>
        </VStack>
      </Fieldset.Root>
    </form>
  );
};
