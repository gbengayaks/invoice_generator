import React from 'react';
//import './App.css';

function Index() {
  return (
    <div className="text-center h-screen">
      <header className="bg-blue-800 p-4 flex justify-between items-center text-white">
        <div className="text-xl font-bold">Invoicer Pro</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="create-invoice" className="hover:underline">Create an Invoice</a>
            </li>
            <li>
              <a href="#view-invoice" className="hover:underline">View Invoice</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Introducing Invoicer Pro</h1>
        <p className="text-lg p-4 ">
          <h2 className='mb-1 text-xl'>Introducing <strong>Invoicer Pro</strong>, a free app that effortlessly generates professional invoices and receipts in just a few taps.</h2> 
          <h2 className='mb-1 text-xl'>Perfect for small businesses and freelancers, Invoicer Pro ensures quick and accurate billing,</h2> 
          <h2 className='mb-1 text-xl'>streamlining your financial management without any cost.</h2>
        </p>
      </main>
    </div>
  );
}

export default Index;