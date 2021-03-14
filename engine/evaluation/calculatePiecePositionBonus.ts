import mapArrayToChessboard from '../../common/mapArrayToChessboard'
import pieceSquareTables from './pieceSquareTables'

const isWhitePiece = (piece: string) => /[A-Z]/.test(piece)

const isEndgame = (pieces: { [x: string]: string }) => {
  const remainingPieces = Object.values(pieces)

  const noQueens =
    !remainingPieces.includes('q') && !remainingPieces.includes('Q')

  const maxOneMinorWhite =
    remainingPieces.filter((piece) => ['N', 'B', 'R'].includes(piece)).length <=
    1

  const maxOneMinorBlack =
    remainingPieces.filter((piece) => ['n', 'b', 'r'].includes(piece)).length <=
    1

  return noQueens || maxOneMinorWhite || maxOneMinorBlack
}

const calculatePiecePositionBonus = (pieces: { [x: string]: string }): number =>
  Object.entries<string>(pieces)
    .map(([pos, piece]): number => {
      const isWhite = isWhitePiece(piece)
      const lowerPiece = piece.toLowerCase()

      let squareTable = pieceSquareTables?.[lowerPiece]

      const endgame = isEndgame(pieces)

      if (endgame && lowerPiece === 'k') {
        squareTable = pieceSquareTables?.ke
      }

      if (!squareTable) return 0

      if (!isWhite) {
        squareTable = [...squareTable].reverse()
      }

      const squareValues = mapArrayToChessboard(squareTable)
      const piecePositionBonus = squareValues[pos]

      return piecePositionBonus * (isWhite ? 1 : -1)
    })
    .reduce((total, current) => total + current, 0)

export default calculatePiecePositionBonus
