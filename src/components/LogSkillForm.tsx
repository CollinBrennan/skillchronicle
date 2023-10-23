import { db, auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Timestamp, addDoc, collection } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

interface FormData {
  skill: string
  hours?: number
  minutes?: number
  notes?: string
}

interface LogSkillFormProps {
  closeModalFunction: any
}

export const LogSkillForm = ({ closeModalFunction }: LogSkillFormProps) => {
  const [user] = useAuthState(auth)

  const schema = yup.object().shape({
    skill: yup.string().required('Skill name required.'),
    hours: yup
      .number()
      .integer()
      .min(0)
      .max(99)
      .transform((value) => (Number.isNaN(value) ? 0 : value)),
    minutes: yup
      .number()
      .integer()
      .min(0)
      .max(59)
      .transform((value) => (Number.isNaN(value) ? 0 : value)),
    notes: yup.string(),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  })

  const onLogSkill = async (data: FormData) => {
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
    <form onSubmit={handleSubmit(onLogSkill)} className="flex flex-col p-4">
      <p className="text-small">Create a skill category to start logging</p>
      <input
        className="p-2 border-2 border-black"
        placeholder="Skill"
        {...register('skill')}
      />
      <p className="text-red-500">{errors.skill?.message}</p>

      <p className="text-small pt-8">How long did you work on this skill?</p>
      <div className="flex flex-row space-x-4">
        <input
          className="p-2 border-2 border-black"
          placeholder="X Hours"
          {...register('hours')}
        />
        <input
          className="p-2 border-2 border-black"
          placeholder="X Minutes"
          {...register('minutes')}
        />
      </div>
      <p className="text-red-500">{errors.hours?.message}</p>
      <p className="text-red-500">{errors.minutes?.message}</p>

      <p className="text-small pt-8">Notes about the session</p>
      <input
        className="p-2 border-2 border-black"
        placeholder="Notes"
        {...register('notes')}
      />

      <div className="pt-4">
        <input
          className="bg-zinc-300 px-6 py-2 rounded hover:cursor-pointer"
          type="submit"
          value="Log skill"
        />
      </div>
    </form>
  )
}
