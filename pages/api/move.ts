import findBestMove from '../../engine/findBestMove'
import httpHandler from '../../utils/httpHandler'

export default httpHandler({
  async get(req, res) {
    const FEN: string = (new Buffer(req.query.fen as string, 'base64')).toString()
    const depth: number = Number(req.query.depth) || 2
    const bestMove = findBestMove(FEN, depth)

    res.status(200).json({ FEN, depth, bestMove })
  }
})
