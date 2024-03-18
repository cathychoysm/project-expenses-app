import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TimelineItemList from "./TimelineItemList";

export default function Timeline() {
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
          <TimelineItemList type="expenses" />
        </TabPanel>
        <TabPanel>
          <TimelineItemList type="incomes" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
