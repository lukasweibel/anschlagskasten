<script>
  import { personsArray, currentUser } from "../stores/personstore.js";
  import { api } from "../services/api.js";
  import PersonDetail from "../components/PersonDetail.svelte";

  api.getPersons();
  api.getOrderedAnschlaege();

  function choose(params) {
    currentUser.set(params);
  }

  function sanitizeId(id) {
    return id.replace(/[^a-zA-Z0-9-_]/g, "");
  }
</script>

<div id="content">
  <div id="sidebar">
    <h1>Personen</h1>
    {#if $personsArray != null}
      <div class="accordion" id="accordionExample">
        {#each $personsArray as stufe}
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading{sanitizeId(stufe._id)}">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse{sanitizeId(stufe._id)}"
                aria-expanded="true"
                aria-controls="collapse{sanitizeId(stufe._id)}"
              >
                <h1>{stufe._id}</h1>
              </button>
            </h2>
            <div
              id="collapse{sanitizeId(stufe._id)}"
              class="accordion-collapse collapse"
              aria-labelledby="heading{sanitizeId(stufe._id)}"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                {#each stufe.people as person}
                  <p on:click={() => choose(person)}>{person.vulgo}</p>
                {/each}
              </div>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
  <div id="details" class="col-9 col-s-12">
    <PersonDetail />
  </div>
</div>

<style>
  * {
    box-sizing: border-box;
  }

  #content {
    display: flex;
    height: 100%;
  }

  #sidebar {
    border-right: solid black 2px;
    overflow-y: scroll;
    flex-direction: column;
    flex: 1;
    cursor: pointer;
  }

  #details {
    overflow-y: scroll;
  }
</style>
