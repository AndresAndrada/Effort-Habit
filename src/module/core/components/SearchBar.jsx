/* eslint-disable react/prop-types */
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

export default function SearchBar({
  setSearch,
  setSelectedTab,
}) {
  const handleSearch = (e) => {
    if (setSelectedTab) setSelectedTab('')
    if (setSearch) setSearch(e.target.value)
  }

  return (
    <div className="relative w-[994px] max-w-full">
      <input
        type="search"
        placeholder="Buscar ejercicio por nombre"
        onChange={handleSearch}
        className="border-2 border-secondary text-secondary pl-8 w-[994px] max-w-full bg-white rounded-lg h-9 focus:ring-1 focus:ring-primary outline-none"
      />
      <MagnifyingGlassIcon className="h-5 text-secondary absolute left-2 top-1/2 -translate-y-1/2" />
    </div>
  )
}