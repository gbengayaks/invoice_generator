import React, { useState, useEffect } from 'react';
import Header from './Header';
import ReceiptDisplay from './ReceiptDisplay';

const getDataFromLS = () => {
  const data = localStorage.getItem('receiptsArray');
  return data ? JSON.parse(data) : [];
}

const ReceiptTable = ({ generateReceipt, deleteReceipt }) => {
  const [receipts, setReceipts] = useState(getDataFromLS());
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    setReceipts(getDataFromLS());
  }, []);

  const handleGenerateReceipt = (id) => {
    const receipt = receipts.find((receipt) => receipt.id === id);
    if (receipt) {
      setSelectedReceipt(receipt);
    }
    
  };

  const handleDeleteReceipt = (id) => {
    const updatedReceipts = receipts.filter((receipt) => receipt.id !== id);
    setReceipts(updatedReceipts);
    localStorage.setItem('receiptsArray', JSON.stringify(updatedReceipts));
    deleteReceipt(id);
  };

  return (
    <>
     {selectedReceipt ? (
        <ReceiptDisplay receipts={selectedReceipt} />
      ):(
        <>
          <Header />
          <div className="overflow-x-auto mt-5">
            <table className="min-w-full bg-white">
              <thead className="bg-slate-600 text-white">
                <tr>
                  <th className="w-1/3 py-2 px-4 text-left">Receipt No.</th>
                  <th className="w-1/3 py-2 px-4 text-center">Details</th>
                  <th className="w-1/3 py-2 px-4 text-center">Delete</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((receipt, index) => (
                  <tr key={receipt.id} className="border-b">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => handleGenerateReceipt(receipt.id)}
                        className="text-white text-sm p-1 rounded bg-green-500 hover:bg-green-800"
                      >
                        Details
                      </button>
                    </td>
                    <td className="py-2 px-4 text-center">
                      <button
                        onClick={() => handleDeleteReceipt(receipt.id)}
                        className="text-white text-sm p-1 rounded bg-red-500 hover:bg-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {receipts.length < 1 && <tr><td colSpan="3" className="py-2 px-4 text-center">No data is added yet</td></tr>}
              </tbody>
            </table>
          </div>
        </>
          )
      }
      
    </>
  );
};

export default ReceiptTable;
