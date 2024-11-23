async function shared() {
    const response = await fetch("/share", {
        method : "POST"
    })

    const link = await response.text();

    const p = document.querySelector("#sharingLink")
    p.innerText = link;
}