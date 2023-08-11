"use client"

import axios, { AxiosError } from 'axios';
import { FormEvent, useState } from 'react'

const EnqueryForm = () => {

  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [resultText, setResultText] = useState({success: true, message: ''})

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
          const { status } = await axios.post('http://localhost:3000/api/enquery', { phone, message })
          if (status === 200) {
            setResultText({success: true, message: 'Thank you for let us know!'})
          }
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response?.status == 400) {
                setResultText({success: false, message: 'Please fill the form'})
            }
          }
        } finally {
          setMessage('')
          setPhone('')
        }
    }
    
  return (
    <div className="bg-white dark:bg-gray-900" id="contact">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Us
        </h2>
        <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
          Wanna ask something? Fill the form and let us know.
        </p>
        <form className="" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
             Phone no.
            </label>
            <input
              value={phone}
              onChange={(e) => {
                setResultText({success: true, message: ''})
                setPhone(e.target.value);
              }}
              type="text"
              id="name"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Your phone"
              required
            />
          </div>
          <div className="sm:col-span-2 mt-8">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Your message
            </label>
            <textarea
              value={message}
              onChange={(e) => {
                setResultText({success: true, message: ''})
                setMessage(e.target.value);
              }}
              id="message"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Ask anything . . ."
            ></textarea>
          </div>
          {
            <div className={`mt-3 pl-2 font-semibold ${resultText.success ? 'text-green-500' : 'text-red-500'}`}>{resultText.message}</div>
          }
          <button
            type="submit"
            className="mt-3 py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-orange-400 sm:w-fit hover:bg-orange-300 focus:ring-2 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnqueryForm