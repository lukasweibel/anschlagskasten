<script>
  import { currentAnschlag } from "../stores/anschlagstore.js";
  import { api } from "../services/api.js";
  import { common } from "../services/common.js";

  let newComment = {
    text: null,
    name: null,
    timestamp: null,
  };

  function save() {
    newComment.timestamp = Date.now();
    if (newComment.name && newComment.text && newComment.timestamp) {
      $currentAnschlag.comments.push({ ...newComment });
      $currentAnschlag = { ...$currentAnschlag };
      api.saveComment($currentAnschlag._id, newComment).then(() => {
        newComment.name = null;
        newComment.text = null;
        newComment.timestamp = null;
      });
    } else {
      alert("Bitte alle Felder ausfüllern");
    }
  }
</script>

<div id="container">
  {#if $currentAnschlag.comments != null}
    {#each $currentAnschlag.comments as comment}
      <div class="comment">
        <p class="text">{comment.text}</p>
        <p class="greytext">{comment.name}</p>
        <p class="greytext">{common.formatDate(comment.timestamp)}</p>
      </div>
    {/each}
  {/if}

  <div id="form">
    <div class="input-container">
      <input type="text" placeholder="Text" bind:value={newComment.text} />
    </div>
    <div class="input-container">
      <input type="text" placeholder="Name" bind:value={newComment.name} />
    </div>
    <div class="button-container">
      <button on:click={save}>speichern</button>
    </div>
  </div>
</div>

<style>
  .text {
    margin-top: 0px;
    padding-top: 16px;
  }

  #container {
    background-color: rgb(177, 174, 174);
    min-height: 100%;
  }

  .comment {
    border-bottom: 2px solid black;
  }

  .comment p {
    margin-left: 5px;
    margin-bottom: 0px;
  }

  #form {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-column-gap: 10px;
  }

  .input-container {
    margin: 5px;
  }

  .input-container:nth-child(1) {
    grid-column: 1 / span 2;
  }

  .button-container {
    grid-column: 2 / span 1;
    display: flex;
    align-items: flex-end;
    margin: 5px;
  }

  input {
    width: 100%;
  }
</style>
