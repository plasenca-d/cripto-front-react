import Copy from "@/assets/icons/Copy";
import Body from "@/components/layout/Body";
import ReferidosTable from "@/components/pages/referidos/ReferidosTable";
import SectionWithTitle from "@/components/pages/SectionWithTitle";
import { TransactionTable } from "@/components/pages/transaction";
import { linkEnum } from "@/types/enums/link";
import instanceWithToken from "@/utils/instanceWithToken";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export function Referidos() {
    const baseURL = `${window.location.protocol}//${window.location.host}`;
    const username = Cookies.get("username");
    const [referidos, setReferidos] = useState([])
    const getReferidos = () => {
        instanceWithToken.get('referers-level').then((result) => { setReferidos(result.data.data) })
    };

    useEffect(() => {
        getReferidos();
    }, []);

    const handleCopy = () => {
        const referidosLink = username ? `${baseURL}/referidos/${username}` : "";
        if (referidosLink) {
            navigator.clipboard.writeText(referidosLink).then(() => {
                withReactContent(Swal).fire({
                    title: "Exito!",
                    text: "Has copiado tu link de referido!",
                    icon: "success"
                })
            }).catch(err => {
                console.error('Error al copiar al portapapeles: ', err);
            });
        }
    };

    return (
        <Body pageName={linkEnum.Dashboard}>
            <SectionWithTitle title="Link de Referidos">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <b>Link de Referido: </b>
                    <span style={{ marginRight: 10 }}>
                        {username ? `${baseURL}/referidos/${username}` : "No hay un usuario disponible"}
                    </span>
                    <div onClick={handleCopy} style={{ cursor: 'pointer' }}>
                        <Copy />
                    </div>
                </div>
            </SectionWithTitle>

            <SectionWithTitle title="Listado de Referidos">
                <ReferidosTable referidos={referidos} />
            </SectionWithTitle>
        </Body>
    );
}
