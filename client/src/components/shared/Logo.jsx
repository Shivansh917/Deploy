import { Box, Text, Flex, useColorModeValue } from "@chakra-ui/react";

const Logo = () => {
  const textColor = useColorModeValue("gray.800", "gray.200");
  const shadowColor = useColorModeValue(
    "rgba(0, 0, 0, 0.3)",
    "rgba(255, 255, 255, 0.3)"
  );

  return (
    <Flex align="center" justify="center" position="fixed" mt={4} bg="white">
      <Box position="relative" display="inline-block">
        <Text
          fontSize="4xl"
          fontWeight="bold"
          color={textColor}
          textShadow={`2px 2px ${shadowColor}`}
          lineHeight="1"
          textAlign="center"
        >
          MERN
        </Text>

        <Text
          fontSize="sm"
          fontWeight="medium"
          color={textColor}
          textShadow={`1px 1px ${shadowColor}`}
          textAlign="center"
          mt={1}
        >
          CRM
        </Text>
      </Box>
    </Flex>
  );
};

export default Logo;