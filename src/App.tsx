import s from './app.module.css'
import { Modal, PaymentCredits } from './components'
import { Button } from './components/ui'
import { useStoreModal } from './store'

function App() {
  const { setOpen, isOpen } = useStoreModal()

  const onClickButton = () => {
    setOpen(<PaymentCredits />)
  }

  return (
    <div className={s.app}>
      <Button variant='stroked' onClick={() => onClickButton()}>
        Расчет платежей
      </Button>
      <Modal />
    </div>
  )
}

export default App
