import React from 'react'

const Header = () => {
  return (
    <div>
        <header className="bg-blue-800 p-4 flex justify-between items-center text-white">
        <div className="text-xl text-purple-400 font-bold"><a href="/">Invoicer Pro</a></div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="create-invoice" className="hover:underline">Create an Invoice</a>
            </li>
            <li>
              <a href="view-invoice" className="hover:underline">View Invoice</a>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header