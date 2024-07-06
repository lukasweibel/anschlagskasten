<script>
  import { api } from "../services/api.js";
  import { stufen } from "../stores/configstore.js";

  let phoneNumber;
  let isLoginInitiated;
  let isCodeValidated;
  let code;
  let checkedStufen = [];

  let contact = {
    phoneNumber: null,
    triggers: null,
    code: null,
  };

  function submitPhoneNumber() {
    api.getLoginCode(phoneNumber);
    isLoginInitiated = true;
  }

  function auth() {
    api
      .validateLoginCode(phoneNumber, code)
      .then(() => {
        isCodeValidated = true;
      })
      .catch(() => {
        alert("Der Prüfcode ist leider Falsch");
      });
  }

  function handleCheckboxChange(event, stufeName) {
    if (event.target.checked) {
      checkedStufen = [...checkedStufen, stufeName];
    } else {
      checkedStufen = checkedStufen.filter((name) => name !== stufeName);
    }
  }

  function save() {
    contact.phoneNumber = phoneNumber;
    contact.triggers = checkedStufen;
    contact.code = code;
    api
      .saveContact(contact, code)
      .then(() => {
        window.location.href = "#/";
      })
      .catch(() => {
        alert("Der Prüfcode ist abgelaufen");
      });
  }
</script>

<h1>Abonniere eine Stufe</h1>
<table>
  {#if isLoginInitiated}
    <tr>
      <td>Login Code:</td>
      <td>
        <input
          type="text"
          placeholder="Login Code eingeben"
          bind:value={code}
        />
      </td>
    </tr>
    <tr
      ><td /><td
        ><button on:click={auth} id="submitButton">Bestätigen</button></td
      ></tr
    >
  {:else}
    <tr>
      <td>Handynummer:</td><td
        ><input
          type="text"
          placeholder="Handynummer"
          bind:value={phoneNumber}
        /></td
      ></tr
    >
    <tr
      ><td /><td
        ><button on:click={submitPhoneNumber} id="submitButton"
          >Login/Registrierung</button
        ></td
      ></tr
    >
  {/if}
</table>
{#if isCodeValidated}
  <form on:submit|preventDefault={save}>
    {#each $stufen as stufe}
      <label>
        <input
          type="checkbox"
          value={stufe.name}
          on:change={(event) => handleCheckboxChange(event, stufe.name)}
        />
        {stufe.name}
      </label><br />
    {/each}
    <button type="submit" id="saveButton">Speichern</button>
  </form>
{/if}
