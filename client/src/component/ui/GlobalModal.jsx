import { motion, AnimatePresence } from "framer-motion";

const GlobalModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "success",
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          
          {/* CENTER HORIZONTALLY, TOP VERTICALLY */}
          <div className="flex justify-center items-start pt-4 px-4 min-h-screen">
            
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center"
            >
              
              {/* ICON */}
              <div
                className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full ${
                  type === "success"
                    ? "bg-green-100"
                    : type === "error"
                    ? "bg-red-100"
                    : "bg-blue-100"
                }`}
              >
                {type === "success" && (
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>

              {/* TITLE */}
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {title}
              </h2>

              {/* MESSAGE */}
              <p className="text-gray-600 text-sm mb-6">
                {message}
              </p>

              {/* BUTTON */}
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Continue
              </button>

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GlobalModal;
