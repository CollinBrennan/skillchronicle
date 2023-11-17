import { useState } from 'react'
import LogModal from '../components/LogModal'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth } from '../config/firebase'
import { SkillLog, LogTable } from '../components/LogTable'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import TimerModal from '../components/TimerModal'
import SkillFrequencyChart from '../components/SkillFrequencyChart'

export const Home = () => {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false)
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false)
  const [secondsFromTimer, setSecondsFromTimer] = useState(0)
  const [user] = useAuthState(auth)

  const logsRef = collection(db, 'logs')
  const logsRefQuery = query(
    logsRef,
    where('uid', '==', user?.uid || null),
    orderBy('createdAt', 'desc')
  )
  const [logs] = useCollectionData(logsRefQuery)

  return (
    <div className="flex justify-center font-inter">
      <div className="max-w-screen-xl mx-4">
        <div className="flex flex-row gap-4 mt-16 mb-8">
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="bg-zinc-300 px-6 py-2 rounded"
          >
            Log Skill
          </button>
          <button
            onClick={() => setIsTimerModalOpen(true)}
            className="bg-zinc-300 px-6 py-2 rounded"
          >
            Start skill timer
          </button>
        </div>
        <SkillFrequencyChart />
        <LogModal
          isOpen={isLogModalOpen}
          setIsOpen={setIsLogModalOpen}
          secondsFromTimer={secondsFromTimer}
          setSecondsFromTimer={setSecondsFromTimer}
        />
        <TimerModal
          isOpen={isTimerModalOpen}
          setIsOpen={setIsTimerModalOpen}
          setSecondsFromTimer={setSecondsFromTimer}
          openLogModal={() => setIsLogModalOpen(true)}
        />
        <LogTable logs={(logs as SkillLog[]) || []} />
      </div>
    </div>
  )
}
