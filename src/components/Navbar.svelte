<script lang="ts">
    import Hamburger from './Hamburger.svelte';
    import Cross from './Cross.svelte';

    let color = "white";
    let size = 24;

    let toggle_hamburger = false;

</script>

<div class="block md:hidden">
  <!-- Mobile Navbar -->
    <div class="fixed w-full ">
        <div class="flex justify-between m-4 h-12 px-4 items-center rounded-2xl border border-gray-700">
            <div><img src="" alt="">Logo</div>
            <button on:click={() => toggle_hamburger = !toggle_hamburger}>
                <Hamburger size={size} color={color}/>
            </button>
        </div>
    </div>
    {#if toggle_hamburger}
        <div class="bg-black text-white fixed top-0 right-0 h-full w-72 z-50 shadow-lg border-l border-gray-700">
            <button
                on:click={() => toggle_hamburger = !toggle_hamburger} class="p-4 text-white absolute top-0 right-0">
                <Cross size={size} color={color} />
            </button>

            <ul class="pt-20 pl-6">
                <li class="py-4"><a href="#home">Home</a></li>
                <li class="py-4"><a href="#contact">Contact</a></li>
            </ul>
        </div>
    {/if}

</div>

<div class="hidden md:block">
  <!-- Desktop Navbar -->
   <div class="fixed w-">

   </div>
</div>