import { db, auth, provider } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { timeFromSeconds } from '../utils/dateAndTime'
import { LogDocData } from '../utils/types'
import { signInWithPopup } from 'firebase/auth'

type FormData = {
  skill: string
  hours?: number
  minutes?: number
  notes?: string
}

type LogFormProps = {
  closeModalFunction: any
  secondsFromTimer: number
}

export const LogForm = ({
  closeModalFunction,
  secondsFromTimer,
}: LogFormProps) => {
  const [user] = useAuthState(auth)
  const { hours, minutes } = timeFromSeconds(secondsFromTimer)

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
  }

  const schema = yup.object().shape({
    skill: yup.string().required('Skill name required.'),
    hours: yup
      .number()
      .transform((value, originalValue) => (originalValue === '' ? 0 : value))
      .typeError('Hours must be a number')
      .integer('Hours must be an integer')
      .min(0, 'Hours must be 0 or greater')
      .max(9999, 'Hours must be 9999 or less'),
    minutes: yup
      .number()
      .transform((value, originalValue) => (originalValue === '' ? 0 : value))
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
      const logData: LogDocData = {
        skill: data.skill,
        notes: data.notes ? data.notes : '',
        seconds:
          (data.hours ? data.hours * 3600 : 0) +
          (data.minutes ? data.minutes * 60 : 0),
        createdAt: Timestamp.now(),
        uid: user.uid,
      }
      await addDoc(collection(db, 'logs'), logData)
      closeModalFunction()
    }
  }

  return (
    <form onSubmit={handleSubmit(handleLogSkill)}>
      <p className="mb-1">Create a skill category to start logging</p>
      <input
        className="border-2 border-black py-1 px-2 max-w-sm w-full focus:outline-none"
        placeholder="ex. Skateboarding"
        {...register('skill')}
      />
      <p className="text-red-500">{errors.skill?.message}</p>

      <p className="mt-10 mb-1">How long did you work on this skill?</p>
      <div className="flex flex-row gap-2">
        <div className="flex flex-row border-2 border-black py-1 px-2">
          <input
            className="w-8 focus:outline-none"
            placeholder="X"
            defaultValue={secondsFromTimer > 0 ? hours : undefined}
            {...register('hours')}
          />
          <p>hours</p>
        </div>
        <div className="flex flex-row border-2 border-black py-1 px-2">
          <input
            className="w-8 focus:outline-none"
            placeholder="X"
            defaultValue={secondsFromTimer > 0 ? minutes : undefined}
            {...register('minutes')}
          />
          <p>minutes</p>
        </div>
      </div>
      <p className="text-red-500">{errors.hours?.message}</p>
      <p className="text-red-500">{errors.minutes?.message}</p>

      <p className="mt-10 mb-1">Notes about the session</p>
      <input
        className="border-2 border-black py-1 px-2 w-full focus:outline-none"
        placeholder="ex. I felt really good about this today."
        {...register('notes')}
      />

      <div className="mt-16">
        {user ? (
          <input
            className="bg-scRed text-white px-6 py-2 rounded hover:cursor-pointer"
            type="submit"
            value="Log skill"
          />
        ) : (
          <button
            onClick={signInWithGoogle}
            className="bg-zinc-300 px-6 py-2 rounded"
            type="button"
          >
            Sign in with Google to log
          </button>
        )}
      </div>
    </form>
  )
}
