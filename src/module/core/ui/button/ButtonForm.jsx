/* eslint-disable react/prop-types */

export const ButtonForm = ({ onClick, children, disabled }) => {
	return (
		<button
			disabled={disabled && disabled}
			className='btn flex w-full h-11 justify-center items-center gap-2 rounded-xl border-0 bg-effort-600 text-white font-semibold hover:bg-effort-700 shadow-lg shadow-effort-600/25 active:scale-[0.98] transition-all duration-200 focus-ring disabled:opacity-50 disabled:cursor-not-allowed'
			type="submit"
			onClick={onClick}
		>{children}</button>
	)
}
