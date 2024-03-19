<script lang="ts">
  import { resultArr, setting, type Seats } from "../stores/stores";
  import Student from "./student.svelte";
  
  let result: Seats;
  resultArr.subscribe((v) => {
    result = v;
  });
</script>

<div class="cover">
  <div class="front">
    <p>정면(칠판)</p>
  </div>
  <div class="main">
    {#if result?.type === "personal"}
      <div class="col">
        {#each result.mono as col}
          <div class="row">
            {#each col as row}
              {#if row.num !== -1}
                <Student num={0} res={row.num}/>
              {/if}
            {/each}
          </div>
        {/each}
      </div>
    {:else if result?.type === "duo"}
      <div class="duo-col">
        {#each result.duo as col, i}
          <div class="row">
            {#each col as row}
              <div class="duo">
                {#each row as duo}
                  {#if duo.num !== -1}
                    <Student num={i} res={duo.num}/>
                  {/if}
                {/each}
              </div>
            {/each}
          </div>
        {/each}
      </div>
    {:else}
      <div class="teams">
        {#each result.mono as row, i}
          <div class="team">
            {#each row as col}
              {#if col.num !== -1}
                <Student num={i} res={col.num}/>
              {/if}
            {/each}
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  .cover {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 10%;
    height: 100%;
  }

  .front {
    display: flex;
    width: 100%;
    height: 54px;
    margin-top: 12px;
    align-items: center;
    justify-content: center;
  }

  .front > p {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 12px;
    height: 100%;
    width: 100%;
    border-radius: 12px;
    background-color: var(--bg);
    border: 2px solid var(--stroke);
    font-size: 16px;
    font-weight: 700;
  }

  .main {
    width: 100%;
    padding: 36px;
    display: flex;
    justify-content: center;
  }

  .row {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
  }

  .row > * {
    flex-shrink: 1;
  }
  

  .col {
    display: flex;
    align-items: top;
    flex-direction: row;
    justify-content: left;
    gap: 8px;
  }

  .duo-col {
    display: flex;
    max-width: 100%;
    align-items: center;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    gap: 48px;
  }

  .duo-col > * {
    flex-shrink: 1;
  }

  .duo {
    display: flex;
    gap: 4px;
  }

  .teams {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 48px;
  }

  .team {
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr 1fr;
  }
</style>