import { Dialog } from '@headlessui/react'
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { LogSkillForm } from './LogSkillForm'
import dayjs from 'dayjs'

export const LogSkillModal = ({ isOpen, setIsOpen }: any) => {
  function handleCloseModal() {
    setIsOpen(false)
  }

  function getDate() {
    const date = dayjs().format('dddd, MMMM DD, YYYY')
    return date
  }

  return (
    <Dialog open={isOpen} onClose={handleCloseModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <Dialog.Panel className="bg-white p-6">
          <div className="flex flex-row-reverse ">
            <XMarkIcon onClick={handleCloseModal} className="h-6" />
          </div>
          <div className="grid grid-rows-2 mb-4">
            <Dialog.Title className="text-2xl font-bold">
              Log Skill
            </Dialog.Title>
            <div className="flex flex-row gap-4">
              <div>{getDate()}</div>
              <CalendarIcon className="h-5 text-zinc-500" />
            </div>
          </div>
          <LogSkillForm closeModalFunction={handleCloseModal} />
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
