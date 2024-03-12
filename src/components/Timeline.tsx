import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import TimelineItemList from "./TimelineItemList";

export default function Timeline() {
  return (
    <Tabs
      variant="soft-rounded"
      align="center"
      colorScheme="yellow"
      width="full"
      minH={800}
      bg="yellow.300"
      padding={30}
      borderRadius={10}
    >
      <TabList>
        <Tab>Expenses</Tab>
        <Tab>Incomes</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <TimelineItemList tab="expenses" />
        </TabPanel>
        <TabPanel>
          <TimelineItemList tab="incomes" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
