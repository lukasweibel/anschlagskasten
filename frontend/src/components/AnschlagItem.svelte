<script>
  import { currentAnschlag } from "../stores/anschlagstore.js";

  export let title;
  export let id;
  let isActive = false;

  currentAnschlag.subscribe((value) => {
    if (value) {
      if (value._id === id) {
        isActive = true;
      } else {
        isActive = false;
      }
    }
  });
</script>

<div class:active={isActive} on:click>
  <p>{title}</p>
</div>

<style>
  div {
    display: flex;
    align-items: center;
    border-bottom: solid 2px black;
    height: 30px;
    background-color: rgb(50, 51, 142);
    color: black;
  }

  p {
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 5px;
  }

  div.active {
    background-color: rgb(255, 255, 255);
  }
</style>
