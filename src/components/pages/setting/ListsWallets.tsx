import instanceWithToken from "@/utils/instanceWithToken"
import { Badge, Button } from "@chakra-ui/react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface Wallet {
    id: string;
    alias: string;
    tipo: 'cuenta_bancaria' | 'wallet_cripto';
    wallet: string;
    banco?: string;
    tipo_cuenta?: string;
}

interface ListsWalletsProps {
    wallets: Wallet[];
    onUpdate: () => void;
}

function ListsWallets({ wallets, onUpdate }: ListsWalletsProps) {

    const eliminar = (id: string) => {
        instanceWithToken.delete('wallets/' + id).then((result) => {
            withReactContent(Swal).fire({
                title: "Exito!",
                text: 'Wallet eliminado con exito!',
                icon: "success"
            })
        })
        onUpdate()
    }

    return (
        <div className="bg-white overflow-hidden rounded-lg p-4">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full overflow-hidden" >
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th
                                    className="px-5 py-3 whitespace-nowrap text-left font-semibold text-primary-400"
                                >
                                    Alias
                                </th>
                                <th
                                    className="px-5 py-3 whitespace-nowrap text-left font-semibold text-primary-400 text-lg"
                                >
                                    Tipo
                                </th>
                                <th
                                    className="px-5 py-3 whitespace-nowrap text-left font-semibold text-primary-400 text-lg"
                                >
                                    Id del Wallet
                                </th>
                                <th
                                    className="px-5 py-3 whitespace-nowrap text-left font-semibold text-primary-400 text-lg"
                                >
                                    Info Adicional
                                </th>
                                <th className="px-5 py-3 whitespace-nowrap text-left font-semibold text-primary-400 text-lg">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {wallets.map((wallet, index) => (
                                <tr key={index}>
                                    <td className="px-2 py-2 bg-white">
                                        <p className="text-primary-200"> {wallet.alias} </p>
                                    </td>
                                    <td className="px-2 py-2 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-nowrap">{wallet.tipo === 'cuenta_bancaria' ?
                                            <Badge className="bg-green">CUENTA BANCARIA</Badge> :
                                            <Badge className="bg-red" colorScheme='red'>WALLET CRIPTO</Badge>}</p>
                                    </td>
                                    <td className="px-2 py-2 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-nowrap">{wallet.wallet}</p>
                                    </td>
                                    <td className="px-2 py-2 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-nowrap">{wallet.tipo === 'cuenta_bancaria' &&
                                            <>
                                                {wallet.banco} - {wallet.tipo_cuenta}
                                            </>}
                                        </p>
                                    </td>

                                    <td className="px-2 py-2 bg-white text-sm text-right">
                                        <button onClick={() => eliminar(wallet.id)} className="mx-auto flex items-center justify-center py-2 px-4 rounded-full border-2 border-red-400 text-red-400 text-center">Eliminar</button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ListsWallets
