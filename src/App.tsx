import { Center, VStack } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import SummaryHeader from "./components/SummaryHeader";
import ViewNavigation from "./components/ViewNavigation";
import Timeline from "./components/Timeline";
import Category from "./components/Category";
import Analytics from "./components/Analytics";

function App() {
  const [view, setView] = useState("Timeline");

  function ViewShown(): ReactElement {
    switch (view) {
      case "Timeline":
        return <Timeline />;
      case "Category":
        return <Category />;
      case "Analytics":
        return <Analytics />;
      default:
        return <Timeline />;
    }
  }

  return (
    <Center
      bg="yellow.100"
      minH="100vh"
      width="100vw"
      padding={{ base: 2, md: 10 }}
    >
      <VStack minW="100px" maxW="800px" gap={{ base: "10px", md: "30px" }}>
        <SummaryHeader />
        <ViewNavigation setView={setView} />
        <ViewShown />
      </VStack>
    </Center>
  );
}

export default App;
