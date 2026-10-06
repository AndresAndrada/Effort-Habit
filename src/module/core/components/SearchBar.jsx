/* eslint-disable react/prop-types */
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function SearchBar({
  setSearch,
  setSelectedTab,
  placeholder,
}) {
  const handleSearch = (e) => {
    if (setSelectedTab) setSelectedTab('')
    if (setSearch) setSearch(e.target.value)
  }

  return (
    <div className="relative w-full max-w-xs">
      <label htmlFor="search-input" className="sr-only">Buscar</label>
      <input
        id="search-input"
        type="search"
        placeholder={placeholder || 'Buscar...'}
        onChange={handleSearch}
        className="border-2 w-full text-primary dark:text-secondary pl-9 pr-3 bg-white dark:bg-base-100 rounded-xl h-10 text-body-sm outline-none transition-colors duration-200 border-base-300 dark:border-base-600 focus:border-effort-500 focus:ring-2 focus:ring-effort-500/20 placeholder:text-base-400"
      />
      <MagnifyingGlassIcon className="h-4 w-4 text-base-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
    </div>
  )
}
