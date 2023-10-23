import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../config/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import logo from '../assets/SkillChronicle_onLight.svg'

export const Navbar = () => {
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider)
    navigate('/')
  }

  const userSignOut = async () => {
    await signOut(auth)
    navigate('/')
  }

  return (
    <div>
      <div className="flex justify-center h-14 bg-zinc-100">
        <div className="flex w-full justify-between items-center max-w-7xl">
          <img src={logo} className="h-6 ml-6" />
          {user ? (
            <div className="flex flex-row items-center mr-6 gap-4">
              <img
                className="w-6 h-6 rounded-full"
                src={user.photoURL || ''}
                referrerPolicy="no-referrer"
              />
              <button onClick={userSignOut} className="">
                Log out
              </button>
            </div>
          ) : (
            <button onClick={signInWithGoogle} className="mr-6">
              Log in
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
