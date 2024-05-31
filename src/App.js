import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

function App() {
  const [text, setText] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      return;
    }

    setError("");
    setFileName(file.name);
    setFileUrl(URL.createObjectURL(file));

    const reader = new FileReader();

    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const loadingTask = pdfjsLib.getDocument({ data: typedArray });

      loadingTask.promise
        .then(async (pdf) => {
          let extractedText = "";

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item) => item.str)
              .join(" ");
            extractedText += pageText + "\n";
          }

          setText(extractedText);
        })
        .catch((err) => {
          console.error("Error loading PDF:", err);
        });
    };

    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Typography variant="h3" gutterBottom>
          PDF Text Extractor
        </Typography>
        <Box
          {...getRootProps()}
          border="2px dashed #000"
          padding="20px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginBottom="20px"
          width="100%"
        >
          <input {...getInputProps()} />
          <CloudUploadIcon style={{ fontSize: "50px", color: "#3f51b5" }} />
          <Typography variant="body1" gutterBottom>
            Drag & drop a PDF file here, or click to select one
          </Typography>
          <Button variant="contained" color="primary">
            Select PDF File
          </Button>
          {error && <Typography color="error">{error}</Typography>}
          {fileName && (
            <Typography variant="body2" gutterBottom>
              Uploaded file: {fileName}
            </Typography>
          )}
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {fileUrl && (
              <Box border="1px solid #ccc" height="490px" overflow="auto">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                  <Viewer fileUrl={fileUrl} />
                </Worker>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Extracted Text"
              multiline
              rows={20}
              value={text}
              variant="outlined"
              fullWidth
              readOnly
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
