<script>
  import { orderedAnschlaege, currentUser } from "../stores/personstore.js";
  import AnschlagCard from "./AnschlagCard.svelte";

  function isIn(params, test) {
    const programIds = $currentUser.programs.map(
      (program) => program.anschlagId
    );
    const isIdInPrograms = programIds.includes(params._id);
    return isIdInPrograms;
  }
</script>

{#if $currentUser != null}
  <h4>
    Anweseinheit von {$currentUser.vulgo} bei der Stufe {$currentUser.stufe}
  </h4>

  {#if $orderedAnschlaege != null}
    {#each $orderedAnschlaege as stufenAnschlaege}
      {#if stufenAnschlaege.title == $currentUser.stufe}
        <div class="accordion" id="accordionExample">
          {#each stufenAnschlaege.years as anschlaegePerYear}
            <div class="accordion-item">
              <h2 class="accordion-header" id="heading{anschlaegePerYear.year}">
                <button
                  class="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapse{anschlaegePerYear.year}"
                  aria-expanded="true"
                  aria-controls="collapse{anschlaegePerYear.year}"
                >
                  {anschlaegePerYear.year}
                </button>
              </h2>
              <div
                id="collapse{anschlaegePerYear.year}"
                class="accordion-collapse collapse"
                aria-labelledby="heading{anschlaegePerYear.year}"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  {#each anschlaegePerYear.documents as anschlag}
                    <AnschlagCard
                      {anschlag}
                      isIn={isIn(anschlag, $currentUser)}
                    />
                  {/each}
                </div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    {/each}
  {/if}
{/if}
