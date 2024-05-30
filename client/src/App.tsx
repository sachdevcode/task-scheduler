import { Box, Button, ChakraProvider } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import TaskTable from "./components/TaskTable";
import LogsTable from "./components/LogsTable";

function App() {
  return (
    <Box paddingX={40} paddingY={10}>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button colorScheme="teal">Schedule Task</Button>
      </Box>
      <Tabs alignItems={"center"}>
        <TabList>
          <Tab>Tasks</Tab>
          <Tab>Logs</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <TaskTable />
          </TabPanel>
          <TabPanel>
            <LogsTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;
