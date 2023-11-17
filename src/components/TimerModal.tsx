import { Dialog } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRef, useState } from 'react'

type TimerInterval = NodeJS.Timeout | null

const TimerModal = ({ isOpen, setIsOpen }: any) => {
  const [hasStarted, setHasStarted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const interval = useRef<TimerInterval>(null)
  var hours = Math.floor(totalSeconds / 3600)
  var minutes = Math.floor((totalSeconds - hours * 3600) / 60) % 60
  var seconds = totalSeconds % 60

  function handleCloseModal() {
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
          <Dialog.Title className="text-4xl font-bold text-center">
            Skill Timer
          </Dialog.Title>

          <div className="flex py-8 flex-row gap-2 justify-center font-bold text-7xl text-center">
            <div>
              <div>{(hours < 10 ? '0' : '') + hours}</div>
              <div className="text-base font-normal">hours</div>
            </div>
            <div className="-translate-y-1">:</div>
            <div>
              <div>{(minutes < 10 ? '0' : '') + minutes}</div>
              <div className="text-base font-normal">minutes</div>
            </div>
            <div className="-translate-y-1">:</div>
            <div>
              <div>{(seconds < 10 ? '0' : '') + seconds}</div>
              <div className="text-base font-normal">seconds</div>
            </div>
          </div>

          <div className="flex flex-row justify-center">
            {!hasStarted ? (
              <button
                onClick={startTimer}
                className="bg-zinc-300 px-6 py-2 rounded"
              >
                Start timer
              </button>
            ) : (
              <div className="flex flex-row gap-2">
                <button className="bg-zinc-300 px-6 py-2 rounded">Stop</button>
                {isPaused ? (
                  <button
                    onClick={startTimer}
                    className="text-white rounded bg-zinc-600 px-6 py-2 rounded`"
                  >
                    Resume timer
                  </button>
                ) : (
                  <button
                    onClick={stopTimer}
                    className="bg-zinc-300 rounded px-6 py-2 rounded`"
                  >
                    Pause timer
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
