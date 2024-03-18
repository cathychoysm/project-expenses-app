import { Box, Center, HStack, useRadio, useRadioGroup } from "@chakra-ui/react";
import { RadioCardProps, ViewNavigationProps } from "../react-app-env";

function RadioCard(props: RadioCardProps) {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Center
        {...checkbox}
        cursor="pointer"
        width={100}
        height={50}
        borderRadius={10}
        _checked={{ bg: "orange", fontWeight: "700" }}
        _focus={{ bg: "orange", fontWeight: "700" }}
        fontSize={{ base: "sm", md: "md" }}
      >
        {props.children}
      </Center>
    </Box>
  );
}

export default function ViewNavigation({ setView }: ViewNavigationProps) {
  const handleChange = (value: string) => {
    setView(value);
  };

  const options = ["Timeline", "Category", "Analytics"];
  const { getRootProps, getRadioProps } = useRadioGroup({
    defaultValue: "Timeline",
    onChange: handleChange,
  });

  const group = getRootProps();

  return (
    <HStack {...group} width="full" justifyContent="space-around">
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        );
      })}
    </HStack>
  );
}
