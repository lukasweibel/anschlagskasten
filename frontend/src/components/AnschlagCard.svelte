<script>
  import { currentUser } from "../stores/personstore.js";
  import { api } from "../services/api.js";

  export let anschlag;
  export let isIn;

  let divClass = "";

  $: if (isIn) {
    divClass = "green";
  } else {
    divClass = "red";
  }

  function toggle() {
    isIn = !isIn;
    if (isIn) {
      api.addAnschlagToPerson($currentUser._id, anschlag._id);
      $currentUser.programs.push({ anschlagId: anschlag._id });
    } else {
      api.removeAnschlagFromPerson($currentUser._id, anschlag._id);
      const index = $currentUser.programs.findIndex(
        (program) => program.anschlagId === anschlag._id
      );
      if (index !== -1) {
        $currentUser.programs.splice(index, 1);
      }
    }
  }
</script>

<div class={divClass} id="container">
  <p>{anschlag.title}</p>
  <p>{anschlag.date}</p>
  <button on:click={toggle}>An/abmelden</button>
</div>

<style>
  .green {
    background-color: rgb(202, 244, 140);
  }

  .red {
    background-color: rgb(221, 121, 121);
  }

  #container {
    margin-bottom: 5px;
    border-radius: 5px;
  }

  button {
    margin-bottom: 5px;
    margin-left: 5px;
  }
</style>
