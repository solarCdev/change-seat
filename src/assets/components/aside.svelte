<script lang="ts">
  import { resultArr, setting, type Seats, type Setting, type TypeEnum, selected } from "../stores/stores";
  import Duo from "./duo.svelte";
  import Group from "./group.svelte";
  import Personal from "./personal.svelte";
  import Seat from "./seat.svelte";


  export let waitFn: () => void;

  let type: TypeEnum = "personal";
  let studentStartNum = 1;
  let studentEndNum = 1;
  let studentExcept = "";

  let wait = true;

  
  $: setting.update((v) => {
    let a = {...v};
    a.type = type;
    a.studentStartNum = studentStartNum ? studentStartNum : 1;
    a.studentEndNum = studentEndNum ? studentEndNum : 1;
    a.studentExcept = studentExcept.replace(" ", "").split(",").map(v => parseInt(v));
    a.wait = wait;
    return a;
  })

  let nowSetting: Setting;

  setting.subscribe(v => {
    nowSetting = v;
  })

  const onClick = () => {
    resultArr.update(() => {
      let v: Seats = {duo: [[[]]], mono: [[]], type: "duo"};
      for (let i = 0; i < nowSetting.primaryCnt; i++) {
        v.mono.push([]);
        for (let j = 0; j < nowSetting.secondaryCnt; j++) {
          v.mono[i].push(-1);
        }
      }
      for (let i = 0; i < nowSetting.primaryCnt; i++) {
        v.duo.push([]);
        for (let j = 0; j < nowSetting.secondaryCnt; j++) {
          v.duo[i].push([]);
          for (let k = 0; k < 2; k++) {
            v.duo[i][j].push(-1);
          }
        }
      }
      v.type = nowSetting.type;
      return v;
    });
    if (nowSetting.type === 'personal' || nowSetting.type === 'group') {
      let idx = 0;
      let N = nowSetting.studentEndNum - nowSetting.studentStartNum + 1;
      let numbers: boolean[] = Array<boolean>();
      for (let i = 0; i <= nowSetting.studentEndNum; i++) {
        numbers.push(false);
      }
      let exc = 0;
      for (const v of nowSetting.studentExcept) {
        if (isNaN(v)) {
          continue;
        }
        numbers[v] = true;
        exc++;
      }
      numbers[0] = true;
      for (let i = 0; i < nowSetting.primaryCnt; i++) {
        for (let j = 0; j < nowSetting.secondaryCnt; j++) {
          if (idx >= (N - exc)) {
            break;
          }
          let selected: number = 0;
          while (numbers[selected]) {
            selected = Math.floor(Math.random() * (nowSetting.studentEndNum - nowSetting.studentStartNum + 1) + nowSetting.studentStartNum)
          }
          resultArr.update((v) => {
            v.mono[i][j] = selected;
            return v;
          })
          numbers[selected] = true;
          
          idx++;
        }
      }
    }
    if (nowSetting.type === 'duo') {
      let idx = 0;
      let N = nowSetting.studentEndNum - nowSetting.studentStartNum + 1;
      let numbers: boolean[] = Array<boolean>();
      for (let i = 0; i <= nowSetting.studentEndNum; i++) {
        numbers.push(false);
      }
      let exc = 0;
      for (const v of nowSetting.studentExcept) {
        if (isNaN(v)){
          continue;
        }
        numbers[v] = true;
        exc++;
      }
      numbers[0] = true;
      for (let i = 0; i < nowSetting.primaryCnt; i++) {
        for (let j = 0; j < nowSetting.secondaryCnt; j++) {
          for (let k = 0; k < 2; k++) {
            if (idx >= (N - exc)) {
              break;
            }
            let selected: number = 0;
            while (numbers[selected]) {
              selected = Math.floor(Math.random() * (nowSetting.studentEndNum - nowSetting.studentStartNum + 1) + nowSetting.studentStartNum)
            }
            resultArr.update((v) => {
              v.duo[i][j][k] = selected;
              return v;
            })
            numbers[selected] = true;
            
            idx++;
          }
        }
      }
    }
    if (nowSetting.wait){
      waitFn();
    }
    selected.set([-1, -1, undefined])
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

</script>

<aside>
  <div class="wrap">
    <h2>배치 타입</h2>
    <div>
      <ul>
        <li><label class={"rad" + (type === "personal" ? " rad-sel" : "")}>
          개인 배열
          <input
            type="radio" 
            bind:group={type} 
            name="type" 
            id="" 
            value="personal" 
            checked
          >
        </label></li>
        <li><label class={"rad" + (type === "duo" ? " rad-sel" : "")}>
          짝꿍 배열
          <input 
            type="radio" 
            bind:group={type} 
            name="type" 
            id="" 
            value="duo"
          >
        </label></li>
        <li><label class={"rad" + (type === "group" ? " rad-sel" : "")}>
          모둠 배열
          <input 
            type="radio" 
            bind:group={type} 
            name="type" 
            id="" 
            value="group"
          >
        </label></li>
        <!-- <li><label>
          자유 배열
          <input
            type="radio" 
            bind:group={type} 
            name="type" 
            id="" 
            value="free"
          >
        </label></li> -->
      </ul>
    </div>
  </div>

  <div class="wrap">
    {#if type === "personal"}
      <Personal/>
    {:else if type === "duo"}
      <Duo/>
    {:else if type === "group"}
      <Group/>
    {/if}
  </div>

  <div class="wrap">
    <h2>학생</h2>
    <div>
      <div><label>시작 번호 <input type="number" placeholder="시작 번호" bind:value={studentStartNum}></label></div>
      <div><label>끝 번호 <input type="number" placeholder="끝 번호" bind:value={studentEndNum}></label></div>
      <div>
        <label>
          제외할 번호
          <br>
          <textarea name="" id="" cols="30" rows="10" placeholder="쉼표로 구분하여 입력" bind:value={studentExcept}></textarea>
        </label>
      </div>
    </div>
  </div>

  <label class="wow">
    자리 뽑기 전 3초 세기
    <input type="checkbox" bind:checked={wait}>
  </label>

  <div>
    <button on:click={onClick}>자리 뽑기!</button>
  </div>
</aside>

<style>
  aside {
    width: fit-content;
    min-width: 360px;
    height: 100%;
    background-color: var(--bg);
    border: solid 1px #E5E5E5;
    padding: 24px;
  }

  .wrap {
    max-width: 560px;
    margin-bottom: 48px;
    background-color: white;
    border: 1px solid var(--stroke);
    border-radius: 12px;
    padding: 16px;
  }


  .rad {
    display: flex;
    height: 44px;
    border-radius: 12px;
    align-items: center;
    justify-content: center;
    background-color: var(--bg);
    font-size: 14px;
    font-weight: 600;
  }
  
  .rad:hover {
    cursor: pointer;
    background-color: #BCFFDB;
  }

  .rad-sel {
    background-color: #BCFFDB;
    border: 1px solid var(--main);
  }

  input[type="radio"] {
    display: none;
  }

  .wow {
    display: flex;
    flex-direction: row;
    margin-left: 12px;
    align-items: center;
  }

  .wow > input {
    width: 16px;
  }

</style>

<!-- 11 2 8 6 9 15 14 7 13 4 5 12 16 10 -->
<!-- 16 6 11 12 13 3 2 10 14 8 5 4 15 7 9 -->