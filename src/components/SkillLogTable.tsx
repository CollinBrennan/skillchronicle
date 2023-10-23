import dayjs from 'dayjs'
import { Timestamp } from 'firebase/firestore'

export interface SkillLog {
  createdAt: Timestamp
  skill: string
  hours: number
  minutes: number
  notes: string
}

interface SkillLogTableProps {
  logs: SkillLog[]
}

export const SkillLogTable = ({ logs }: SkillLogTableProps) => {
  function formatTime(hours: number, minutes: number) {
    const formattedMinutes = minutes < 10 ? '0' + minutes.toString() : minutes
    return `${hours}:${formattedMinutes}`
  }

  function formatDate(timestamp: Timestamp) {
    return dayjs(timestamp.toDate()).format('DD/MM/YYYY')
  }

  return (
    <table className="">
      <tr className="">
        <th className="bg-slate-300 text-left px-8 py-2">Date</th>
        <th className="bg-slate-300 text-left px-8 py-2">Skill</th>
        <th className="bg-slate-300 text-left px-8 py-2">Time</th>
        <th className="bg-slate-300 text-left px-8 py-2">Notes</th>
      </tr>
      {logs.map((log) => (
        <tr>
          <td className="bg-slate-100 text-left px-8 py-2">
            {formatDate(log.createdAt)}
          </td>
          <td className="bg-slate-100 text-left px-8 py-2">{log.skill}</td>
          <td className="bg-slate-100 text-left px-8 py-2">
            {formatTime(log.hours, log.minutes)}
          </td>
          <td className="bg-slate-100 text-left px-8 py-2">{log.notes}</td>
        </tr>
      ))}
    </table>
  )
}
