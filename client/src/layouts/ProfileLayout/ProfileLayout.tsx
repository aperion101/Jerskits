import { useAppSelector } from '../../App/hooks'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import ProfileLinks from '../../utils/profile-links'
import { useSignOutMutation } from '../../services'
import { ProfileLink } from '../../components'
import { ArrowDown } from '../../icons'

function ProfileLayout() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)
  const location = useLocation()
  const profile = useAppSelector((state) => state.profile)
  const userAvatar = profile.avatar
  const [signOut] = useSignOutMutation()

  if (!isAuthenticated)
    return <Navigate to='/' state={{ from: location }} replace />

  return (
    <div className='mx-auto max-w-[950px] my-24'>
      <div className='flex justify-between'>
        <div className='w-[350px]'>
          <div className='flex flex-col space-y-7'>
            <div className='flex items-center'>
              <div className='flex items-center justify-center w-14 h-14 bg-[#e4e6e7] rounded-full'>
                {userAvatar !== '' ? (
                  <img
                    crossOrigin='anonymous'
                    className='object-cover w-full h-full rounded-full'
                    src={`${import.meta.env.VITE_SERVER_URL.replace(
                      '/api',
                      ''
                    )}/images/${userAvatar}`}
                  />
                ) : (
                  <div className='bg-[#e4e6e7] rounded-full w-[100px] h-[100px]'>
                    <img
                      src='/images/blank-profile-picture.png'
                      className='w-10 h-10'
                    />
                  </div>
                )}
              </div>
              <h1 className='ml-5 font-bold capitalize text-primary-black text-text-xl'>
                Hi, {profile.fullName}
              </h1>
            </div>
            {ProfileLinks.map((link, index) => (
              <ProfileLink {...link} key={index} />
            ))}
            <button
              className='flex justify-between duration-100 ease-in-out font-bold text-lg leading-[150%] text-primary-black'
              onClick={() => signOut()}
            >
              Logout{' '}
              <ArrowDown
                className='-rotate-90 opacity-30'
                width={22}
                height={22}
              />
            </button>
          </div>
        </div>
        <div className='w-full max-w-[400px]'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout
