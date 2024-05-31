import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      title: "PDF Text Extractor",
      dragAndDrop: "Drag & drop a PDF file here, or click to select one",
      selectPDF: "Select PDF File",
      uploadedFile: "Uploaded file:",
      error: "Only PDF files are allowed.",
      extractedText: "Extracted Text",
    },
  },
  ko: {
    translation: {
      title: "PDF 텍스트 추출기",
      dragAndDrop: "여기에 PDF 파일을 드래그 앤 드롭하거나 파일을 선택하세요",
      selectPDF: "PDF 파일 선택",
      uploadedFile: "업로드된 파일:",
      error: "PDF 파일만 허용됩니다.",
      extractedText: "추출된 텍스트",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // 기본 언어 설정
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
