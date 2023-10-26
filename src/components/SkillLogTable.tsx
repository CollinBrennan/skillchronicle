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
    <table className="table-fixed w-full">
      <thead>
        <tr className="">
          <th className="bg-zinc-300 text-left px-2 py-2">Date</th>
          <th className="bg-zinc-300 text-left px-2 py-2">Skill</th>
          <th className="bg-zinc-300 text-left px-2 py-2 w-16">Time</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log) => (
          <>
            <tr>
              <td className="bg-zinc-100 text-left px-2 py-2">
                {formatDate(log.createdAt)}
              </td>
              <td className="bg-zinc-100 text-left px-2 py-2 truncate">
                {log.skill}
              </td>
              <td className="bg-zinc-100 text-left px-2 py-2">
                {formatTime(log.hours, log.minutes)}
              </td>
            </tr>
            <tr>
              <th colSpan={3} className="bg-zinc-300 text-left px-2 py-2">
                Notes
              </th>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="bg-zinc-100 text-left px-2 py-2 truncate"
              >
                {log.skill + 'difjhkldsffjlasdflasd;fjldsfjl;sda'}
              </td>
            </tr>
          </>
        ))}
      </tbody>
    </table>
  )
}
