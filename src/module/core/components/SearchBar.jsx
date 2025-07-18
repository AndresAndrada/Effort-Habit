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
      <input
        type="search"
        placeholder={placeholder || 'Buscar...'}
        onChange={handleSearch}
        className="border-2 border-letterPrimary w-full text-secondary pl-8 bg-white rounded-xl h-9 focus:ring-1 focus:ring-primary outline-none"
      />
      <MagnifyingGlassIcon className="h-5 text-secondary absolute left-2 top-1/2 -translate-y-1/2" />
    </div>
  )
}