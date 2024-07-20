import React from 'react';
import Header from './Header';

//import './App.css';

function Index() {
  return (
    <div className="text-center h-screen">
      <Header />
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