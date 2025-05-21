'use client'
import { useState } from 'react'
export default function ChatAssist({ onCommand }: {onCommand: (c:{amount:string,to:string})=>void}) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const handleSend = () => {
    const m = input.match(/send \$(\d+(?:\.\d{1,2})?) to (\w+)/i)
    if (m) onCommand({ amount: m[1], to: m[2] })
    setInput('')
  }
  return (
    <div className="fixed bottom-20 right-6 z-40">
      {open && (
        <div className="bg-white p-4 rounded-lg shadow-md w-64 mb-2">
          <div className="mb-2 font-semibold">AI Assist</div>
          <input
            className="w-full p-1 border rounded mb-2 text-sm"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Ask: send $10 to Alice"
          />
          <button
            onClick={handleSend}
            className="px-2 py-1 bg-indigo-600 text-white rounded text-sm"
          >Send</button>
        </div>
      )}
      <button
        onClick={() => setOpen(o => !o)}
        className="p-3 bg-indigo-500 rounded-full text-white shadow-lg hover:bg-indigo-600"
      >AI</button>
    </div>
  )
}
