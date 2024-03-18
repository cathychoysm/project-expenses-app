import { Card, CardBody, Stack, Text } from "@chakra-ui/react";
import { TotalCardProps } from "../react-app-env";

export default function TotalsCard({ heading, number, color }: TotalCardProps) {
  return (
    <Card width={{ base: "120px", md: "180px" }}>
      <CardBody padding={{ base: 3, md: 5 }}>
        <Stack alignItems="flex-start" gap={0}>
          <Text fontSize={12}>{heading}</Text>
          <Text fontSize={{ base: 20, md: 24 }} fontWeight={700} color={color}>
            ${number}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}
