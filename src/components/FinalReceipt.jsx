import React from "react";

const Final = ({ formData, logo }) => {
  console.log("new data :", formData);

  return (
    <div className="m-10">
      <p className="text-2xl text-center mb-4 font-bold">RECEIPT #301</p>
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="mb-4 md:mb-0 md:w-1/2">
          <p className="font-bold">{formData.comName}</p>
          <p>{formData.comAddress}</p>
          <p>{formData.comEmail}</p>
          <p>{formData.comPhone}</p>
        </div>

        <div class="flex flex-col items-center md:w-1/2">
          {logo && (
          <div className="bg-contain border-2 rounded-md md:w-30 md:h-30 md:mx-0">
            <img src={logo} alt="Company Logo" className="w-24 h-24 mt-2" />
          </div>
           )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
  
        <div className="mb-4 md:mb-0 md:w-1/3">
          <h2 className="font-bold mb-2">BILL TO</h2>
          <p>{formData.conName}</p>
          <p>{formData.cliComName}</p>
          <p>{formData.conAddress}</p>
          <p>{formData.conPhone}</p>
        </div>
      
        <div className="mb-4 md:mb-0 md:w-1/3">
          <h2 className="font-bold mb-2">SHIP TO</h2>
          <p>{formData.shipName}</p>
          <p>{formData.shipCliName}</p>
          <p>{formData.shipToAddress}</p>
          <p>{formData.shipPhone}</p>
        </div>
      
        <div className="md:w-1/3">
          <h2 className="font-bold mb-2">Date</h2>
          <p>{formData.transdate}</p>
        </div>
      </div>
      
      <div className="my-5">
        <ul className="bg-blue-600 text-white p-2 rounded-md flex justify-between">
          <div className="flex justify-start pl-5">
            <li>Item</li>
          </div>
          <div className="invisible h-7 md:flex gap-x-10 md:visible">
            <li className="px-2">Quantity</li>
            <li className="px-2">Rate</li>
            <li className="px-2">Amount</li>
          </div>
        </ul>
        {formData.cart.map((item, index) => (
          <div className="md:flex gap-4 px-2">
            <input
              className="w-full p-2 mr-1 md:p-2 mt-4 md:w-full"
              value={item.description}
              readOnly
            />
            <input
              className="w-20 p-2 mr-1 md:p-2 mt-4"
              value={item.quantity}
              readOnly
            />
            <input
              className="w-20 p-2 mr-1 md:p-2 mt-4"
              value={item.rate}
              readOnly
            />
            <input
              className="w-20 p-2 mr-1 md:p-2 mt-4"
              value={item.amount}
              readOnly
            />
          </div>
         ))}
         <div>
            <div className="flex justify-end">
              <div className="w-60 md:p-2 mt-4 bg-slate-300 rounded">
                  Balance Due:{" "}
                  <span className="ml-12 text-2xl font-semibold">
                    {formData.totalamount}
                  </span>
              </div>
            </div>
            <div className="mt-8">
              <p className="">Thank you for your business!</p>
            </div>
         </div>  
      </div>
      <div className="mt-10">
        <p className="underline text-blue-700">Terms & Instructions</p>
        <div className="my-2">
          <h1>{formData.notes}</h1>
        </div>
        <div>
          <h1>{formData.terms}</h1>
        </div>
      </div>
    </div>
  );
}

export default Final;
