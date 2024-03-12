import { Card, CardBody, Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";

interface TotalProps {
  heading: string;
  number: string;
  color: string;
}

export default function TotalsCard({
  heading,
  number,
  color,
}: TotalProps): ReactElement {
  return (
    <Card w="200px">
      <CardBody>
        <VStack alignItems="flex-start" gap={0}>
          <Text fontSize={12}>{heading}</Text>
          <Text fontSize={24} fontWeight={700} color={color}>
            ${number}
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}
