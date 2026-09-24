import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate, useLocation } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
export const GoBackLink = ({ color = "#79c2d0", label, fallback = '/' }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const goBack = () => {
    // Si el usuario vino de alguna ruta dentro de la app (location.state.from), volver ahí
    if (location.state?.from) {
      navigate(location.state.from.pathname)
    } else if (window.history.length > 2) {
      // Si hay historial suficiente (más de 2 entradas = no es la primera página visitada)
      navigate(-1)
    } else {
      // Fallback: si entró directo con URL, ir al fallback (dashboard por defecto)
      navigate(fallback)
    }
  }
  return (
    <button
      type="button"
      onClick={goBack}
      className="flex items-center gap-1 h-fit mt-4"
    >
      <ChevronLeftIcon
        className="h-10 bg-white bg-opacity-50 hover:bg-slate-50 p-1 rounded-full transition-all hover:shadow-sm"
        style={{ color }}
      />
      <p className="text-xl font-medium" style={{ color }}>{label}</p>
    </button>
  )
}