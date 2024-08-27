import React from 'react'; // Asegúrate de importar React
import {
    ArrowUpIcon,
    ArrowDownIcon,
    AccountOIcon,
    AccountIcon
} from "@/assets/icons";
import { format } from 'date-fns';

type Referido = {
    user: {
        firstName: string;
        lastName: string;
        created_at: string;
        plan: {
            titulo: string;
            precio: number;
        };
    };
    nivel: string;
};

interface ReferidosTableProps {
    referidos: Referido[];
}

const ReferidosTable: React.FC<ReferidosTableProps> = ({ referidos }) => {
    return (
        <div className="bg-white overflow-hidden rounded-lg p-4">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr className="border-b-2 border-gray-200">
                                <th className="px-5 py-3 whitespace-nowrap text-left font-semibold text-primary-400">
                                    Usuario
                                </th>
                                <th className="px-5 py-3 whitespace-nowrap text-left font-semibold text-primary-400 text-lg">
                                    Fecha
                                </th>
                                <th className="px-5 py-3 whitespace-nowrap text-left font-semibold text-primary-400 text-lg">
                                    Plan
                                </th>
                                <th className="px-5 py-3 whitespace-nowrap text-left font-semibold text-primary-400 text-lg">
                                    Nivel
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {referidos && referidos.length > 0 ? (
                                referidos.map((referido, index) => (
                                    <tr key={index}>
                                        <td className="px-5 py-5 bg-white">
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center flex-shrink-0 text-primary-400 w-10 h-10">
                                                    <AccountIcon />
                                                </div>
                                                <p className="text-primary-200">
                                                    {referido.user.firstName} {referido.user.lastName}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-nowrap">
                                                {referido.user.created_at ? format(new Date(referido.user.created_at), 'dd-MM-yyyy HH:mm') : 'Fecha no disponible'}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-nowrap">
                                                {referido.user.plan ? referido.user.plan.titulo : 'Sin Plan contratado'}
                                            </p>
                                        </td>
                                        <td className="px-5 py-5 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-nowrap">
                                                {referido.nivel || 'Nivel no disponible'}
                                            </p>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-5 py-5 text-center text-gray-500">
                                        No hay referidos disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ReferidosTable;
