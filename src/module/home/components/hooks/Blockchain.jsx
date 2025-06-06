import { createPublicClient, http, getContract } from 'viem';
import { base, mainnet } from 'viem/chains';
import { publicClient, walletClient } from '.././../../../utils/client';
import abi from '../../../../utils/ABI';
import { privateKeyToAccount } from 'viem/accounts';



function Blockchain() {
  // const client = createPublicClient({
  //   chain: base,
  //   transport: http(),
  // })

  const address = '0x667d2183c591109b43B7560830c4C33072E27Ee8';
  // const address = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4';
  // const account = 'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  const account = privateKeyToAccount('0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80');

  // Función para obtener una instancia del contrato
  const contract = getContract({
    abi,
    address,
    publicClient,
  });

  const token = async () => {
    try {
      // Puedes usar el cliente público para obtener datos de la blockchain
      const blockNumber = await publicClient.getBlockNumber();
      console.log(blockNumber, 'CLIENT');
      // Inicializa el contrato con el ABI, la dirección y los clientes
      console.log(contract, 'CONTRACT TOKEN');
    } catch (error) {
      console.error(error);
    }
  };

  const readContractClient = async () => {
    try {
      const data = await publicClient.readContract({
        address,
        abi,
        functionName: 'totalSupply',
      })
      console.log(data, 'READ CONTRACT');
    } catch (error) {
      console.log(error);
    }
  }

  const getBalanceOfUser = async (userAddress) => {
    try {
      const balance = await publicClient.readContract({
        address,
        abi,
        functionName: 'balanceOf',
        args: [userAddress]
      });
      // const balance = await publicClient.getBalance({
      //   address,
      // })
      console.log(balance, 'BALANCE');
      // Convertir el balance de wei a un número legible (por ejemplo, Ether o el token correspondiente)
      const readableBalance = parseFloat(balance) / Math.pow(10, 18);
      console.log(`Balance: ${readableBalance}`);
    } catch (error) {
      console.error('Error al obtener el balance:', error);
      throw error;
    }
  };

  const mint = async (toAddress, amount) => {
    try {
      console.log(`Address ${address}`);
      console.log(`${JSON.stringify(account)}`);
      const result = await publicClient.simulateContract({
        address,
        abi,
        functionName: 'mint',
        arg: [toAddress, amount],
        account,
      })
      console.log(`Se acuñaron ${result} tokens a la dirección ${result}`);
    } catch (error) {
      console.error('Error al acuñar tokens:', error.message);
    }
  };


  const getContractDetails = async () => {
    try {
      const [name, symbol, totalSupply] = await Promise.all([
        contract.read.name(),
        contract.read.symbol(),
        contract.read.totalSupply(),
      ]);

      console.log(`Nombre: ${name}, Símbolo: ${symbol}, Total Supply: ${totalSupply}`);
      return { name, symbol, totalSupply };
    } catch (error) {
      console.error('Error al obtener los detalles del contrato:', error.message);
    }
  };

  return {
    token,
    readContractClient,
    mint,
    getBalanceOfUser,
    getContractDetails,
  };
}

export default Blockchain;