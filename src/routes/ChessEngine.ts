// TODO: castling rights, en passant, half move count, full move count
import { Color, PieceType, Position, ChessPiece } from "./types";

type ChessBoard = (ChessPiece | null)[][];

export class GameState {
    board: ChessBoard;
    whiteToMove: boolean;
    static defaultFEN: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w QKk - 0 1";
    // static defaultFEN: string = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w QKk e3 0 1";

    // castlingRights: string;
    // enPassantTargetSquare: number[] | null;
    // moveCount: number;
    // halfMoveCount: number;

    constructor(startingFEN: string = GameState.defaultFEN) {
        this.board = this.loadBoardFromFEN(startingFEN)[0];
        this.whiteToMove = this.loadBoardFromFEN(startingFEN)[1];
        // this.castlingRights = this.loadBoardFromFEN(startingFEN)[2];
        // this.enPassantTargetSquare = this.loadBoardFromFEN(startingFEN)[3];
        // this.moveCount = 0;
        // this.halfMoveCount = 0;
    }

    loadBoardFromFEN(FEN: string): [ChessBoard, boolean] {
        let board: ChessBoard = [[], [], [], [], [], [], [], []];
        let fenBoard = FEN.split(" ")[0];
        let whiteToMove: boolean = FEN.split(" ")[1] === "w" ? true : false;
        const pieceTypeFromSymbol: Record<string, PieceType> = {
            k: PieceType.King, q: PieceType.Queen, r: PieceType.Rook,
            b: PieceType.Bishop, n: PieceType.Knight, p: PieceType.Pawn,
        };

        // let castlingRights = FEN.split(" ")[2];
        // let enPassantTargetSquare = FEN.split(" ")[3]; convert standard chess notation to indicies

        let file = 0;
        let rank = 0;
        for (const char of fenBoard) {

            if (char === "/") {
                file = 0;
                rank++;
            } else {
                if (!isNaN(Number(char))) {
                    let pieceType: PieceType = PieceType.None;
                    let position: Position = { row: rank, col: file };
                    let chessPiece: ChessPiece = { type: pieceType, position: position };
                    for (let i = 0; i < Number(char); i++) {
                        board[rank].push(chessPiece);
                        file++;
                    }
                } else {
                    let pieceColor: Color = char === char.toUpperCase() ? Color.White : Color.Black;
                    let pieceType: PieceType = pieceTypeFromSymbol[char.toLowerCase()];
                    let position: Position = { row: rank, col: file };
                    let image: string = pieceColor === Color.White ? `w${char.toUpperCase()}` : `${char}`;
                    let chessPiece: ChessPiece = { type: pieceType, color: pieceColor, position: position, image: image };
                    board[rank].push(chessPiece);
                    file++;
                }
            }
        }
        return [board, whiteToMove];
    }
}
