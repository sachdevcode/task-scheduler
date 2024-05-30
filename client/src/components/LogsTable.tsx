import {
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import request from "../utils/request";
import { useQuery } from "@tanstack/react-query";

export interface ExecutionLog {
  id: string;
  taskId: string;
  executionTime: string;
  status: string;
  message: string;
  createdAt?: string;
}

const getLogs = async () => {
  const response = await request({ method: "GET", url: "/task/logs" });
  return response;
};
const LogsTable = () => {
  const { data: logs, isLoading } = useQuery<ExecutionLog[]>({
    queryKey: ["logs"],
    queryFn: getLogs,
  });

  if (isLoading) return <Spinner />;
  return (
    <TableContainer>
      <Table colorScheme="teal">
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
          {logs && logs?.length > 1 ? (
            logs?.map((task) => (
              <Tr key={task.id}>
                <Td>{task.taskId}</Td>
                <Td>{task.executionTime}</Td>
                <Td
                  backgroundColor={
                    task.status.startsWith("s") ? "lightgreen" : "lightcoral"
                  }
                >
                  {task.status}
                </Td>
                <Td>{task.message}</Td>
                <Td>{task.createdAt}</Td>
              </Tr>
            ))
          ) : (
            <Text>No logs Yet</Text>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default LogsTable;
