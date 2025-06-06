// Importa las funciones necesarias desde 'viem'
import { createPublicClient, createWalletClient, http } from 'viem';
import { base } from 'viem/chains';

// Configura el Public Client (para interactuar con la blockchain pública)
export const publicClient = createPublicClient({
    chain: base,  // Define la red principal de Ethereum
    transport: http(),  // Usa HTTP como medio de transporte para las llamadas RPC
});

// Configura el Wallet Client (para interactuar con cuentas como MetaMask)
export const walletClient = createWalletClient({
    chain: base,
    transport: http(),  // Cambia a 'custom(window.ethereum)' si usas MetaMask u otra wallet
});