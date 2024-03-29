import { timeFromSeconds } from '../utils/dateAndTime'
import { Dialog } from '@headlessui/react'
import {
  PauseCircleIcon,
  PlayCircleIcon,
  StopCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { useRef, useState } from 'react'

type TimerInterval = NodeJS.Timeout | null

type TimerModalProps = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSecondsFromTimer: React.Dispatch<React.SetStateAction<number>>
  openLogModal: () => void
}

const TimerModal = ({
  isOpen,
  setIsOpen,
  setSecondsFromTimer,
  openLogModal,
}: TimerModalProps) => {
  const [hasStarted, setHasStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const interval = useRef<TimerInterval>(null)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const { hours, minutes, seconds } = timeFromSeconds(totalSeconds)

  function handleClose() {
    if (interval.current) clearInterval(interval.current)
    interval.current = null
    setHasStarted(false)
    setIsPaused(false)
    setTotalSeconds(0)
    setIsOpen(false)
  }

  function startTimer() {
    setHasStarted(true)
    interval.current = setInterval(() => {
      setTotalSeconds((prevSeconds) => prevSeconds + 1)
    }, 1000)
    setIsPaused(false)
  }

  function stopTimer() {
    if (interval.current) clearInterval(interval.current)
    setIsPaused(true)
  }

  function endTimer() {
    setSecondsFromTimer(totalSeconds)
    openLogModal()
    handleClose()
  }

  return (
    <Dialog
      open={isOpen}
      onLoad={() => console.log('loaded!')}
      onClose={handleClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex flex-col mx-2 items-center justify-center">
        <Dialog.Panel className="bg-white p-6 w-full max-w-2xl">
          <div className="flex flex-row-reverse ">
            <XMarkIcon onClick={handleClose} className="h-6 cursor-pointer" />
          </div>
          <Dialog.Title className="text-4xl font-bold text-center">
            Skill Timer
          </Dialog.Title>

          <div className="flex py-8 flex-row gap-2 justify-center font-bold text-7xl text-center">
            <div>
              <div className="text-scBlue">
                {(hours < 10 ? '0' : '') + hours}
              </div>
              <div className="text-base font-normal">hours</div>
            </div>
            <div className="-translate-y-1">:</div>
            <div>
              <div className="text-scBlue">
                {(minutes < 10 ? '0' : '') + minutes}
              </div>
              <div className="text-base font-normal">minutes</div>
            </div>
            <div className="-translate-y-1">:</div>
            <div>
              <div className="text-scBlue">
                {(seconds < 10 ? '0' : '') + seconds}
              </div>
              <div className="text-base font-normal">seconds</div>
            </div>
          </div>

          <div className="flex mt-4 flex-row justify-center">
            {!hasStarted ? (
              <button
                onClick={startTimer}
                className="bg-scBlue border-2 border-scBlue text-white px-6 py-2 flex gap-2 rounded"
              >
                <PlayCircleIcon className="h-6 w-6" />
                Start timer
              </button>
            ) : (
              <div className="flex flex-row gap-4">
                <button
                  onClick={endTimer}
                  className="bg-white border-2 border-neutral-700 px-6 py-2 flex gap-2 rounded"
                >
                  <StopCircleIcon className="h-6 w-6" />
                  Stop
                </button>
                {isPaused ? (
                  <button
                    onClick={startTimer}
                    className="bg-neutral-700 border-2 border-neutral-700 text-white px-6 py-2 flex gap-2 rounded"
                  >
                    <PlayCircleIcon className="h-6 w-6" />
                    Resume
                  </button>
                ) : (
                  <button
                    onClick={stopTimer}
                    className="bg-white border-2 border-neutral-700 px-6 py-2 flex gap-2 rounded"
                  >
                    <PauseCircleIcon className="h-6 w-6" />
                    Pause
                  </button>
                )}
              </div>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

export default TimerModal
