import { useRouter } from 'next/router'
import ComputerGame from '../../src/games/ComputerGame'
import ComputerGameProvider from '../../src/providers/ComputerGameProvider'

const Wrapper: React.FC<{
  ai: string
  timeControl: string
  side: string
}> = ({ ai, timeControl, side }) => (
  <ComputerGameProvider>
    <ComputerGame ai={ai} timeControl={timeControl} side={side} />
  </ComputerGameProvider>
)

const Chess = () => {
  const { query } = useRouter()

  const { ai, timeControl, side } = query as {
    ai: string
    timeControl: string
    side: string
  }

  if ([ai, timeControl, side].some(x => !x)) {
    return <div />
  }


  return <Wrapper ai={ai} timeControl={timeControl} side={side} />
}

export default Chess
