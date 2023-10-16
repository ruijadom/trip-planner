import { Container, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <VStack bg="gray.100" minHeight="100vh" padding={0} margin={0}>
      <Container
        maxW="7xl"
        py="12"
        px={{
          base: 4,
          md: 6,
          lg: 8,
        }}
      >
        <Outlet />
      </Container>
    </VStack>
  );
};
