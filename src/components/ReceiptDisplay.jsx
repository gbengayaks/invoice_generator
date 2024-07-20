import React, { useRef } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ReceiptDisplay = ({ receipts }) => {
  //console.log("new data :", receipts);
  const printRef = useRef();
  const buttonRef = useRef();

  const handleDownloadPdf = async () => {
    //hide the button
    buttonRef.current.style.display = 'none';

    const element = printRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const data = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const width = imgWidth * ratio;
    const height = imgHeight * ratio;

    pdf.addImage(data, 'PNG', 0, 0, width, height);
    pdf.save('download.pdf');

     // Show the button again
     buttonRef.current.style.display = 'block';
  };

  return (
    <div ref={printRef} className="mx-auto p-12 mt-5 bg-slate-50 text-lg">
            <p className="text-4xl text-center mb-4 font-bold"> <span></span> </p>
            
            <div className="flex flex-col md:flex-row justify-between my-10">
                <div className="md:mb-0 md:w-1/2">
                <p className="font-bold">{receipts.receipt.comName}</p>
                <p>{receipts.receipt.comAddress}</p>
                <p>{receipts.receipt.comEmail}</p>
                <p>{receipts.receipt.comPhone}</p>
                </div>
                
                <div class="flex flex-col items-end md:w-1/2">
              
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
        
                <div className="mb-4 md:mb-0 md:w-1/3">
                <h2 className="font-bold mb-2">BILL TO</h2>
                <p>{receipts.receipt.conName}</p>
                <p>{receipts.receipt.cliComName}</p>
                <p>{receipts.receipt.conAddress}</p>
                <p>{receipts.receipt.conPhone}</p>
                </div>
            
                <div className="mb-4 md:mb-0 md:w-1/3">
                <h2 className="font-bold mb-2">SHIP TO</h2>
                <p>{receipts.receipt.shipName}</p>
                <p>{receipts.receipt.shipCliName}</p>
                <p>{receipts.receipt.shipToAddress}</p>
                <p>{receipts.receipt.shipPhone}</p>
                </div>
            
                <div className="md:w-1/3">
                <h2 className="font-bold mb-2">Date</h2>
                <p>{receipts.receipt.transdate}</p>
                </div>
            </div>
            
            <div className="my-5">
                <ul className="bg-blue-600 text-white p-2 rounded-md flex justify-between">
                <div className="flex justify-start pl-5">
                    <li>Item</li>
                </div>
                <div className="invisible h-7 md:flex gap-x-40 md:visible">
                    <li className="px-2">Quantity</li>
                    <li className="px-2">Rate</li>
                    <li className="px-2">Amount</li>
                </div>
                </ul>
                {receipts.receipt.cart.map((item, index) => (
                <div className="md:flex">
                    <input
                    className="w-full mr-1 md:p-3 mt-4 md:w-full"
                    value={item.description}
                    readOnly
                    />
                    <input
                    className="w-16 text-right mr-1 md:p-3 mt-4"
                    value={item.quantity}
                    readOnly
                    /> 
                    <input
                    className="w-25 h-14 text-right mr-1 md:p-3 mt-4"
                    value={item.rate}
                    readOnly
                    />
                    <input
                    className="w-25 text-right mr-1 md:p-3 mt-4"
                    value={item.amount}
                    readOnly
                    />
                </div>
                ))}
                <div>
                    <div className="flex justify-end">
                    <div className="w-68 h-16 md:p-2 mt-4 bg-slate-300 rounded">
                        Balance Due:{" "}
                        <span className="ml-12 text-2xl font-semibold">
                            {receipts.receipt.totalamount}
                        </span>
                    </div>
                    </div>
                    <div className="mt-8">
                    <p className="">Thank you for your business!</p>
                    </div>
                </div>  
            </div>
            <div className="mt-10">
                <p className="underline text-blue-700">Terms & Conditions</p>
                <div className="my-2">
                <h1>{receipts.receipt.notes}</h1>
                </div>
                <div>
                <h1>{receipts.receipt.terms}</h1>
                </div>
            </div>
      <div className="mt-5">
        <button
          ref={buttonRef}
          onClick={handleDownloadPdf}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
}

export default ReceiptDisplay;




