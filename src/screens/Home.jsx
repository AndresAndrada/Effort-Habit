import DesPauser from "../module/home/components/DesPauser";
import Mint from "../module/home/components/Mint";
import Transaction from "../module/home/components/Transaction";
import Token from "../module/home/components/Token";
import Pauser from "../module/home/components/Pauser";
import BalanceOf from "../module/home/components/BalanceOf";
import Details from "../module/home/components/Details";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#233142]">
      <Token />
      <BalanceOf />
      <Mint />
      <Details />
      <Pauser />
      <DesPauser />
      <Transaction />
    </main>
  )
}