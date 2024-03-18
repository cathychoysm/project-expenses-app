import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import CategoryItemList from "./CategoryItemList";

export default function Category() {
  return (
    <Tabs
      variant="soft-rounded"
      align="center"
      colorScheme="yellow"
      width="full"
      minH={{ md: 800 }}
      bg="yellow.300"
      paddingX={{ base: "0px", md: "30px" }}
      paddingY={{ base: "10px", md: "30px" }}
      borderRadius={10}
    >
      <TabList>
        <Tab fontSize={{ base: "sm", md: "md" }}>Expenses</Tab>
        <Tab fontSize={{ base: "sm", md: "md" }}>Incomes</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <CategoryItemList type="expenses" />
        </TabPanel>
        <TabPanel>
          <CategoryItemList type="incomes" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
