/* eslint-disable react/prop-types */

export const ButtonForm = ({ onClick, children, disabled }) => {
	return (
		<button
			disabled={disabled && disabled}
			className='btn flex w-full p-[0.5rem 1rem] h-10 justify-center items-center gap-2 rounded-[0.625rem] bg-secondary text-white hover:bg-tertiary'
			type="submit"
			onClick={onClick}
		>{children}</button>
	)
}
