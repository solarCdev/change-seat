<script lang="ts">
  import Aside from "./assets/components/aside.svelte";
  import Seat from "./assets/components/seat.svelte";

  let viewWait = 0;
  
  let wait = () => {
    viewWait = 3;
    setTimeout(() => {
      viewWait--;
    }, 1000);
    setTimeout(() => {
      viewWait--;
    }, 2000);
    setTimeout(() => {
      viewWait--;
    }, 3000);
  }
</script>

<main>
  <link rel="stylesheet" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
  
  {#if viewWait !== 0}
    <div class="wait">
      <h3>{viewWait}</h3>
      자리 바꾸기 결과는...
    </div>
  {/if}
  <header>자리 바꾸기 프로그램!</header>
  <div class="content">
    <Aside waitFn={wait}/>
    <Seat/>
  </div>
</main>

<style>
  @font-face {
      font-family: 'LOTTERIACHAB';
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/LOTTERIACHAB.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
  }

  :global(:root) {
    --bg: #F5F6F9;
    --stroke: #E5E5E5;
    --main: #12D069;
  }

  :global(*){
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    transition: 0.1s ease-in;
    font-family: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
  }

  :global(input[type="text"], input[type="number"], textarea) {
    width: 100%;
    height: 44px;
    border-radius: 12px;
    background-color: var(--bg);
    border: solid 1px var(--stroke);
    padding: 12px;
  }

  :global(textarea) {
    height: 120px;
    resize: none;
  }

  :global(button) {
    width: 100%;
    height: 44px;
    border: none;
    border-radius: 12px;
    background-color: var(--main);
    color: white;
    font-size: 14px;
    font-weight: 600;
  }

  :global(button:hover) {
    cursor: pointer;
    background-color: #129d51;
  }

  :global(h2) {
    font-size: 18px;
    margin-bottom: 24px;
  }

  :global(label) {
    display: flex;
    margin-bottom: 16px;
    flex-direction: column;
    font-size: 14px;
    gap: 8px;
  }

  main {
    width: 100%;
  }

  header {
    width: 100%;
    height: 96px;
    background-color: var(--main);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    font-family: 'LOTTERIACHAB', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }

  .content {
    width: 100%;
    min-height: calc(100vh - 96px);
    display: flex;
  }

  .wait {
    width: 100vw;
    height: 100vh;
    position: fixed;
    background-color: #12d06830;
    backdrop-filter: blur(45px);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 48px;
    font-weight: 700;
  }

  h3 {
    font-size: 84px;
  }
</style>
