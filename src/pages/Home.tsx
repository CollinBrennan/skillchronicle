import { useEffect, useState } from 'react'
import { LogSkillModal } from '../components/LogSkillModal'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { auth } from '../config/firebase'
import { SkillLog, SkillLogTable } from '../components/SkillLogTable'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { db } from '../config/firebase'

export const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user] = useAuthState(auth)

  const logsRef = collection(db, 'logs')
  const logsRefQuery = query(
    logsRef,
    where('uid', '==', user?.uid || null),
    orderBy('createdAt', 'desc')
  )
  const [logs] = useCollectionData(logsRefQuery)

  useEffect(() => console.log(logs))

  return (
    <div className="max-w-7xl flex justify-center">
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-zinc-300 px-6 py-2 rounded m-4"
        >
          Log Skill
        </button>
        <LogSkillModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        <div className="mx-4">
          <SkillLogTable logs={(logs as SkillLog[]) || []} />
        </div>
      </div>
    </div>
  )
}
