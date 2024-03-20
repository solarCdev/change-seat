<script lang="ts">
  import { resultArr, selected } from "../stores/stores";

  export let num: number;
  export let res: number;

  export let i: number;
  export let j: number;
  export let duo: number | undefined;

  let sel = false;
  let selectedVal: [number, number, number | undefined];

  let toChange: number;

  selected.subscribe((v) => {
    if (v[0] === i && v[1] === j && v[2] === duo) {
      sel = true;
    }
    else {
      sel = false;
    }
    selectedVal = v;
  })
</script>

<button
  type="button"
  class={'per-seat ' + (sel === true ? "selected" : 'style-'+ (num % 12))}
  on:click={() => {
    if (!sel && selectedVal[0] !== -1 && selectedVal[1] !== -1) {
      resultArr.update((prev) => {
        let ret = prev;
        if (duo === undefined) {
          [ret.mono[i][j], ret.mono[selectedVal[0]][selectedVal[1]]] = 
            [ret.mono[selectedVal[0]][selectedVal[1]], ret.mono[i][j]];
        }
        else if (selectedVal[2] !== undefined) {
          [ret.duo[i][j][duo], ret.duo[selectedVal[0]][selectedVal[1]][selectedVal[2]]] = 
            [ret.duo[selectedVal[0]][selectedVal[1]][selectedVal[2]], ret.duo[i][j][duo]];
        }
        return prev;
      })
      selected.set([-1, -1, undefined]);
      sel = false;
    }
    else if (sel) {
      selected.set([-1, -1, undefined]);
    }
    else {
      selected.set([i, j, duo]);
    }
  }}
>
  <p>{res}</p>
</button>

{#if sel}
  <div class="fixed-wrap">
    <h3>바꾸기</h3>
    <input type="number" bind:value={toChange}>
    <button type="button" on:click={() => {selected.set([-1, -1, undefined])}}>취소</button>
    <button
      type="button"
      on:click={() => {
        resultArr.update((prev) => {
          let ret = prev;
          if (duo === undefined) {
            ret.mono[i][j] = toChange;
          }
          return prev;
        })
        selected.set([-1, -1, undefined])
      }}
    >확인</button>
  </div>
{/if}

<style>
  .per-seat {
    display: flex;
    width: 100px;
    height: 60px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    background-color: var(--main);
    color: white;
  }

  .per-seat:hover {
    filter: brightness(80%);
  }

  .selected {
    background-color: #BCFFDB;
    border: 1px solid var(--main);
  }

  .selected > p {
    color: #000;
  }

  p {
    font-size: 32px;
    font-weight: 600;
  }

  .style-0 {
    background-color: var(--main);
    color: #fff;
  }

  .style-1 {
    background-color: #FF6725;
    color: white;
  }

  .style-2 {
    background-color: #FFE925;
    color: #000;
  }

  .style-3 {
    background-color: #FF2525;
    color: #fff;
  }

  .style-4 {
    background-color: #2555FF;
    color: #fff;
  }

  .style-5 {
    background-color: #25FF3B;
    color: #000;
  }

  .style-6 {
    background-color: #E125FF;
    color: #fff;
  }

  .style-7 {
    background-color: #25D8FF;
    color: #000;
  }

  .style-8 {
    background-color: #454545;
    color: #fff;
  }

  .style-9 {
    background-color: #C6FF25;
    color: #000;
  }

  .style-10 {
    background-color: #8525FF;
    color: #fff;
  }

  .style-11 {
    background-color: #FFB525;
    color: #000;
  }
  .fixed-wrap {
    position: fixed;
    border-radius: 12px;
    border: 1px solid var(--stroke);
    width: 120px;
    height: 240px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    background-color: var(--bg);
    top: 5%;
    left: 5%;
    gap: 4px;
  }
</style>