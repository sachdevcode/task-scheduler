import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import request from "../utils/request";
import { useQuery } from "@tanstack/react-query";

export interface Task {
  id: number;
  type: string;
  time: string; // ISO string format for Date
  status: string;
  createdAt: string; // ISO string format for Date
  updatedAt: string; // ISO string format for Date
}

const getTask = async () => {
  const response = await request({ method: "GET", url: "/task" });
  return response;
};

const TaskTable = () => {
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ["task"],
    queryFn: getTask,
  });

  if (isLoading) return <Spinner />;

  return (
    <>
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>Type</Th>
              <Th>Time</Th>
              <Th>Status</Th>
              <Th>Created At</Th>
              <Th>Updated At</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks && tasks?.length > 1 ? (
              tasks?.map((task) => (
                <Tr key={task.id}>
                  <Td>{task.type}</Td>
                  <Td>{task.time}</Td>
                  <Td>{task.status}</Td>
                  <Td>{task.createdAt}</Td>
                  <Td>{task.updatedAt}</Td>
                </Tr>
              ))
            ) : (
              <Text>No task Yet</Text>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TaskTable;
