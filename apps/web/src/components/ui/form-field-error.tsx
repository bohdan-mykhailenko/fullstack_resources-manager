import { Em, Show } from "@chakra-ui/react";
import { AnyFieldApi } from "@tanstack/react-form";

interface FieldInfoProps<TState extends AnyFieldApi["state"]> {
  state: TState;
}

export const FormFieldError = <TState extends AnyFieldApi["state"]>({
  state,
}: FieldInfoProps<TState>) => {
  return (
    <Show when={state.meta.isTouched && state.meta.errors?.length}>
      <Em fontSize="xs" color="red.500">
        {state.meta.errors.map((error) => error.message)[0]}
      </Em>
    </Show>
  );
};
