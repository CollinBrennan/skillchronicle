import { db, auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { timeFromSeconds } from '../utils/time'

interface FormData {
  skill: string
  hours?: number
  minutes?: number
  notes?: string
}

interface LogFormProps {
  closeModalFunction: any
  secondsFromTimer: number
}

export const LogForm = ({
  closeModalFunction,
  secondsFromTimer,
}: LogFormProps) => {
  const [user] = useAuthState(auth)
  const { hours, minutes } = timeFromSeconds(secondsFromTimer)

  const schema = yup.object().shape({
    skill: yup.string().required('Skill name required.'),
    hours: yup
      .number()
      .typeError('Hours must be a number')
      .integer('Hours must be an integer')
      .min(0, 'Hours must be 0 or greater')
      .max(99, 'Hours must be 99 or less'),
    minutes: yup
      .number()
      .typeError('Minutes must be a number')
      .integer('Minutes must be an integer')
      .min(0, 'Minutes must be 0 or greater')
      .max(59, 'Minutes must be 59 or less'),
    notes: yup.string(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const handleLogSkill = async (data: FormData) => {
    if (user) {
      await addDoc(collection(db, 'logs'), {
        skill: data.skill,
        notes: data.notes,
        hours: data.hours,
        minutes: data.minutes,
        createdAt: Timestamp.now(),
        uid: user.uid,
      })
      closeModalFunction()
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogSkill)}>
      <p className="mb-1">Create a skill category to start logging</p>
      <input
        className="border-2 border-black py-1 px-2 max-w-sm w-full"
        placeholder="ex. Skateboarding"
        {...register('skill')}
      />
      <p className="text-red-500">{errors.skill?.message}</p>

      <p className="mt-10 mb-1">How long did you work on this skill?</p>
      <div className="flex flex-row gap-2">
        <input
          className="w-24 border-2 border-black py-1 px-2"
          placeholder="1 Hour"
          value={secondsFromTimer > 0 ? hours : undefined}
          {...register('hours')}
        />
        <input
          className="w-24 border-2 border-black py-1 px-2"
          placeholder="2 Minutes"
          value={secondsFromTimer > 0 ? minutes : undefined}
          {...register('minutes')}
        />
      </div>
      <p className="text-red-500">{errors.hours?.message}</p>
      <p className="text-red-500">{errors.minutes?.message}</p>

      <p className="mt-10 mb-1">Notes about the session</p>
      <input
        className="border-2 border-black py-1 px-2 w-full"
        placeholder="ex. I felt really good about this today."
        {...register('notes')}
      />

      <div className="mt-16">
        <input
          className="bg-zinc-300 px-6 py-2 rounded hover:cursor-pointer"
          type="submit"
          value="Log skill"
        />
      </div>
    </form>
  )
}
