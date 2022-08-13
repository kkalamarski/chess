import findBestMove from '../../engine/findBestMove'
import httpHandler from '../../utils/httpHandler'

const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
const depth = 2

export default httpHandler({
  async get(_req, res) {
    const bestMove = findBestMove(FEN, depth)

    res.status(200).json({ FEN, depth, bestMove })
  }
})
