// app/app/page.tsx
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue } from 'framer-motion'
import {
  FiHome, FiClock, FiSettings, FiBell,
  FiPlus, FiArrowDownCircle, FiArrowUpCircle,
  FiSend, FiDownload, FiStar, FiCamera, FiSearch
} from 'react-icons/fi'

import MorphingBlobs from '../components/MorphingBlobs'
import Sparkline      from '../components/Sparkline'
import ScannerModal   from '../components/ScannerModal'
import ChatAssist     from '../components/ChatAssist'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ParticleBurst(_props: { active: boolean }) { return null }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function OnboardingSpotlight(_props: {
  steps: { ref: React.RefObject<HTMLDivElement | null>, title: string, description: string }[]
  onFinish: () => void
}) { return null }

export default function EnhancedMoneyTransferPage() {
  const style = { x: useMotionValue(0), y: useMotionValue(0) }
  const [loading, setLoading]         = useState(true)
  const [time, setTime]               = useState(new Date())
  const [showOnboard, setShowOnboard] = useState(true)
  const [burst, setBurst]             = useState(false)
  const [scannerOpen, setScannerOpen] = useState(false)
  const [points, setPoints]           = useState(0)
  const [language, setLanguage]       = useState<'en'|'zu'>('en')

  const headerRef  = useRef<HTMLDivElement>(null)
  const balanceRef = useRef<HTMLDivElement>(null)
  const quickRef   = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => { setLoading(false); setBurst(true) }, 800)
    const c = setInterval(() => setTime(new Date()), 60_000)
    return () => { clearTimeout(t); clearInterval(c) }
  }, [])

  const hour = time.getHours()
  const greet = {
    en: hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening',
    zu: 'Sawubona'
  }[language]
  const locale        = language === 'en' ? 'en-US' : 'zu-ZA'
  const formattedTime = time.toLocaleTimeString(locale, { hour:'2-digit', minute:'2-digit' })

  const sparkData    = [0.9,1.1,1.05,1.2,1.15,1.3,1.25]
  const contacts     = ['Andre','Bill','Chris','Daniel']
  const transactions = [
    { to:'Alice',  amount:'-$25.00',  date:'May 12' },
    { to:'Market', amount:'-$100.00', date:'May 11' },
    { to:'Salary', amount:'+$500.00', date:'May 10' }
  ]
  const rates        = { EUR:0.90, GBP:0.78, ZAR:18.2 }
  const [currency, setCurrency] = useState<keyof typeof rates>('EUR')
  const convertedValue = (1234.56 * rates[currency]).toFixed(2)

  const actionsList = [
    { label:'Deposit',  icon:FiArrowDownCircle, gradient:'from-indigo-500 to-indigo-400', onClick:() => {} },
    { label:'Withdraw', icon:FiArrowUpCircle,   gradient:'from-pink-500 to-pink-300',     onClick:() => {} },
    { label:'Send',     icon:FiSend,            gradient:'from-green-500 to-green-300',   onClick:() => setPoints(p => p + 10) },
    { label:'Receive',  icon:FiDownload,        gradient:'from-yellow-500 to-yellow-300',onClick:() => {} },
    { label:'Scan',     icon:FiCamera,          gradient:'from-blue-500 to-blue-300',    onClick:() => setScannerOpen(true) }
  ]

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleAICommand(_cmd: { amount: string; to: string }) {
    setPoints(p => p + 5)
  }

  return (
    <motion.div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-6 overflow-hidden">
      <MorphingBlobs style={style} />
      <ParticleBurst active={burst} />
      <ScannerModal open={scannerOpen} onClose={() => setScannerOpen(false)} />
      <ChatAssist onCommand={handleAICommand} />

      {/* Header */}
      <div ref={headerRef} className="sticky top-0 bg-white bg-opacity-70 backdrop-blur-md p-4 rounded-b-2xl shadow-md max-w-xl mx-auto mb-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="https://i.pravatar.cc/150?u=User" alt="User"
               className="w-12 h-12 rounded-full ring-2 ring-indigo-400" />
          <div>
            <h1 className="text-xl font-bold">{greet}, Noble</h1>
            <p className="text-sm text-gray-600">
              <FiClock size={16} className="inline mr-1 align-middle" />
              {formattedTime}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FiBell size={24} className="text-gray-600" />
          <FiSettings size={24} className="text-gray-600" />
          <select
            value={language}
            onChange={e => setLanguage(e.target.value as 'en'|'zu')}
            className="border p-1 rounded text-sm"
          >
            <option value="en">EN</option>
            <option value="zu">ZU</option>
          </select>
          <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-1 rounded-full">
            <FiStar size={16} className="text-yellow-500" />
            <span className="text-sm font-medium">{points}</span>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div ref={balanceRef} className="relative bg-white p-5 rounded-2xl shadow-md max-w-xl mx-auto mb-6">
        <p className="text-sm text-gray-500">Wallet Balance</p>
        <div className="flex items-baseline space-x-2 mt-2">
          {loading
            ? <div className="h-10 w-40 bg-gray-300 rounded animate-pulse"/>
            : <span className="text-3xl font-bold text-gray-900">
                {new Intl.NumberFormat(locale, {
                  style:'currency',
                  currency:'USD'
                }).format(1234.56)}
              </span>
          }
          <span className="text-sm text-green-500 font-medium">+4.5%</span>
        </div>
        <Sparkline data={sparkData} />
        <div className="mt-4 flex items-center space-x-2">
          <label htmlFor="currency" className="text-xs text-gray-600">Convert to</label>
          <select
            id="currency"
            value={currency}
            onChange={e => setCurrency(e.target.value as keyof typeof rates)}
            className="text-xs p-1 border rounded"
          >
            {Object.keys(rates).map(cur => (
              <option key={cur} value={cur}>{cur}</option>
            ))}
          </select>
          {!loading && (
            <span className="text-xs text-gray-800">
              {currency} {convertedValue}
            </span>
          )}
        </div>
      </div>

      {/* Quick Send */}
      <div ref={quickRef} className="bg-white p-5 rounded-2xl shadow-md max-w-xl mx-auto mb-6">
        <h2 className="text-sm font-medium mb-4">Quick Send</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {contacts.map(name => (
            <motion.div
              key={name}
              className="text-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src={`https://i.pravatar.cc/150?u=${name}`}
                alt={name}
                className="w-12 h-12 rounded-full mx-auto shadow"
              />
              <p className="mt-1 text-xs text-gray-700">{name}</p>
            </motion.div>
          ))}
          <motion.button
            className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center shadow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <FiPlus size={20} />
          </motion.button>
        </div>
      </div>

      {/* Actions */}
      <div ref={actionsRef} className="grid grid-cols-2 gap-4 max-w-xl mx-auto mb-6">
        {actionsList.map(({ label, icon: Icon, gradient, onClick }) => (
          <motion.button
            key={label}
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            className={`p-4 bg-gradient-to-br ${gradient} rounded-2xl shadow-md text-white flex flex-col items-center`}
          >
            <div className="bg-white rounded-full p-2 mb-2">
              <Icon size={20} className="text-indigo-600" />
            </div>
            <span className="text-sm font-medium">{label}</span>
          </motion.button>
        ))}
      </div>

      {/* Transactions */}
      <div className="bg-white p-5 rounded-2xl shadow-md max-w-xl mx-auto mb-6">
        <div className="flex items-center mb-3">
          <FiSearch size={20} className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search transactions"
            className="w-full text-sm bg-transparent focus:outline-none text-gray-800 placeholder-gray-500"
          />
        </div>
        <div className="space-y-2">
          {transactions.map((tx,i) => (
            <div
              key={i}
              className="flex justify-between items-center py-2 border-b last:border-none"
            >
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-semibold">
                  {tx.to.charAt(0)}
                </span>
                <div>
                  <p className="font-medium text-gray-800">{tx.to}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
              <p className={`font-semibold ${tx.amount.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {tx.amount}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around py-3 z-20">
        {[FiHome,FiClock,FiSettings].map((Icon,i) => (
          <button
            key={i}
            className="flex flex-col items-center text-gray-600 hover:text-indigo-500"
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{['Home','Activity','Settings'][i]}</span>
          </button>
        ))}
      </nav>

      {/* Onboarding */}
      {showOnboard && (
        <OnboardingSpotlight
          steps={[
            { ref: headerRef,  title: `${greet}, Noble`, description: 'Profile & settings.' },
            { ref: balanceRef, title: 'Balance',        description: 'Your wallet balance.' },
            { ref: quickRef,   title: 'Quick Send',     description: 'Send money quickly.' },
            { ref: actionsRef, title: 'Actions',        description: 'Key actions including scan.' },
          ]}
          onFinish={() => setShowOnboard(false)}
        />
      )}
    </motion.div>
  )
}
