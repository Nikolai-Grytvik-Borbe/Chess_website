<script lang="ts">
	//import { ChessPiece } from './types';
	import { GameState } from './ChessEngine';

	let userFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b';
	let mouseX: number;
	let mouseY: number;
	// let selectedPiece: ChessPiece | null;
	let game = new GameState(userFEN);

	$: game = new GameState(userFEN);

	function handleMouseMovement(event: MouseEvent) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}

  let active_piece: HTMLElement | null = null;

  function grabPiece(event: MouseEvent) {
    const element = event.target as HTMLElement;
    if (element.classList.contains("chess-piece")) {
      const x = event.clientX - 50;
      const y = event.clientY - 50;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;

      active_piece = element;
    }
  }

  function movePiece(event: MouseEvent) {
    if (active_piece) {
      const x = event.clientX - 50;
      const y = event.clientY - 50;
      active_piece.style.position = "absolute";
      active_piece.style.left = `${x}px`;
      active_piece.style.top = `${y}px`;
    }
  }

  function dropPiece(event: MouseEvent) {
    if (active_piece) {
      active_piece = null;
    }
  }

	// function selectedPiece(piece: ChessPiece) {
	// selectedPiece = piece;
	// }
</script>

<div
	on:mousemove={handleMouseMovement}
	role="button"
	tabindex="0"
	class="flex justify-center items-center h-screen"
>
	<div class="container">
		<div class="text-white">
			{mouseX} : {mouseY}
		</div>
		<div class="chess_board grid grid-cols-8 grid-rows-8">
			{#each game.board as row, rowIndex}
				{#each row as cell, colIndex}
					<div on:mouseup={dropPiece} on:mousemove={movePiece} on:mousedown={grabPiece} role="button" tabindex="0"
						class={`cell flex h-full items-center justify-center cursor-default ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[#D9B48A]' : 'bg-[#7D5A3A]'}`}
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
    width: 100px;
    height: 100px;
  }

	.chess_board {
    aspect-ratio: 1; /* Keep the aspect ratio square */
	}
</style>
