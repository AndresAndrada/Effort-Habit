export default function Pauser() {
  return (
    <section className="flex flex-col sm:flex-row m-4">
      <button
        type="button"
        // onClick={}
        className="button bg-[#18212b] p-4 rounded-2xl text-white font-medium w-[150px] flex justify-center items-center hover:ring-2 hover:shadow-4xl active:ring-slate-300 mt-4"
      >
        Pauser
      </button>
    </section>
  )
}