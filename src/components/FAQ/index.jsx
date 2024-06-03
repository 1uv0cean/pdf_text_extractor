import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

const FAQ = () => {
  return (
    <Box mt={5}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions (FAQ)
      </Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            How to Extract Text from PDF Files?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            Extracting text from PDF files can be done using various tools and
            methods:
          </Typography>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            Using PDF Readers and Editors:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Adobe Acrobat Reader"
                secondary="Offers text highlighting, copying, and advanced features in Acrobat Pro DC."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Foxit Reader"
                secondary="Provides text extraction functionalities similar to Adobe."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Nitro PDF Reader"
                secondary="Supports text extraction with a user-friendly interface."
              />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            Online PDF Text Extraction Tools:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Smallpdf"
                secondary="Upload your PDF and use the text extraction feature."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="PDF2Go"
                secondary="Supports multiple formats and batch processing."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="ILovePDF"
                secondary="Known for its user-friendly interface."
              />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            Dedicated Software for Text Extraction:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="ABBYY FineReader"
                secondary="Renowned for OCR capabilities, converting PDFs into editable formats."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Readiris"
                secondary="Supports PDF text extraction with various output formats."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Tesseract OCR"
                secondary="An open-source engine for automated text extraction."
              />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            Programming Libraries:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="PDF.js"
                secondary="A JavaScript library for rendering PDFs in a web browser."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="PyMuPDF (fitz)"
                secondary="A Python library for extracting text from PDFs."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Apache PDFBox"
                secondary="A Java library for working with PDFs."
              />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            OCR (Optical Character Recognition) for Image-Based PDFs:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Google Cloud Vision"
                secondary="A cloud-based OCR service for various image formats."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Microsoft Azure Computer Vision"
                secondary="Similar to Google’s service."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Tesseract OCR"
                secondary="Supports multiple languages and customization."
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">What is OCR?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" paragraph>
            OCR (Optical Character Recognition) is a technology that converts
            different types of documents, such as scanned paper documents, PDF
            files, or images captured by a digital camera, into editable and
            searchable data. Here’s a detailed explanation:
          </Typography>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            History and Development:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Early Days"
                secondary="Initially developed to assist the visually impaired."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Advancements"
                secondary="Evolved significantly with AI and machine learning."
              />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            How OCR Works:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Image Preprocessing"
                secondary="Enhances image quality."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Text Recognition"
                secondary="Uses pattern recognition and machine learning algorithms."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Post-Processing"
                secondary="Ensures accuracy and usability."
              />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            Applications of OCR:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Document Digitization"
                secondary="Makes documents searchable and editable."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Data Entry Automation"
                secondary="Reduces manual typing and errors."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Assistive Technology"
                secondary="Converts text into speech or Braille."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Invoice and Receipt Processing"
                secondary="Streamlines financial record-keeping."
              />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            Types of OCR:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Zonal OCR"
                secondary="Focuses on specific areas of a document."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Full-Page OCR"
                secondary="Recognizes text from the entire page."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Intelligent Character Recognition (ICR)"
                secondary="Recognizes handwritten text."
              />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            OCR Tools and Software:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Tesseract"
                secondary="Open-source engine supporting over 100 languages."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="ABBYY FineReader"
                secondary="High accuracy and ease of use."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Adobe Acrobat Pro DC"
                secondary="Built-in OCR capabilities."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Google Cloud Vision and Microsoft Azure Computer Vision"
                secondary="Robust text recognition with cloud integration."
              />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            Challenges and Limitations:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Accuracy"
                secondary="Affected by image quality."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Complex Layouts"
                secondary="Challenges with multi-column formats and mixed content."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Language and Font Variations"
                secondary="Requires training for different languages and fonts."
              />
            </ListItem>
          </List>
          <Divider />
          <Typography variant="subtitle1" gutterBottom>
            Future of OCR:
          </Typography>
          <List dense>
            <ListItem>
              <ListItemText
                primary="Artificial Intelligence"
                secondary="Integration of AI improves accuracy and efficiency."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Real-Time OCR"
                secondary="Mobile apps for instant text recognition."
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Cloud-Based Services"
                secondary="Offer scalability and easy integration."
              />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
