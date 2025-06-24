import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import { motion } from "framer-motion";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PDFPreview() {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState(null);

  useEffect(() => {
    const fetchDoc = async () => {
      const token = localStorage.getItem("token");
      const res = await API.get("/docs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const found = res.data.find((d) => d._id === id);
      setDoc(found);
      setLoading(false);
    };
    fetchDoc();
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
       
        <motion.div
          className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <span className="text-amber-500 font-semibold text-lg">
          Loading PDF...
        </span>
      </div>
    );

  if (!doc)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <span className="text-4xl mb-2">❌</span>
        <span className="text-gray-600 text-lg">Document not found.</span>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-100 flex flex-col items-center py-10 px-2">
      {/* Add your Navbar here if needed */}
      <h2 className="text-2xl md:text-3xl font-bold text-amber-600 mb-4 text-center break-all">
        {doc.originalname}
      </h2>
      <motion.div
        className="bg-white/90 rounded-2xl shadow-xl p-6 max-w-2xl w-full flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div
          className="w-full max-h-[70vh] overflow-auto rounded-lg border border-amber-100 bg-gray-50 p-2 custom-scrollbar"
          style={{ scrollbarColor: "#f59e42 #fef3c7", scrollbarWidth: "thin" }}
        >
          <Document
            file={`http://localhost:5000/${doc.filepath}`}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div className="text-center py-8">Loading PDF...</div>}
            error={
              <div className="text-center py-8 text-red-500">
                Failed to load PDF.
              </div>
            }
          >
            {Number.isFinite(numPages) &&
              numPages > 0 &&
              Array.from({ length: numPages }).map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <div key={`page_${pageNumber}`} className="page-container">
                    <Page
                      pageNumber={pageNumber}
                      width={580}
                      className="mx-auto my-4 shadow"
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                    />
                  </div>
                );
              })}
          </Document>
        </div>
      </motion.div>
    </div>
  );
}

