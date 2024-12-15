import React, { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { FaEye } from "react-icons/fa";

const Modal = ({ favorite }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="text-blue-500 hover:text-blue-700"
        title="View the favorite"
      >
        <FaEye />
      </button>
      {open && (
        <Dialog open={open} onClose={handleOpen} className="relative z-10">
          <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="text-center">
                    <DialogTitle as="h3" className="text-lg font-semibold text-gray-900">
                      Package Details
                    </DialogTitle>
                    <div className="mt-4 text-gray-600 text-left">
                      {favorite ? (
                        <>
                          <p>
                            <strong>Package Name:</strong> {favorite.name}
                          </p>
                          <p className="mt-2">
                            <strong>Reason:</strong> {favorite.reason}
                          </p>
                        </>
                      ) : (
                        <p className="text-red-500">No details found for this package.</p>
                      )}
                    </div>
                    <div className="mt-6">
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={handleOpen}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default Modal;