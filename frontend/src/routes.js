import AnschlagOverview from "./pages/AnschlagOverview.svelte";
import AnschlagForm from "./pages/AnschlagForm.svelte";
import PersonOverview from "./pages/PersonOverview.svelte";
import AbonnierenForm from "./pages/AbonnierenForm.svelte"

export default {
    '/': AnschlagOverview,
    '/anschlagform': AnschlagForm,
    '/anschlagupdate': AnschlagForm,
    '/abonnieren': AbonnierenForm
}