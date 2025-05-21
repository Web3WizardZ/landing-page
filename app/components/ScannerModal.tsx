'use client'
export default function ScannerModal({ open, onClose }: { open:boolean, onClose:()=>void }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="font-bold mb-2">QR/NFC Scanner</h2>
        <p>Feature coming soon…</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
        >Close</button>
      </div>
    </div>
  )
}
