<script lang="ts">
	import { ChessPiece } from './types';
	import { GameState } from './ChessEngine';

	let userFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b';
	let mouseX: number;
	let mouseY: number;
    let selectedPiece: ChessPiece | null;
	let game = new GameState(userFEN);

	$: game = new GameState(userFEN);

	function handleMouseMovement(event: MouseEvent) {
		mouseX = event.clientX;
		mouseY = event.clientY;
	}

    function selectedPiece(piece: ChessPiece) {
        selectedPiece = piece;
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
						class={`flex h-full items-center justify-center ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[#D9B48A]' : 'bg-[#7D5A3A]'}`}
					>
						{#if cell?.type}
							<span on:click|stopPropagation={() => selectedPiece(cell.type)}>
								<img src={`/src/pieces/${cell.image}.svg`} alt="" class="w-full" />
							</span>
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
		width: 74vh; /* 75% of viewport width */
		position: relative;
		padding: 2rem;
	}

	.chess_board {
		background-color: #3498db; /* Background color of the chessboard */
		width: 100%;
		aspect-ratio: 1; /* Keep the aspect ratio square */
	}
</style>
