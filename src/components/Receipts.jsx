import React, { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import FinalReceipt from "./FinalReceipt";
import Header from "./Header";
import countriesAndCurrencySymbols from './countriesAndCurrencySymbols';

const Receipts = () => {
  const [logo, setLogo] = useState(null);
  const fileInputRef = useRef(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const [choice, setChoice] = useState('RECEIPT');
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState('₦');

  
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const { fields, append, remove } = useFieldArray({
    name: "cart",
    control,
    rules: {
      required: "Please append at least one item",
    },
  });

  const watchFields = useWatch({
    name: "cart",
    control,
  });

  useEffect(() => {
    if (watchFields && watchFields.length > 0) {
      watchFields.forEach((field, index) => {
        const quantity = parseFloat(field.quantity) || 0;
        const rate = parseFloat(field.rate) || 0;
        const amount = quantity * rate;
        setValue(`cart.${index}.amount`, amount);
      });
    }
  }, [watchFields, setValue]);

  const calculateTotalAmount = () => {
    if (watchFields && watchFields.length > 0) {
      const totalAmount = watchFields.reduce((total, field) => {
        const amount = parseFloat(field.amount) || 0;
        return total + amount;
      }, 0);
      return totalAmount;
    }
    return 0;
  };

  const calculateTaxAmount = (totalAmount) => {
    return (totalAmount * taxPercentage) / 100;
  };

  const calculateDiscountAmount = (totalAmount) => {
    return (totalAmount * discountPercentage) / 100;
  };

  const calculateFinalTotalAmount = () => {
    const totalAmount = calculateTotalAmount();
    const taxAmount = calculateTaxAmount(totalAmount);
    const discountAmount = calculateDiscountAmount(totalAmount);
    return (totalAmount + taxAmount - discountAmount).toLocaleString();
  };

  const onSubmit = (data) => {
    const totalAmount = calculateTotalAmount();
    const taxAmount = calculateTaxAmount(totalAmount);
    const discountAmount = calculateDiscountAmount(totalAmount);
    const finalTotalAmount = totalAmount + taxAmount - discountAmount;
    data.totalamount = finalTotalAmount;
    setSubmittedData(data);

    //console.log(setSubmittedData(data));

    localStorage.setItem('formData', JSON.stringify(data));

    const receiptsData = localStorage.getItem('receiptsArray');
    let receiptsArray = receiptsData ? JSON.parse(receiptsData) : [];

    const newReceipt = {
      id: receiptsArray.length + 1,
      receipt: data
    };

    receiptsArray.push(newReceipt);

    localStorage.setItem('receiptsArray', JSON.stringify(receiptsArray));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLogo(URL.createObjectURL(selectedFile));
    }
  };

  const voidSelect = () => {
    setLogo(null);
    fileInputRef.current.value = null;
  };

  const generateRandomNumber = () => {
    const number = Math.floor(Math.random() * 900000000) + 100000000;
    setRandomNumber(number);
  };

  // const handleChange = (event) => {
  //   setCurency(event.target.value);
  // };
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedCountry = countriesAndCurrencySymbols.find(
      (country) => country.symbol === selectedValue
     );

    if (selectedCountry) {
      setSelectedCurrencySymbol(selectedCountry.symbol);
     }
    };

  const handleSelect = (event) => {
    setChoice(event.target.value);
  };

  const getMessage = () => {
    return choice === 'RECEIPT' ? 'Total Paid' : 'Balance Due';
  };

  return (
    <div>
      <Header />
      {submittedData ? (
        <FinalReceipt formData={submittedData} 
          logo={logo} 
          randNum={randomNumber} 
          curency={selectedCurrencySymbol} 
          receinvoice={choice} 
          subTotalAmount={calculateTotalAmount()}
          getMessage={getMessage()}
          taxValue={calculateTaxAmount()}
          discountValue={calculateDiscountAmount()}


        />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container grid grid-cols-12">
            <div className="m-2 col-span-12 md:col-span-10 border-1 border border-gray-600">
              <div className="mx-auto p-5">
                <p className="text-2xl text-center mb-8 font-bold">{choice}</p>
                <div className="flex flex-col md:flex-row justify-between mb-6">
                  <div className="mb-4 md:mb-0 md:w-1/2">
                    <input {...register("comName")} type="text" placeholder="Company Name" className="w-full mb-2 p-2 border rounded" />
                    <input {...register("comAddress")} type="text" placeholder="Company Address" className="w-full mb-2 p-2 border rounded" />
                    <input {...register("comEmail")} type="text" placeholder="Email Address" className="w-full mb-2 p-2 border rounded" />
                    <input {...register("comPhone")} type="phone" placeholder="Phone Number" className="w-full mb-2 p-2 border rounded" />
                  </div>

                  <div className="mx-auto border rounded-md bg-gray-300 md:w-60 md:h-40 md:mx-0">
                    {logo ? (
                      <>
                        <img
                          src={logo}
                          alt="Company Logo"
                          className="w-36 h-36 mt-2 bg-blue-400 text-center rounded-full"
                        />
                        <div className="flex justify-center items-center">
                          <button
                            onClick={voidSelect}
                            className="bg-red-600 text-white py-1 px-2 mb-8 rounded"
                          >
                            Clear Logo
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center md:flex-row md:items-center">
                        <label className="flex justify-center items-center mt-8 text-lg md:py-0 md:px-4" htmlFor="fileInput">
                          + Add Logo
                        </label>
                        <input
                          {...register("file")}
                          onChange={handleFileChange}
                          type="file"
                          id="fileInput"
                          accept="image/*"
                          className="invisible w-full md:w-auto mb-2 md:mb-0"
                          ref={fileInputRef}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="mb-4 pr-4 md:mb-0 md:w-1/3">
                    <h2 className="font-bold mr-2 mb-2">BILL TO</h2>
                    <input {...register("conName")} type="text" placeholder="Contact Name" className="w-full mb-2 p-2 border rounded" />
                    <input {...register("cliComName")} type="text" placeholder="Client Company Name" className="w-full mb-2 p-2 border rounded" />
                    <input {...register("conAddress")} type="text" placeholder="Address" className="w-full mb-2 p-2 border rounded" />
                    <input {...register("conPhone")} type="phone" placeholder="Phone" className="w-full mb-2 p-2 border rounded" />
                  </div>

                  <div className="mb-4 pr-4 md:mb-0 md:w-1/3">
                    <h2 className="font-bold mb-2">SHIP TO</h2>
                    <input {...register("shipName")} type="text" placeholder="Name/Dept" className="w-full mb-2 p-2 border rounded" />
                    <input {...register("shipCliName")} type="text" placeholder="Client Company Name" className="w-full mb-2 p-2 border rounded" />
                    <input {...register("shipToAddress")} type="text" placeholder="Address" className="w-full mb-2 p-2 border rounded" />
                    <input {...register("shipPhone")} type="phone" placeholder="Phone" className="w-full mb-2 p-2 border rounded" />
                  </div>

                  <div className="md:w-1/3">
                    <h2 className="font-bold mb-2">Date</h2>
                    <input {...register("transdate")} type="date" placeholder="mm/dd/yyyy" className="w-full mb-2 p-2 border rounded" />
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
                      <li className="px-2">Delete</li>
                    </div>
                  </ul>
                  {fields.map((field, index) => {
                    return (
                      <div className="md:flex gap-4 px-4" key={field.id}>
                        <input
                          {...register(`cart.${index}.description`)}
                          className="w-full p-2 md:p-2 mt-4 md:w-full border border-1 border-gray-600"
                          type="text"
                          placeholder="Description of service and product . . . ."
                        />
                        <input
                          {...register(`cart.${index}.quantity`)}
                          className="w-16 p-2 md:p-2 mt-4 border border-1 border-gray-600 rounded"
                          type="number"
                          defaultValue={field.quantity}
                        />
                        <span id="currency" className="px-1 md:mt-5 md:px-1">
                          {selectedCurrencySymbol}
                        </span>
                        <input
                          {...register(`cart.${index}.rate`)}
                          className="w-24 p-1 md:mt-4 border border-1 border-gray-600 rounded"
                          type="number"
                          defaultValue={field.rate}
                        />
                        <span id="currency" className="px-1 md:mt-5 md:px-1">
                          {selectedCurrencySymbol}
                        </span>
                        <input
                          {...register(`cart.${index}.amount`)}
                          className="w-24 p-2 md:mt-4"
                          type="number"
                          readOnly
                        />
                        <button
                          type="button"
                          className="text-white bg-red-800 p-2 mt-4"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                  <div className="rounded-md my-3">
                    <button
                      type="button"
                      className="text-white rounded text-xs border bg-blue-600 p-2 px-3 hover:bg-blue-400"
                      onClick={() =>
                        append({
                          description: "",
                          quantity: 0,
                          rate: 0,
                          amount: 0,
                        })
                      }
                    >
                      ADD NEW ITEM
                    </button>
                  </div>
                  <p className="text-red-800 text-center text-xl">
                    {errors.cart?.root?.message}
                  </p>
                  <div className="mt-5 text-right">
                    <p className="text-lg font-semibold">
                      Sub-Total: {selectedCurrencySymbol}{calculateTotalAmount()}
                    </p>
                    <div className="flex justify-end my-5">
                      <h2 className="font-semibold m-2">Tax (%)</h2>
                      <input
                        type="number"
                        value={taxPercentage}
                        onChange={(e) => setTaxPercentage(parseFloat(e.target.value))}
                        placeholder="Tax Percentage"
                        className="mb-2 p-2 w-28 border rounded"
                      />                      
                    </div>
                    <div className="flex justify-end mb-5">
                      <h2 className="font-semibold m-2">Discount (%)</h2>
                      <input
                        type="number"
                        value={discountPercentage}
                        onChange={(e) => setDiscountPercentage(e.target.value)}
                        placeholder="Discount Percentage"
                        className="mb-2 p-2 w-28 border rounded"
                      />
                    </div>

                    <p className="text-lg font-semibold">
                      {getMessage()}: {selectedCurrencySymbol}{calculateFinalTotalAmount()}
                    </p>
                  </div>
                  <div>
                    <p className="underline">Terms & Conditions</p>
                    <div className="my-2">
                      <textarea
                        {...register("notes")}
                        type="text"
                        className="w-full border border-1 border-gray-400 rounded-sm text-xs p-1 md:w-80"
                        cols="20"
                        rows="3"
                        placeholder="How was payment made, e.g: cash, card, cheque ...."
                      />
                    </div>
                    <div className="mt-2">
                      <textarea
                        {...register("terms")}
                        type="text"
                        className="w-full border border-1 border-gray-400 rounded-sm text-xs p-1 md:w-80"
                        cols="30"
                        rows="3"
                        placeholder="Add terms here, e.g: warranty, returns policy ...."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 m-2">
              <p className="text-sm">Select Currency: </p>
              <div>
                <select onChange={handleChange} className="w-full text-lg p-2 border border-gray-400 rounded my-3 md:w-44 md:text-sm">
                  {countriesAndCurrencySymbols.map((country, index) => (
                      <option key={index} value={country.symbol}>
                        {country.country} ({country.currency})
                      </option>
                    ))}
                </select>
              </div>
              <p className="text-sm">Select Type: </p>
              <div>
                <select onChange={handleSelect} value={choice} className="w-full text-lg p-2 border border-gray-400 rounded my-3 md:w-44 md:text-sm">
                  <option value="RECEIPT">Receipt</option>
                  <option value="INVOICE">Invoice</option>
                </select>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={generateRandomNumber}
                  type="submit"
                  className="text-sm text-white p-4 w-44 bg-green-700 rounded hover:bg-green-500 mt-2"
                >
                  SUBMIT
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Receipts;
