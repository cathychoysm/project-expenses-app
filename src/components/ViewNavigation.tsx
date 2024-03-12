import {
  Box,
  Center,
  HStack,
  UseRadioProps,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";
import { ReactElement } from "react";

interface RadioCardProps extends UseRadioProps {
  children: string;
}
function RadioCard(props: RadioCardProps): ReactElement {
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
      >
        {props.children}
      </Center>
    </Box>
  );
}

interface ViewNavigationProps {
  setView: React.Dispatch<React.SetStateAction<string>>;
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
