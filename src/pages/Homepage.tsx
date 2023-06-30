import { useContext } from "react"
import Alert from "../components/ui/Alert"
import Page from "../components/ui/Page"
import DataContext from "../contexts/DataContext"
import Button from "../components/ui/Button"
import { Link } from "react-router-dom"

export default function Homepage() {
  const { data } = useContext(DataContext)
  return (
    <Page className="text-center">
      <Alert level={"warning"}>
        <p>
          Questo progetto è gestito da PoliNetwork e non è in alcun modo
          collegato al Politecnico di Milano. Gli autori del Progetto non si
          assumono alcuna responsabilità, né garantiscono espressamente o
          implicitamente l'accuratezza o l'affidabilità dei contenuti di questo
          sito.
        </p>
        <b>
          Se vuoi controllare la tua posizione nella graduatoria per
          immatricolarti, consulta il sito del Politecnico di Milano
        </b>
      </Alert>

      <hr className="py-4" />

      <h3 className="text-xl font-bold">
        Benvenuto nello storico delle graduatorie del Politecnico di Milano
      </h3>
      <p className="text-lg">Inizia scegliendo la scuola di tuo interesse</p>

      <div className="flex flex-col items-center gap-4 py-4">
        {data?.schools.map(school => (
          <Link to={`view/${school}`} key={school}>
            <Button className="w-32">{school}</Button>
          </Link>
        ))}
      </div>
    </Page>
  )
}
