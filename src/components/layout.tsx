import { VStack } from "@chakra-ui/react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <VStack bg="gray.100" padding={0} margin={0}>
      {children}
    </VStack>
  );
}