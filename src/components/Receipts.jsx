import React, { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import FinalReceipt from "./FinalReceipt";

const Receipts = () => {
  const [logo, setLogo] = useState(null);
  const fileInputRef = useRef(null);
  const [submittedData, setSubmittedData] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      receiptt: "RECEIPT",
      tagg: "#",
      cart: [],
    },
  });

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

  const onSubmit = (data) => {
    setSubmittedData(data);
    console.log(data);
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

  return (
    <div>
      {submittedData ? (
        <FinalReceipt formData={submittedData} logo={logo} />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="container grid grid-cols-12">
            <div className="m-2 col-span-12 md:col-span-10 border-1 border border-gray-600">
              <div className="mx-auto p-5">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="">
                    <div className="mx-auto w-60 h-48 border-2 rounded-md bg-gray-400 md:w-60 md:h-40 md:mx-0">
                      {logo ? (
                        <>
                          <img
                            src={logo}
                            alt="Selected Logo"
                            className="w-full h-full object-contain rounded-md"
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
                        <div>
                          <input
                            {...register("file")}
                            onChange={handleFileChange}
                            type="file"
                            id="file"
                            accept="image/*"
                            className="invisible pb-7 pr-24"
                            ref={fileInputRef}
                          />
                          <label className="text-lg p-8 md:" htmlFor="file">
                            + Add Your Logo
                          </label>
                        </div>
                      )}
                    </div>
                    <div className="mt-10 flex flex-col gap-y-3">
                      <textarea
                        {...register("whofrom", {
                          required: "field is required",
                        })}
                        type="text"
                        placeholder="invoice from? (required)"
                        className="w-full text-sm p-2 border border-1 border-gray-400 rounded md:w-64"
                        cols="20"
                      />
                      <div className="md:flex gap-4 mt-2">
                        <div className="mb-2 md:grid gap-y-3">
                          <label htmlFor="billto">Bill to</label>
                          <textarea
                            {...register("billto", {
                              required: "filed is required",
                            })}
                            id="billto"
                            type="text"
                            className="w-full pl-2 border border-1 border-gray-400 rounded md:w-48"
                            cols="20"
                          />
                        </div>
                        <div className="mb-2 md:grid gap-y-3">
                          <label htmlFor="shipto">Ship to</label>
                          <textarea
                            {...register("shipto", {
                              required: "Field is required",
                            })}
                            id="shipto"
                            type="text"
                            className="w-full pl-2 border border-1 border-gray-400 rounded md:w-48"
                            cols="20"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid justify-items-end">
                    <div className="flex flex-col justify-end gap-y-2 mb-4">
                      <input
                        {...register("receiptt")}
                        type="text"
                        className="w-full md:w-96 text-xl font-semibold text-end rounded p-2 border-1 border border-gray-400"
                      />
                      <div className="flex justify-end">
                        <input
                          {...register("tagg")}
                          className="w-8 p-1 bg-gray-100 rounded-l-sm border-1 border border-gray-400"
                          readOnly
                        />
                        <input
                          {...register("receiptno")}
                          type="text"
                          className="w-32 p-1 rounded-r-sm border-1 border border-gray-400"
                          placeholder="receipt no"
                        />
                      </div>
                    </div>
                    <div className="grid justify-items-end gap-y-3 mb-3">
                      <div className="flex gap-2">
                        <label className="text-sm" htmlFor="">
                          Date
                        </label>
                        <input
                          {...register("ddate", {
                            required: "Date to is required",
                          })}
                          type="date"
                          className="w-72 text-sm p-2 rounded-sm md:w-44 border-1 border border-gray-400"
                        />
                      </div>
                      <div className="md:flex gap-2">
                        <label className="text-sm" htmlFor="">
                          Payment Terms
                        </label>
                        <input
                          {...register("paymentterms", {
                            required: "Payment terms to is required",
                          })}
                          type="text"
                          className="w-72 p-2 rounded-sm md:w-44 border-1 border border-gray-400"
                        />
                      </div>
                      <div className="flex gap-2 ">
                        <label className="text-sm" htmlFor="">
                          Due Date
                        </label>
                        <input
                          {...register("duedate", {
                            required: "due date to is required",
                          })}
                          type="date"
                          className="w-72 text-sm p-2 rounded-sm md:w-44 border-1 border border-gray-400"
                        />
                      </div>
                      <div className="flex gap-2">
                        <label className="text-sm" htmlFor="">
                          PO Number
                        </label>
                        <input
                          {...register("ponumber", {
                            required: "bill to is required",
                          })}
                          type="number"
                          className="w-72 p-2 rounded-sm md:w-44 border-1 border border-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="my-5">
                  <ul className="bg-blue-600 text-white p-2 rounded-md flex justify-between">
                    <div className="flex justify-start pl-5">
                      <li>Item</li>
                    </div>
                    <div className="invisible h-7 md:flex gap-x-10 md:visible">
                      <li className="px-2">Quantityx</li>
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
                        <span id="currency" className="px-2 md:mt-5 md:px-1">
                          ₦
                        </span>
                        <input
                          {...register(`cart.${index}.rate`)}
                          className="w-20 p-2 md:mt-4 border border-1 border-gray-600 rounded"
                          type="number"
                          defaultValue={field.rate}
                        />
                        <span id="currency" className="px-2 md:mt-5 md:px-1">
                          ₦
                        </span>
                        <input
                          {...register(`cart.${index}.amount`)}
                          className="w-20 p-2 md:mt-4"
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
                  <div>
                    <label htmlFor="notes">Notes</label>
                    <div className="my-2">
                      <textarea
                        {...register("notes")}
                        type="text"
                        className="w-full border border-1 border-gray-400 rounded-sm text-xs p-1 md:w-80"
                        cols="20"
                        rows="3"
                        placeholder="Notes - any relevant information not already covered"
                      />
                    </div>
                    <label htmlFor="terms">Terms</label>
                    <div className="mt-2">
                      <textarea
                        {...register("terms")}
                        type="text"
                        className="w-full border border-1 border-gray-400 rounded-sm text-xs p-1 md:w-80"
                        cols="30"
                        rows="3"
                        placeholder="terms and conditions - late fees, payment method, delivery schedule"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12 md:col-span-2 m-2">
              <p className="text-sm">Select Currency: </p>
              <div>
                <select className="w-full text-lg p-2 border border-gray-400 rounded my-3 md:w-44 md:text-sm">
                  <option value="$">United States Dollar</option>
                  <option value="N">Nigeria Naira</option>
                </select>
              </div>
              <p className="text-sm">Select Type: </p>
              <div>
                <select className="w-full text-lg p-2 border border-gray-400 rounded my-3 md:w-44 md:text-sm">
                  <option value="RECEIPT">Receipt</option>
                </select>
              </div>
              <div className="flex justify-center">
                <button
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
