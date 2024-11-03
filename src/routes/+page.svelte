<script lang="ts">
	import type { ChessPiece } from './types';
	//import { ChessPiece } from './types';
	import { GameState } from './ChessEngine';

	let userFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b';
	let mouseX: number;
	let mouseY: number;
	// let selectedPiece: ChessPiece | null;
	let game = new GameState(userFEN);

	function handleMouseMovement(event: MouseEvent) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}

	let active_piece: HTMLElement | null = null;
	let Piece: ChessPiece | null = null;
	let current_square = [0, 0];

	function grabPiece(event: MouseEvent, row: number, col: number) {
    Piece = game.board[row][col];
		const element = event.target as HTMLElement;
		if (element.classList.contains('chess-piece')) {
			const x = event.clientX - 25;
			const y = event.clientY - 25;
			element.style.position = 'absolute';
			element.style.left = `${x}px`;
			element.style.top = `${y}px`;

			active_piece = element;
		}
	}

	function movePiece(event: MouseEvent) {
		if (active_piece) {
			const x = event.clientX - 25;
			const y = event.clientY - 25;
			active_piece.style.position = 'absolute';
			active_piece.style.left = `${x}px`;
			active_piece.style.top = `${y}px`;
		}
	}

  // event -> get x and y coordinates for 0,0, and 7,7 
  // get event.clientX and clientY
  // calc row, and col
	function dropPiece(event: MouseEvent) {
		if (active_piece) {
      console.log(current_square);
			game.board[current_square[0]][current_square[1]] = Piece;
			Piece = null;
			active_piece = null;
		}
	}

</script>

<div
	on:mousemove={handleMouseMovement}
	role="button"
	tabindex="0"
	class="flex h-screen items-center justify-center"
>
	<div class="container">
		<div class="text-white">
			{mouseX} : {mouseY}
		</div>
		<div class="chess_board grid grid-cols-8 grid-rows-8">
			{#each game.board as row, rowIndex}
				{#each row as cell, colIndex}
					<div
						on:mousedown={(event) => grabPiece(event, rowIndex, colIndex)}
						on:mousemove={(event) => movePiece(event)}
						on:mouseup={(event) => dropPiece(event)}
						role="button"
						tabindex="0"
						class={`cell flex h-full cursor-default items-center justify-center ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[#D9B48A]' : 'bg-[#7D5A3A]'}`}
					>
						{#if cell?.type}
							<div
								style="background-image: url('/pieces/{cell.image}.svg');
								background-size: cover;
								background-repeat: no-repeat;
								background-position: center;"
								class="chess-piece cursor-grab active:cursor-grabbing"
							></div>
						{/if}
					</div>
				{/each}
			{/each}
		</div>
		<div class="px-20 pt-10">
			<input
				type="text"
				bind:value={userFEN}
				placeholder="Enter FEN key..."
				class="w-full rounded-lg bg-gray-500 px-4 py-2 font-semibold text-white"
			/>
		</div>
	</div>
</div>

<style>
	.container {
		height: 80vh;
		width: 80vh;
	}

	.chess-piece {
		width: 50px;
		height: 50px;
	}

	.chess_board {
		aspect-ratio: 1; /* Keep the aspect ratio square */
	}
</style>
