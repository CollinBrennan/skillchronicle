import { Dialog } from '@headlessui/react'
import { CalendarIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { LogForm } from './LogForm'
import dayjs from 'dayjs'

const LogModal = ({ isOpen, setIsOpen }: any) => {
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

      <div className="fixed inset-0 flex flex-col mx-2 items-center justify-center">
        <Dialog.Panel className="bg-white p-6 w-full max-w-2xl">
          <div className="flex flex-row-reverse ">
            <XMarkIcon
              onClick={handleCloseModal}
              className="h-6 cursor-pointer"
            />
          </div>
          <div className="flex flex-col sm:gap-x-4 sm:flex-row sm:items-end mb-10">
            <Dialog.Title className="text-4xl font-bold">
              Log Skill
            </Dialog.Title>
            <div className="flex flex-row gap-4">
              <div>{getDate()}</div>
              <CalendarIcon className="h-5 text-zinc-500" />
            </div>
          </div>
          <LogForm closeModalFunction={handleCloseModal} />
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default LogModal
