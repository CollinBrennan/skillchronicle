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
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white">
          <div className="flex flex-row items-center pt-4 text-left">
            <Dialog.Title className="px-4 text-2xl font-bold">
              Log Skill
            </Dialog.Title>
            <div className="mb-1 text-sm">{getDate()}</div>
            <CalendarIcon className="mb-1 ml-4 h-5 text-zinc-500" />
            <button className="pl-24 pr-4">
              <XMarkIcon onClick={handleCloseModal} className="h-6" />
            </button>
          </div>

          <LogSkillForm closeModalFunction={handleCloseModal} />
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
