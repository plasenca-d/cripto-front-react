import Body from "@/components/layout/Body";
import SectionWithTitle from "@/components/pages/SectionWithTitle";
import { linkEnum } from "@/types/enums/link";
import instanceWithToken from "@/utils/instanceWithToken";
import { Button, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PlanesIndex() {
    let [planes, setPlanes] = useState([]);
    const navigate = useNavigate();
    const getPlanes = () => {
        instanceWithToken.get("planes").then((result) => {
            setPlanes(result.data.data);
            console.log(result.data.data);
        });
    };

    useEffect(() => {
        getPlanes();
    }, []);

    return (
        <>
            <Body pageName={linkEnum.Planes}>
                <SectionWithTitle title="Listado de Planes">
                    <div className="flex justify-end mb-4">
                        <Button onClick={() => navigate('/planes/crear')}>Crear Nuevo</Button>
                    </div>
                </SectionWithTitle>

            </Body>
        </>
    );
}

export default PlanesIndex;
