import React, { Dispatch, SetStateAction } from 'react'

const AuthButton = ({
  setShowAuthModal
}:{
  setShowAuthModal: Dispatch<SetStateAction<boolean>>
}) => {
  return (
    <button
      className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
      onClick={() => setShowAuthModal(true)}
    >
      Se connecter
    </button>
  )
}

export default AuthButton
