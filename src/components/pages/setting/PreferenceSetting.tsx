import instanceWithToken from '@/utils/instanceWithToken'
import { Button, FormControl, FormLabel, Input, Select, Switch } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookies from 'js-cookie'
import SectionWithTitle from '../SectionWithTitle'
import ListsWallets from './ListsWallets'

function PreferenceSetting() {
  let [tipo, setTipo] = useState("")
  let [alias, setAlias] = useState("")
  let [wallet, setWallet] = useState("")
  let [banco, setBanco] = useState("")
  let [tipo_cuenta, setTipoCuenta] = useState("")
  let [wallets, setWallets] = useState([])

  const getWallets = () => {
    instanceWithToken.get('auth/profile').then((result) => {
      setWallets(result.data.data.wallets)
    })
  }


  const store = () => {
    let payload = {}
    if (!tipo) {
      withReactContent(Swal).fire({
        title: "Error!",
        text: 'Debes seleccionar primero el tipo de wallet!',
        icon: "error"
      })

      return
    }

    if (tipo == 'cuenta_bancaria') {
      if (!alias, !wallet, !banco, !tipo_cuenta) {
        withReactContent(Swal).fire({
          title: "Error!",
          text: 'Todos los datos deben ser llenados correctamente!',
          icon: "error"
        })

        return
      }

      payload = { alias, wallet, banco, tipo, tipo_cuenta, user: Cookies.get("id") }
    }

    if (tipo == 'wallet_cripto') {
      if (!alias, !wallet) {
        withReactContent(Swal).fire({
          title: "Error!",
          text: 'Todos los datos deben ser llenados correctamente!',
          icon: "error"
        })

        return
      }

      payload = { alias, wallet, tipo, user: Cookies.get("id") }
    }

    instanceWithToken.post("wallets", payload).then((result) => {
      withReactContent(Swal).fire({
        title: "Exito!",
        text: 'Wallet Creada con exito!',
        icon: "success"
      })
      getWallets()
    })

    setTipo("")
    setAlias("")
    setWallet("")
    setBanco("")
    setTipoCuenta("")
  }

  useEffect(() => {
    getWallets()
  }, [])

  return (
    <>
      <div className='space-y-5 pt-5'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <FormControl className='col-span-2'>
            <Select
              value={tipo}
              onChange={(event) => setTipo(event.target.value)}
              placeholder='Seleccione'>
              <option value='cuenta_bancaria'>Cuenta</option>
              <option value='wallet_cripto'>Wallet</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Alias</FormLabel>
            <Input
              value={alias}
              onChange={(event) => setAlias(event.target.value)}
            />
          </FormControl>
          {tipo == 'cuenta_bancaria' &&
            <>
              <FormControl>
                <FormLabel >Banco</FormLabel>
                <Input
                  value={banco}
                  onChange={(event) => setBanco(event.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel >Tipo de Cuenta</FormLabel>
                <Input
                  value={tipo_cuenta}
                  onChange={(event) => setTipoCuenta(event.target.value)}
                />
              </FormControl>
            </>
          }
          <FormControl>
            <FormLabel >{tipo == 'cuenta_bancaria' ? 'Cuenta Bancaria' : 'Wallet Cripto'}</FormLabel>
            <Input
              value={wallet}
              onChange={(event) => setWallet(event.target.value)}
            />
          </FormControl>
        </div>
        <Button className='w-full' onClick={store}>Agregar</Button>
      </div>
      <SectionWithTitle title="Mis Wallets" container={false} className='mt-4'>
        <ListsWallets wallets={wallets} onUpdate={getWallets} />
      </SectionWithTitle>
    </>
  )
}

export default PreferenceSetting