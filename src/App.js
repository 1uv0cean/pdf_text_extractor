import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import * as pdfjsLib from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import Tesseract from "tesseract.js";
import i18n from "./i18n";

function App() {
  const { t } = useTranslation();
  const [text, setText] = useState([]);
  const [fileUrl, setFileUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [language, setLanguage] = useState(i18n.language);
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage);
  };

  const preprocessImage = (canvas) => {
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // 이미지 전처리: 흑백 변환 및 대비 증가
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      const contrast = avg > 128 ? 255 : 0;
      data[i] = contrast;
      data[i + 1] = contrast;
      data[i + 2] = contrast;
    }

    ctx.putImageData(imageData, 0, 0);
  };

  const onDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file.type !== "application/pdf") {
      setError(t("error"));
      return;
    }

    setError("");
    setFileName(file.name);
    setFileUrl(URL.createObjectURL(file));
    setIsLoading(true);

    const reader = new FileReader();

    reader.onload = async () => {
      const typedArray = new Uint8Array(reader.result);
      const loadingTask = pdfjsLib.getDocument({ data: typedArray });

      loadingTask.promise
        .then(async (pdf) => {
          const extractedTexts = [];

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item) => item.str)
              .join(" ");
            extractedTexts.push(`Page ${i}: \n${pageText}`);

            const viewport = page.getViewport({ scale: 1 });
            const canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const context = canvas.getContext("2d");

            await page.render({
              canvasContext: context,
              viewport: viewport,
            }).promise;

            preprocessImage(canvas);
            const dataURL = canvas.toDataURL();

            // Perform OCR on the image with multiple languages
            const result = await Tesseract.recognize(
              dataURL,
              language === "ko" ? "kor" : "eng",
              {
                logger: (m) => console.log(m),
                tessedit_char_whitelist:
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789가나다라마바사아자차카타파하",
                preserve_interword_spaces: 1,
              }
            );
            extractedTexts.push(result.data.text);
          }

          setText(extractedTexts);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error loading PDF:", err);
          setIsLoading(false);
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
          {t("title")}
        </Typography>
        <FormControl
          variant="outlined"
          style={{ marginBottom: "20px", width: "200px" }}
        >
          <InputLabel id="language-select-label">{t("language")}</InputLabel>
          <Select
            labelId="language-select-label"
            id="language-select"
            value={language}
            onChange={handleLanguageChange}
            label={t("language")}
          >
            <MenuItem value="en">English</MenuItem>
            <MenuItem value="ko">한국어</MenuItem>
          </Select>
        </FormControl>
        <Helmet>
          <title>{t("title")}</title>
          <meta
            name="description"
            content="Extract text from PDF files using this simple online tool."
          />
          <meta
            name="keywords"
            content="PDF text extractor, extract text from PDF, PDF OCR, online PDF tool"
          />
        </Helmet>
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
            {t("dragAndDrop")}
          </Typography>
          <Button variant="contained" color="primary">
            {t("selectPDF")}
          </Button>
          {error && <Typography color="error">{error}</Typography>}
          {fileName && (
            <Typography variant="body2" gutterBottom>
              {t("uploadedFile")} {fileName}
            </Typography>
          )}
        </Box>
        {isLoading ? (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="200px"
          >
            <CircularProgress />
            <Typography variant="body1" style={{ marginTop: "20px" }}>
              {t("loading")}
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              {fileUrl && (
                <Box border="1px solid #ccc" height="720px" overflow="auto">
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
                    <Viewer fileUrl={fileUrl} />
                  </Worker>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              {text.map((pageText, index) => (
                <TextField
                  key={index}
                  label={`${t("extractedText")} ${index + 1}`}
                  multiline
                  rows={10}
                  value={pageText}
                  variant="outlined"
                  fullWidth
                  readOnly
                  style={{ marginBottom: "20px" }}
                />
              ))}
            </Grid>
          </Grid>
        )}
      </Box>
    </Container>
  );
}

export default App;
