import { forwardRef } from 'react'
import { useAppSelector } from '../../App/hooks'
import { RootState } from '../../App/store'
import { ArrowDown, Close, MagnifySearch } from '../../icons'
import { NavLink } from 'react-router-dom'
import { cn } from '../../utils/utils'

type Props = {
  searchInput: [string, setState<string>]
  isOpenState: [boolean, setState<string>]
  handlePopups: (arg: keyof TPopups) => void
  handleSearch: () => void
  handleSearchModal: setState<boolean>
}

const NavbarMenu = forwardRef<HTMLDialogElement, Props>(
  (
    { searchInput, isOpenState, handlePopups, handleSearch, handleSearchModal },
    ref
  ) => {
    const { avatar, fullName, firstName, createdAt } = useAppSelector(
      (state: RootState) => state.profile
    )
    const joinedYear = new Date(createdAt || Date.now()).getFullYear()
    const [searchInputValue, setSearchInputValue] = searchInput
    const [isOpen, setIsOpen] = isOpenState
    const isAuthenticated = useAppSelector(
      (state: RootState) => state.auth.isAuthenticated
    )
    const bagItemLength = useAppSelector(
      (state: RootState) => state.user.bag?.items.length
    )

    const handleSearching = () => {
      handleSearchModal(true)
      handleSearch()
    }

    return (
      <dialog
        open={true}
        ref={ref}
        className={cn(
          'fixed top-0 h-screen w-[384px] bg-white z-[800] transition-all, -left-[200%] duration-1000',
          { 'left-0 duration-500': isOpen }
        )}
        style={{ insetInlineEnd: 'unset' }}
      >
        <div className='flex flex-col flex-start gap-8 p-[30px]'>
          <div className='flex justify-between'>
            <h1 className='font-bold font-lg text-primary-black'>Menu</h1>{' '}
            <button onClick={() => setIsOpen(false)}>
              <Close />
            </button>
          </div>
          <div className='flex items-center justify-between'>
            {avatar ? (
              <img
                className='object-contain w-16 h-16 rounded-full'
                crossOrigin='anonymous'
                src={`${import.meta.env.VITE_SERVER_URL.replace(
                  '/api',
                  ''
                )}/images/${avatar}`}
              />
            ) : (
              <div className='bg-[#e4e6e7] w-16 h-16 p-4 rounded-full'>
                <img src='/images/blank-profile-picture.png' />
              </div>
            )}
            <div className='w-full ml-5'>
              <h2 className='text-2xl font-bold leading-9 capitalize text-primary-black line-clamp-1'>
                Hi, {firstName ?? fullName}
              </h2>
              <p className='leading-[21px] text-sm text-primary-black'>
                Member since {joinedYear}
              </p>
            </div>
            <button
              className='-rotate-90'
              onClick={() => handlePopups('profile')}
            >
              <ArrowDown
                width={24}
                height={24}
                strokeClassName='stroke-neutral-grey'
              />
            </button>
          </div>
          <div className='relative flex items-center'>
            <input
              className='w-full h-12 px-5 py-4 text-sm border focus:border-primary-black border-neutral-soft-grey focus:ring-0'
              placeholder='Search name product, or etc'
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
            />
            <button
              type='button'
              className='absolute right-5'
              aria-label='search'
              disabled={searchInputValue.length === 0}
              onClick={handleSearching}
            >
              <MagnifySearch width={24} height={24} />
            </button>
          </div>
          {isAuthenticated && (
            <>
              <button
                className='text-lg font-bold text-primary-black text-start'
                onClick={() => handlePopups('bag')}
              >
                My Bags ({bagItemLength === 0 ? '' : `${bagItemLength} Items`})
              </button>
              <button
                className='text-lg font-bold text-primary-black text-start'
                onClick={() => handlePopups('favorites')}
              >
                Favorites
              </button>
            </>
          )}
          <NavLink className='text-lg font-bold text-primary-black' to='/men'>
            Men
          </NavLink>
          <NavLink className='text-lg font-bold text-primary-black' to='/women'>
            Women
          </NavLink>
          <NavLink className='text-lg font-bold text-primary-black' to='/kid'>
            Kids
          </NavLink>
        </div>
      </dialog>
    )
  }
)

export default NavbarMenu
