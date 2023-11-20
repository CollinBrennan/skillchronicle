import { useState } from 'react'
import LogModal from '../components/LogModal'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth } from '../config/firebase'
import { LogTable } from '../components/LogTable'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'
import TimerModal from '../components/TimerModal'
import SkillHistoryChart from '../components/SkillHistoryChart'
import { LogDocData } from '../utils/types'
import SkillFreqChart from '../components/SkillFreqChart'

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
      <div className="max-w-screen-xl w-full mx-4">
        <div className="flex flex-row gap-4 mt-16 mb-8 justify-center md:justify-start">
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

        {user && logs && logs.length > 0 ? (
          <div className="flex flex-col gap-8 pb-16">
            <SkillFreqChart logs={logs as LogDocData[]} />
            <SkillHistoryChart logs={logs as LogDocData[]} />
            <LogTable logs={logs as LogDocData[]} />
          </div>
        ) : (
          <h1>Log a skill to get started!</h1>
        )}

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
      </div>
    </div>
  )
}
