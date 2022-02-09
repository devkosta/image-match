import React, { useState } from "react";
import { FileWithPath } from "react-dropzone";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { dataToHash, hammDist } from "./utils/perceptualHash";

import Layout from "./components/Layout";
import ImageDrop from "./components/ImageDrop";
import {
	VStack,
	HStack,
	Box,
	IconButton,
    Button,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure,
	useToast
} from "@chakra-ui/react";
import { BsArrowRightShort } from "react-icons/bs";

const App = () => {
    const [currentFiles, setCurrentFiles] = useState<FileWithPath[]>([]);
    const [hashes, setHashes] = useState<string[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const importFile = (files: FileWithPath[]) => {
        for (let i = 0; i < files.length; i++) {
            if (
                files[i].type !== "image/png" &&
                files[i].type !== "image/jpeg"
            ) {
                toast({
                    description: `File type ${files[i].type} not accepted. Please upload either a PNG or JPEG file.`,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                    position: "top",
                });

                return;
            }
        }

        setCurrentFiles(currentFiles.concat(files));
    };

    const handleButtonClick = () => {
        if (currentFiles.length !== 2) {
            toast({
                description: `Uploaded ${currentFiles.length} files. You must upload 2 files.`,
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top",
            });

            return;
        }

        for (let i = 0; i < currentFiles.length; i++) {
            if (currentFiles[i]) {
                const formData = new FormData();
                formData.append("image", currentFiles[i], currentFiles[i].name);

                axios.post("http://localhost:5000/api/upload", formData)
                    .then((res) => {
                        setHashes(hashes => [...hashes, dataToHash(res.data.data.data)]);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        }

        onOpen();
    };

    const handleResults = (): JSX.Element => {
        let result = 0;
        let resultPercent = 0;
        let resultStr = "";

        if (hashes[0] && hashes[1]) {
            result = hammDist(hashes[0], hashes[1]);
            resultPercent = (1 - (result / 16)) * 100;
        }

        if (result == 0) {
            resultStr = "These images are likely to be exactly the same!";
        }
        else if (result > 0 && result <= 2) {
            resultStr = "These images are very similar, but likely not exactly the same.";
        }
        else if (result > 2 && result <= 5) {
            resultStr = "These images are similar, but there are likely some differences.";
        }
        else if (result > 5 && result <= 10) {
            resultStr = "These images could be similar.";
        }
         else if (result > 10 && result <= 16) {
            resultStr = "These images are likely not the same.";
        }

        return (
            <React.Fragment>
                <Text fontSize="xl">{resultPercent}% Similar.</Text>
                <Text fontSize="xl">{result} Different Bits.</Text>
                <br />
                <Text fontSize="xl">{resultStr}</Text>
            </React.Fragment>
        );
    };
	
	return (
        <Layout>
            <VStack w="100%" spacing={6}>
                <ImageDrop onFileAccepted={importFile} />
                <HStack maxW="100%">
                    {currentFiles.map((file) => (
                        <Box
                            px={3}
                            py={2}
                            rounded="md"
                            bg="green.100"
                            key={uuidv4()}
                            isTruncated
                        >
                            <Box as="span" fontWeight={600}>
                                Selected:
                            </Box>{" "}
                            {file.name}
                        </Box>
                    ))}
                    <IconButton
                        aria-label="Start"
                        colorScheme="blue"
                        icon={<BsArrowRightShort size={26} />}
                        onClick={handleButtonClick}
                    />
                </HStack>
            </VStack>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent maxW="container.sm" overflowY="scroll"> 
                    <ModalHeader px={4} py={3} fontFamily="inter">Results</ModalHeader>
                    <ModalBody px={4}>
                        {handleResults()}
                    </ModalBody>
                    <ModalFooter px={4} py={3}>
                        <Button colorScheme='blue' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Layout>
    );
};

export default App;
