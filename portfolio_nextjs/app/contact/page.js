'use client'
import React, { useState } from 'react'
import SocialBanner from '../components/SocialBanner'
import { MessageService } from '../service/messageService'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    message: '', 
  })

  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)

  const [formStatus, setFormStatus] = useState('') 

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email'
    if (!/^\d{10,15}$/.test(formData.phone))
      newErrors.phone = 'Invalid phone number'

    setErrors(newErrors)
    setIsFormValid(Object.keys(newErrors).length === 0)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleBlur = () => validateForm()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormValid) return

    try { 
      await MessageService.postMessage(formData).then((res) => {
        console.log(res)
        if (res.status == 201) {
          setFormStatus('Message sent successfully!')
          setFormData({
            name: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
          })
          setErrors({})
          setIsFormValid(false)
        } else {
        }
      })
    } catch (error) {
      setFormStatus('Failed to send the message. Please try again.')
    }
  }

  return (
    <div className="flex-1 md:flex h-screen bg-white">
      <div className="py-3 md:rounded-tr-[100px] transition-transform duration-300 md:flex-1 flex flex-col items-center justify-center bg-slate-200">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-5">
          Accounts
        </h2>
        <SocialBanner />
      </div>

      <div className="flex-1 bg-slate-200 p-8 flex items-center justify-center shadow-md md:rounded-tl-[100px]">
        <form
          className="w-full max-w-lg rounded-lg p-6 space-y-6"
          onSubmit={handleSubmit}
          noValidate
        >
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">
            Contact to Me
          </h2>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-2 p-3 border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-2 p-3 border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-2 p-3 border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="mt-2 p-3 border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600">
              Message (Optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-2 p-3 border w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-sm"
              rows="4"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 ${
              !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!isFormValid}
          >
            Gönder
          </button>

          {formStatus && (
            <p
              className={`mt-4 text-sm mx-auto font-semibold w-fit ${
                formStatus.includes('successfully')
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {formStatus}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Contact
