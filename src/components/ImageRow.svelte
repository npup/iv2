<script lang="ts">
    type ImageData = {
        src: string;
        title?: string;
        noClick?: boolean;
    };
    export let images: ImageData[] = [];
    export let height: number = 100;
    export let justify: "space-evenly" | "center" = "space-evenly";
    export let forceShowEvenOnSmallScreen = false;

    function handleClick(e: MouseEvent) {
        const target = e.target as HTMLInputElement;
        const { src, title } = target;
        showImage = { src, title };
    }
    let showImage: ImageData | null = null;

    function handleClose(e?: Event) {
        if (!e || (e.target as HTMLElement).hasAttribute("data-closer")) {
            showImage = null;
        }
    }
    function handleKeyUp(e: KeyboardEvent) {
        if (e.key == "Escape" || e.key == "Tab") {
            handleClose();
        }
    }
</script>

<svelte:window on:keyup={handleKeyUp} />

<ul
    style="justify-content: {justify}; {forceShowEvenOnSmallScreen
        ? 'display: flex;'
        : ''}"
>
    {#each images as image}
        <li>
            {#if image.noClick}
                <img
                    title={image.title}
                    src={image.src}
                    alt={image.title || "Bild"}
                    style={`height: ${height}px`}
                />
            {:else}
                <input
                    type="image"
                    title={image.title}
                    src={image.src}
                    alt={image.title || "Bild"}
                    style={`height: ${height}px`}
                    on:click={handleClick}
                />
            {/if}
        </li>
    {/each}
</ul>

{#if showImage}
    <div class="modal-overlay fill-screen" />
    <div
        role="button"
        tabindex={0}
        class="modal-base fill-screen"
        data-closer
        on:keypress={handleClose}
        on:click={handleClose}
    >
        <div class="modal-content">
            <input
                type="button"
                class="modal-close"
                data-closer
                title="Stäng"
                on:click={handleClose}
                value="X"
            />
            <div class="modal-main">
                <img src={showImage.src} alt="" />
            </div>
            {#if showImage.title}
                <div class="modal-footer">{showImage.title}</div>
            {/if}
        </div>
    </div>
{/if}

<style>
    ul {
        display: none;
        list-style-type: none;
        gap: 1em;
        align-items: center;
        flex-wrap: wrap;
    }
    li {
        margin: 0;
    }
    li:hover {
        background-color: transparent;
    }
    @media screen and (min-width: 600px) {
        ul {
            display: flex;
        }
    }
    input,
    img {
        border-radius: var(--borderradius_IV_IMAGEROW_IMAGE);
        transition: var(--transition_IV_IMAGEROW_IMAGE);
    }

    input:focus {
        outline: none;
        box-shadow: var(--box-shadow-IV_IMAGEROW_IMAGE_FOCUS);
    }

    input:hover {
        transform: var(--transform-IV_IMAGEROW_IMAGE_HOVER);
    }

    .fill-screen {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
    }
    .modal-close {
        position: absolute;
        top: -8px;
        right: -8px;
        font-size: 1.6em;
        cursor: pointer;
        border-radius: 50%;
        width: 1.2em;
        height: 1.2em;
        color: var(--color-IV_MODAL_CLOSE);
        background-color: var(--bgcolor-IV_MODAL_CLOSE);
        border: 0;
    }

    .modal-base {
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
    }
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: var(--bgcolor-IV_MODAL_BACKDROP);
        opacity: var(--opacity-IV_MODAL_BACKDROP);
        z-index: 1;
    }
    .modal-content {
        background: var(--bgcolor-IV_MODAL_CONTENT);
        color: var(--color-IV_MODAL_CONTENT);
        position: relative;
        box-shadow: var(--box-shadow-IV_MODAL);
        display: flex;
        flex-direction: column;
        max-width: 95vw;
    }
    .modal-main {
        height: 60vh;
        display: flex;
        width: 100%;
        overflow: scroll;
    }
    .modal-main img {
        object-fit: contain;
        height: 100%;
        align-self: stretch;
        flex: 1;
    }

    .modal-footer {
        flex: 0 3em;
        margin: 0;
        display: flex;
        padding: 1em;
        max-width: 40em;
        margin: 0 auto;
    }
</style>
