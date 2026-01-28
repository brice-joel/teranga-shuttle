import React from 'react'

const DevisButton = () => {
  return (
     <a href="{{ route('devis.index') }}"
        class="fixed bottom-4 left-4 z-50
          bg-blue-600 hover:bg-blue-700
          text-white font-semibold
          py-3 px-5 rounded-full
          shadow-lg hover:shadow-xl
          transition-all duration-300 ease-in-out
          flex items-center space-x-2
          text-sm md:text-base lg:text-lg
          transform hover:scale-105
          focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75">
        <i class="fas fa-file-invoice-dollar text-white"></i> {{-- Icône Font Awesome pour le devis --}}
        <span class="hidden sm:inline">Demander un Devis</span> {{-- Texte visible sur écrans plus grands --}}
        <span class="sm:hidden">Devis</span> {{-- Texte court pour petits écrans --}}
    </a>
  )
}

export default DevisButton
