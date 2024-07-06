<script>
  import { currentAnschlag } from "../stores/anschlagstore.js";
  import { common } from "../services/common.js";
  import { accessToken } from "../stores/userstore.js";

  function edit() {
    window.location.href = "#/anschlagupdate";
  }
</script>

<div class="contentWrapper">
  {#if $currentAnschlag}
    <h1>{$currentAnschlag.title}</h1>
    <p class="greytext">
      Anschlag erstellt am {#if $currentAnschlag.createDate}{common.formatDate(
          $currentAnschlag.createDate
        )}{:else}-{/if}
      von {#if $currentAnschlag.name}{$currentAnschlag.name}{:else}-{/if}
    </p>
    <table>
      <tbody>
        <tr>
          <td>Datum:</td>
          <td
            >{#if $currentAnschlag.date}{common.formatDate(
                $currentAnschlag.date
              )}{:else}-{/if}</td
          >
        </tr>
        <tr>
          <td>Begrüssung:</td>
          <td>{common.nullCheckForDisplay($currentAnschlag.introducing)}</td>
        </tr>
        <tr>
          <td>Besammeln, Zeit:</td>
          <td>{common.nullCheckForDisplay($currentAnschlag.startTime)}</td>
        </tr>
        <tr>
          <td>Besammeln, Ort:</td>
          <td>{common.nullCheckForDisplay($currentAnschlag.startPlace)}</td>
        </tr>
        <tr>
          <td>Schluss, Zeit:</td>
          <td>{common.nullCheckForDisplay($currentAnschlag.endTime)}</td>
        </tr>
        <tr>
          <td>Schluss, Ort:</td>
          <td>{common.nullCheckForDisplay($currentAnschlag.endPlace)}</td>
        </tr>
        <tr>
          <td>Mitnehmen:</td>
          <td>{common.nullCheckForDisplay($currentAnschlag.itemsToBring)}</td>
        </tr>
        <tr>
          <td>Schlusswort:</td>
          <td>{common.nullCheckForDisplay($currentAnschlag.finalWord)}</td>
        </tr>
      </tbody>
    </table>
  {/if}
  {#if $accessToken}
    <button on:click|once={edit} id="editButton" class="greytext"
      >Editieren</button
    >
  {/if}
</div>

<style>
  #editButton {
    background: none;
    border: none;
  }

  td:first-child {
    width: 30%;
  }
</style>
