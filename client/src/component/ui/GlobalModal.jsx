import { motion, AnimatePresence } from "framer-motion";

const GlobalModal = ({
  isOpen,
  onClose,
  title,
  message,
  type = "success", // success | error | info
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center pt-24 px-4"
          >
            {/* MODAL */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center relative"
            >
              {/* ICON */}
              <div
                className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full 
                ${
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}

                {type === "error" && (
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </div>

              {/* TITLE */}
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {title}
              </h2>

              {/* MESSAGE */}
              <p className="text-gray-600 mb-6">{message}</p>

              {/* BUTTON */}
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
              >
                Continue
              </button>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GlobalModal;
