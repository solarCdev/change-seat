<script lang="ts">
  export let num: number;
  export let res: number;
</script>

<div class={'per-seat style-' + num}>
  <p>{res}</p>
</div>

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
</style>