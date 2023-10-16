import { Icon } from "@chakra-ui/react";

export const Dot = () => {
  return (
    <Icon viewBox="0 0 200 200" color="gray.700" w={2} h={2}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );
};
