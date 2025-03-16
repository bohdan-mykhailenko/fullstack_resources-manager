import { Alert } from "@chakra-ui/react";

interface ErrorAlertProps {
  title: string;
  description: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  title,
  description,
}) => {
  return (
    <Alert.Root status="error">
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Title>{title}</Alert.Title>

        <Alert.Description>{description}</Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
};
