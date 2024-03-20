<script lang="ts">
  import { setting } from "../stores/stores";

  let primary = 1;
  let secondary = 1;

  $: setting.update((v) => {
    let a = {...v};
    a.primaryCnt = primary;
    a.secondaryCnt = secondary;
    return a;
  })
</script>

<div>
  <h2>모둠</h2>
  <div>
    <div>
      <label for="">
        모둠 갯수
        <br>
        <input type="number" id="" bind:value={primary} min="1">
      </label>
    </div>
    <div>
      <label for="">
        모둠 인원
        <br>
        <input type="number" id="" bind:value={secondary} min="1">
      </label>
    </div>
  </div>
</div>