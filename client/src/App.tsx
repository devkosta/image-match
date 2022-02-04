import { useState } from "react";

import Layout from "./components/Layout";
import ImageDrop from "./components/ImageDrop";
import { VStack, Box } from "@chakra-ui/react";

const App = () => {
	const [error, setError] = useState(false);
	const [currentFile, setCurrentFile] = useState<File>();
	
	const importFile = (file: File) => {
		if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
			setError(true);
			throw new Error(
				`File type ${file.type} not accepted. Please upload either a PNG or JPEG file.`
			);
		}
		
		setError(false);
		setCurrentFile(file);
	};

	return (
		<Layout>
			<VStack w="100%" spacing={6}>
				<Box
					px={3}
					py={2}
					rounded="2xl"
					bg="green.100"
				>
					<Box as="span" fontWeight={600}>
						Selected:
					</Box>
					{" "}{currentFile ? currentFile.name : 'None'}
				</Box>
				<ImageDrop onFileAccepted={importFile} isError={error} />
			</VStack>
		</Layout>
	);
};

export default App;