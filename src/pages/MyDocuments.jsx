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
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-purple-100 to-white">
      <Navbar />
      <div className="flex flex-col items-center mt-8">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold mb-2 text-teal-600 drop-shadow"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          📄 My Uploaded PDFs
        </motion.h2>
        <p className="text-gray-700 mb-6 text-center max-w-xl">
          All your uploaded documents are listed below. Click{" "}
          <span className="font-semibold text-purple-700">Preview</span> to view
          or sign your PDF.
        </p>
      </div>
      <div className="max-w-2xl mx-auto px-2 pb-12">
        {loading ? (
          <div className="text-center text-gray-500 py-12 text-lg">
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
            <p className="text-gray-600 text-lg">
              No documents found. Try uploading one!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {docs.map((doc, idx) => (
              <motion.div
                key={doc._id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between bg-white/70 border border-teal-100 rounded-2xl shadow-lg hover:shadow-teal-200 transition backdrop-blur-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
              >
                <div>
                  <p className="font-bold text-gray-800 text-lg flex items-center gap-2">
                    <span className="text-teal-500">📄</span>
                    {doc.originalname}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Uploaded on{" "}
                    <span className="font-medium">
                      {new Date(doc.uploadedAt).toLocaleString()}
                    </span>
                  </p>
                </div>
                <div className="flex flex-row gap-4 mt-4 md:mt-0">
                  <motion.button
                    onClick={() => navigate(`/preview/${doc._id}`)}
                    className="bg-gradient-to-r from-teal-400 via-purple-400 to-purple-700 hover:from-teal-500 hover:to-purple-800 text-white text-sm px-4 py-2 rounded-lg font-semibold shadow transition-all flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    title="Preview"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
                  <a
                    href={`https://backend-wufu.onrender.com/uploads/${doc.filename}`}
                    download={doc.originalname}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-lg font-semibold shadow transition-all flex items-center justify-center"
                    title="Download"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => handleDelete(doc._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg font-semibold shadow transition-all flex items-center justify-center"
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
          className="alert alert-vertical sm:alert-horizontal fixed top-10 left-1/2 transform -translate-x-1/2 z-50 bg-white/80 shadow-lg border border-purple-200 rounded-lg p-4 flex items-center gap-4 backdrop-blur-md"
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
          <span className="text-lg">
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
              className="btn bg-red-500 btn-sm btn-primary hover:bg-red-600 text-white"
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

