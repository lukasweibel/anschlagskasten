export function formatDate(date) {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("de-DE");
}

export function nullCheckForDisplay(input) {
    if (input == null) {
        return "-";
    } else {
        return input;
    }
}

export function getUrlParameter(name) {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(window.location.search);
    return results === null ?
        "" :
        decodeURIComponent(results[1].replace(/\+/g, " "));
}

function removeQueryParam(name) {
    const newUrl = window.location.href.replace(new RegExp('[?&]' + name + '=[^&#]*'), '');
    history.replaceState({}, document.title, newUrl);
}

export const common = {
    formatDate,
    nullCheckForDisplay,
    getUrlParameter,
    removeQueryParam
};