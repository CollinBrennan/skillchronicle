import { LogDocData } from '../utils/types'
import { getFormattedDate, getFormattedTime } from '../utils/time'

type LogTableProps = {
  logs: LogDocData[]
}

export const LogTable = ({ logs }: LogTableProps) => {
  return (
    <table className="table-fixed w-full text-sm md:text-base">
      <thead>
        <tr className="bg-zinc-300 text-left">
          <th className="font-normal px-2 py-2">Date</th>
          <th className="font-normal px-2 py-2">Skill</th>
          <th className="font-normal px-2 py-2">Time</th>
          <th className="font-normal px-2 py-2 hidden md:table-cell">Notes</th>
        </tr>
      </thead>
      <tbody>
        {logs.map((log, i) => (
          <tr key={i} className="bg-zinc-100 text-left ">
            <td className="px-2 py-2">{getFormattedDate(log.createdAt)}</td>
            <td className="px-2 py-2 truncate">{log.skill}</td>
            <td className="px-2 py-2">{getFormattedTime(log.seconds)}</td>
            <td className="px-2 py-2 truncate hidden md:table-cell">
              {log.notes}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
