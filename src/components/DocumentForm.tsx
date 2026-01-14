'use client'

import { useState } from 'react'
import { DocumentTemplate } from '@/data/documents'

interface DocumentFormProps {
  document: DocumentTemplate
  onSubmit: (data: Record<string, string>) => void
  isLoading?: boolean
}

export default function DocumentForm({ document, onSubmit, isLoading }: DocumentFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {document.fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label} {field.required && <span className="text-red-500">*</span>}
          </label>
          
          {field.type === 'select' ? (
            <select
              id={field.name}
              name={field.name}
              required={field.required}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-900"
            >
              <option value="">Sélectionnez...</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              onChange={(e) => handleChange(field.name, e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-900"
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-400 text-gray-900"
            />
          )}
        </div>
      ))}
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Chargement...' : `Générer le document — ${document.price.toFixed(2)}€`}
      </button>
    </form>
  )
}