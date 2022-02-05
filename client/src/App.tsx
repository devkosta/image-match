import { useState } from "react";
import { FileWithPath } from "react-dropzone";
import axios from "axios";
 
import Layout from "./components/Layout";
import ImageDrop from "./components/ImageDrop";
import {
	VStack,
	HStack,
	Box,
	IconButton,
	useToast
} from "@chakra-ui/react";
import { BsArrowRightShort } from "react-icons/bs";

const App = () => {
	const [currentFiles, setCurrentFiles] = useState<FileWithPath[]>([]);
	const toast = useToast();	

	const importFile = (files: FileWithPath[]) => {
		for (let i = 0; i < files.length; i ++) {
			if (files[i].type !== "image/png" && files[i].type !== "image/jpeg") {
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
		}

		for (let i = 0; i < currentFiles.length; i++) {
			if (currentFiles[i]) {
				const formData = new FormData();
				formData.append("image", currentFiles[i], currentFiles[i].name);

				axios.post("http://localhost:5000/api/upload", formData)
					.then((res) => {
						const metadata = res.data;
						console.log(metadata);
					})
					.catch((err) => {
						console.error(err);
					});
			}
		}
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
							key={file.name}
							isTruncated
						>
							<Box as="span" fontWeight={600}>
								Selected:
							</Box>
							{" "}{file.name}
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
		</Layout>
	);
};

export default App;