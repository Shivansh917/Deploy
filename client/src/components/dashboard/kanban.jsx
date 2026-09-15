import {
  Box,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";

import { useGetDealsListQuery } from "@/features/api/deals";

const kanbanStages = [
  {
    key: "New Lead",
    title: "Lead",
  },
  {
    key: "Qualified Lead",
    title: "Contacted",
  },
  {
    key: "In Draft",
    title: "Proposal",
  },
  {
    key: "Proposal Sent",
    title: "Proposal Sent",
  },
  {
    key: "Negotiation",
    title: "Negotiation",
  },
];

const getDealId = (deal) => deal?._id || deal?.id;

const getDealTitle = (deal) =>
  deal?.title || deal?.name || "Untitled Deal";

const getDealAmount = (deal) =>
  Number(deal?.amount || 0).toLocaleString("en-IN");

const getDealDate = (deal) => {
  const date = deal?.closingDate || deal?.createdAt;

  if (!date) {
    return "No date";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "No date";
  }

  return parsedDate.toLocaleDateString("en-IN");
};

const getDealAssignee = (deal) => {
  if (typeof deal?.assignee === "string") {
    return deal.assignee;
  }

  return deal?.assignee?.name || "";
};

const getDealCompany = (deal) => {
  if (typeof deal?.company === "string") {
    return deal.company;
  }

  return deal?.company?.name || "No company";
};

const KanbanBoard = () => {
  const {
    data: deals = [],
    isLoading,
    isError,
  } = useGetDealsListQuery();

  if (isLoading) {
    return (
      <Box p={6}>
        <Text fontSize="lg" fontWeight="bold">
          Loading deals...
        </Text>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={6}>
        <Text fontSize="lg" fontWeight="bold">
          Unable to load deals.
        </Text>

        <Text mt={2} color="gray.600">
          Please check the Deals module and try again.
        </Text>
      </Box>
    );
  }

  return (
    <Box w="full" p={4} overflowX="auto">
      <Box mb={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Sales Kanban
        </Text>

        <Text mt={1} color="gray.600">
          Manage and track your deals through every sales stage.
        </Text>
      </Box>

      <Grid
        templateColumns="repeat(5, minmax(240px, 1fr))"
        gap={4}
        minW="1250px"
      >
        {kanbanStages.map((stage) => {
          const stageDeals = deals.filter(
            (deal) => deal?.stage === stage.key
          );

          const stageValue = stageDeals.reduce(
            (total, deal) =>
              total + Number(deal?.amount || 0),
            0
          );

          return (
            <GridItem key={stage.key}>
              <Box
                bg="gray.100"
                borderRadius="md"
                p={3}
                minH="500px"
                border="1px solid"
                borderColor="gray.200"
              >
                {/* Column Header */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={3}
                >
                  <Text fontWeight="bold">
                    {stage.title}
                  </Text>

                  <Box
                    bg="white"
                    px={2}
                    py={1}
                    borderRadius="full"
                    fontSize="sm"
                  >
                    {stageDeals.length}
                  </Box>
                </Box>

                <Text
                  fontSize="xs"
                  color="gray.600"
                  mb={3}
                >
                  Pipeline: ₹
                  {stageValue.toLocaleString("en-IN")}
                </Text>

                {/* Deals */}
                {stageDeals.length === 0 ? (
                  <Box
                    bg="white"
                    border="1px dashed"
                    borderColor="gray.300"
                    borderRadius="md"
                    p={4}
                    textAlign="center"
                  >
                    <Text
                      fontSize="sm"
                      color="gray.500"
                    >
                      No deals
                    </Text>
                  </Box>
                ) : (
                  stageDeals.map((deal) => (
                    <Box
                      key={getDealId(deal)}
                      bg="white"
                      borderRadius="md"
                      p={4}
                      mb={3}
                      boxShadow="sm"
                      border="1px solid"
                      borderColor="gray.200"
                    >
                      <Text
                        fontWeight="600"
                        fontSize="md"
                        mb={2}
                      >
                        {getDealTitle(deal)}
                      </Text>

                      <Text
                        fontWeight="bold"
                        fontSize="lg"
                        mb={2}
                      >
                        ₹{getDealAmount(deal)}
                      </Text>

                      <Text
                        fontSize="sm"
                        color="gray.600"
                        mb={1}
                      >
                        {getDealCompany(deal)}
                      </Text>

                      <Text
                        fontSize="sm"
                        color="gray.600"
                        mb={1}
                      >
                        {getDealDate(deal)}
                      </Text>

                      {getDealAssignee(deal) && (
                        <Text
                          fontSize="sm"
                          color="gray.600"
                        >
                          {getDealAssignee(deal)}
                        </Text>
                      )}
                    </Box>
                  ))
                )}
              </Box>
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
};

export default KanbanBoard;