import { FC, ReactNode } from "react";

import { Container, Flex } from "@chakra-ui/react";

interface IProps {
    children: ReactNode;
}

const Layout: FC<IProps> = ({ children }) => {
    return (
        <Container maxW="container.md">
            <Flex h="100vh" alignItems="center">
                {children}
            </Flex>
        </Container>
    );
};

export default Layout;