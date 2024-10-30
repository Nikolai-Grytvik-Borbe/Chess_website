export enum PieceType {
    None,
    Pawn,
    Rook,
    Knight,
    Bishop,
    Queen,
    King,
}

export enum Color {
    Black,
    White,
}

export interface Position {
    row: number;
    col: number;
}

export interface ChessPiece {
    type: PieceType;
    color?: Color;
    image?: string;
    position: Position;
}