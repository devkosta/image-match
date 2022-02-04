import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import {
    Center,
    Icon,
    Text
} from "@chakra-ui/react";
import { AiFillFileAdd, AiFillRocket } from "react-icons/ai";

interface IProps {
    onFileAccepted: ((file: File) => void);
    isError: boolean;
}

const ImageDrop: FC<IProps> = ({ onFileAccepted, isError }) => {
    const onDrop = useCallback((file) => {
        onFileAccepted(file[0]);
    }, [onFileAccepted]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, maxFiles: 1, multiple: false,
    });

    const defaultText = isDragActive
        ? "Time to Drop!"
        : "Click to Select a File or Drop It Here...";

    const errorText = isDragActive
        ? "Let’s Try That Again!"
        : "There was an Error. Please ensure the file is either a JPEG or PNG.";

    return (
        <Center
            w="100%"
            p={10}
            cursor="pointer"
            borderRadius={20}
            border="2px"
            borderColor={isError ? "red.500" : "gray.400"}
            bg={isDragActive ? "gray.100" : "transparent"}
            _hover={{ bg: "gray.100" }}
            transition="background-color 0.2s ease"
            {...getRootProps()}
        >
            <input {...getInputProps()} />

            {isDragActive
                ? <Icon as={AiFillRocket} mr={2} />
                : <Icon as={AiFillFileAdd} mr={2} />
            } 

            {isError
                ? <Text>{errorText}</Text>
                : <Text>{defaultText}</Text>
            }
        </Center>
    );
};

export default ImageDrop;