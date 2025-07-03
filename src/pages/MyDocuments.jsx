import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { Download, Eye, Trash2 } from "lucide-react";

export default function MyDocuments() {
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/docs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDocs(res.data);
      } catch (err) {
        console.error("Error fetching documents", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowAlert(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/docs/${deleteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Document deleted!");
      setDocs(docs.filter((doc) => doc._id !== deleteId));
    } catch (err) {
      console.error("Error deleting document", err);
      toast.error("Failed to delete document");
    } finally {
      setShowAlert(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setShowAlert(false);
    setDeleteId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f5f0] via-[#f5ede3] to-white">
      <Navbar />
      <div className="flex flex-col items-center mt-8">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-2 text-[#a68a64] drop-shadow"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          📄 My Uploaded PDFs
        </motion.h2>
        <p className="text-[#7c6f57] mb-6 text-center max-w-xl">
          All your uploaded documents are listed below. Click{" "}
          <span className="font-semibold text-[#bfa77a]">Preview</span> to view
          or sign your PDF.
        </p>
      </div>
      <div className="max-w-2xl mx-auto px-2 pb-12">
        {loading ? (
          <div className="text-center text-[#bfa77a] py-12 text-lg">
            Loading...
          </div>
        ) : docs.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-6xl mb-4">📂</span>
            <p className="text-[#a68a64] text-lg">
              No documents found. Try uploading one!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {docs.map((doc, idx) => (
              <motion.div
                key={doc._id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between bg-white/90 border border-[#e7dbc7] rounded-2xl shadow-lg hover:shadow-[#bfa77a]/30 transition backdrop-blur-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
              >
                <div>
                  <p className="font-bold text-[#7c6f57] text-lg flex items-center gap-2">
                    <span className="text-[#bfa77a]">📄</span>
                    {doc.originalname}
                  </p>
                  <p className="text-sm text-[#a68a64] mt-1">
                    Uploaded on{" "}
                    <span className="font-medium">
                      {new Date(doc.uploadedAt).toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="flex flex-row gap-4 mt-4 md:mt-0">
                  <motion.button
                    onClick={() => navigate(`/preview/${doc._id}`)}
                    className="bg-[#bfa77a] hover:bg-[#a68a64] text-white text-sm px-4 py-2 rounded-lg font-semibold shadow transition-all flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    title="Preview"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
                  <a
                    href={`http://localhost:5000/uploads/${doc.filename}`}
                    download={doc.originalname}
                    className="bg-[#7c6f57] hover:bg-[#bfa77a] text-white text-sm px-4 py-2 rounded-lg font-semibold shadow transition-all flex items-center justify-center"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="bg-[#c97a7a] hover:bg-[#a68a64] text-white text-sm px-4 py-2 rounded-lg font-semibold shadow transition-all flex items-center justify-center"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {showAlert && (
        <div
          role="alert"
          className="alert alert-vertical sm:alert-horizontal fixed top-10 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 shadow-lg border border-[#e7dbc7] rounded-lg p-4 flex items-center gap-4 backdrop-blur-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info h-6 w-6 shrink-0"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span className="text-lg text-[#a68a64]">
            Are you sure you want to delete this document?
          </span>
          <div className="flex gap-2">
            <button
              className="btn btn-sm bg-gray-200 hover:bg-gray-300 text-gray-700"
              onClick={cancelDelete}
            >
              No
            </button>
            <button
              className="btn bg-[#c97a7a] btn-sm btn-primary hover:bg-[#a68a64] text-white"
              onClick={confirmDelete}
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

