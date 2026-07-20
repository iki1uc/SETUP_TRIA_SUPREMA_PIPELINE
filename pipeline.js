(async function () {

    const ua = navigator.userAgent || navigator.vendor || window.opera;

    const isPX =
        /iPhone|iPad|iPod/i.test(ua) ||
        (/Android/i.test(ua));

    let deviceType = isPX ? "PX" : (navigator.maxTouchPoints > 0 ? "PQ" : "PR");
    let deviceRoute = isPX ? "viPIio" : "HH";

    document.getElementById("hh-device").innerHTML =
        `<b>Gerät:</b> ${deviceType}`;

    document.getElementById("hh-route").innerHTML =
        `<b>Route:</b> ${deviceRoute}`;

    const tria = await fetch("tria.json").then(r => r.json()).catch(() => null);
    const respo = await fetch("respo.json").then(r => r.json()).catch(() => null);
    const axi = await fetch("axi.json").then(r => r.json()).catch(() => null);
    const tem = await fetch("TEM.id.json").then(r => r.json()).catch(() => null);

    const connected = tria && respo && axi;

    document.getElementById("pipe-tria").innerHTML =
        `<b>TriAxiom:</b> ${tria ? "geladen" : "fehlt"}`;

    document.getElementById("pipe-respo").innerHTML =
        `<b>RESPO:</b> ${respo ? "geladen" : "fehlt"}`;

    document.getElementById("pipe-axi").innerHTML =
        `<b>AXI:</b> ${axi ? "geladen" : "fehlt"}`;

    document.getElementById("pipe-tem").innerHTML =
        `<b>TEM:</b> ${tem ? "aktiv" : "fehlt"}`;

    document.getElementById("pipe-connect").innerHTML =
        `<b>Pipeline:</b> ${connected ? "VERBUNDEN" : "NICHT VERBUNDEN"}`;

})();
