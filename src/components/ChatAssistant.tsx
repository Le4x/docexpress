'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatAssistantProps {
  onComplete: (data: Record<string, string>) => void
  documentType: string
}

export default function ChatAssistant({ onComplete, documentType }: ChatAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [collectedData, setCollectedData] = useState<Record<string, string>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Message initial
    setMessages([{
      role: 'assistant',
      content: `Bonjour ! Je vais vous aider à créer votre ${documentType}. Répondez à mes questions et je génèrerai votre document automatiquement. Commençons : quel est votre prénom ?`
    }])
  }, [documentType])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content: userMessage }],
          documentType,
          collectedData
        })
      })

      const data = await response.json()
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.message }])
      
      if (data.collectedData) {
        setCollectedData(prev => ({ ...prev, ...data.collectedData }))
      }
      
      if (data.isComplete) {
        onComplete(data.finalData)
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Désolé, une erreur est survenue. Pouvez-vous réessayer ?' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-[500px] border border-gray-200 rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-3">
        <h3 className="font-semibold flex items-center gap-2">
          <span className="text-xl">🤖</span> Assistant DocExpress
        </h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-lg">
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Tapez votre réponse..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            Envoyer
          </button>
        </div>
      </div>
    </div>
  )
}