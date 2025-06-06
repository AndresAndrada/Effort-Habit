import Blockchain from "./hooks/Blockchain"

export default function Token() {
  const { token, readContractClient } = Blockchain();
  return (
    <section className="w-auto flex flex-col sm:flex-row ml-4">
      <button
        type="button"
        onClick={() => {
          token();
          readContractClient();
        }}
        className="button bg-[#18212b] p-4 rounded-2xl text-white font-medium w-[150px] flex justify-center items-center hover:ring-2 hover:shadow-4xl active:ring-slate-300 mt-4"
      >
        Token
      </button>
    </section>
  )
}