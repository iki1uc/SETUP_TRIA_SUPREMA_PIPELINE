<!-- PIPELINE DASHBOARD -->
<div id="pipeline-dashboard" style="
    padding:20px;
    border:2px solid #333;
    border-radius:10px;
    background:#111;
    color:#0f0;
    font-family:Consolas, monospace;
    margin-top:20px;
">
    <h2>TRIA SUPREMA – Pipeline Dashboard</h2>

    <div id="pipe-tria"></div>
    <div id="pipe-respo"></div>
    <div id="pipe-axi"></div>
    <div id="pipe-tem"></div>
    <div id="pipe-run8"></div>
    <div id="pipe-sym"></div>
    <div id="pipe-connect"></div>
</div>

<!-- HH PANEL -->
<div id="hh-panel" style="
    padding:15px;
    border:2px solid #333;
    border-radius:10px;
    background:#111;
    color:#0f0;
    font-family:Consolas, monospace;
    margin-top:20px;
">
    <h2>HH – Host‑Hub Panel</h2>
    <div id="hh-device"></div>
    <div id="hh-route"></div>
</div>

<script>
(async function () {

    /* ---------------------------------------------------------
       DEVICE ROUTING (PX → viPIio / PQ+PR → HH)
    --------------------------------------------------------- */

    const ua = navigator.userAgent || navigator.vendor || window.opera;

    const isPX =
        /iPhone|iPad|iPod/i.test(ua) ||
        (/Android/i.test(ua) && /Mobile/i.test(ua)) ||
        (/Android/i.test(ua) && !/Mobile/i.test(ua)) ||
        /Tablet|Tab/i.test(ua);

    const isDesktop = !isPX;

    let deviceType = "";
    let deviceSymbol = "";
    let deviceRoute = "";

    if (isPX) {
        deviceType = "PX";
        deviceSymbol = "📱";
        deviceRoute = "viPIio";
        window.location.replace("https://iki1uc.github.io/viPIio/");
        return;
    }

    if (isDesktop && navigator.maxTouchPoints > 0) {
        deviceType = "PQ";
        deviceSymbol = "💻";
        deviceRoute = "HH";
    }

    if (isDesktop && navigator.maxTouchPoints === 0) {
        deviceType = "PR";
        deviceSymbol = "🖥️";
        deviceRoute = "HH";
    }

    document.getElementById("hh-device").innerHTML =
        `<b>Gerät:</b> ${deviceType} ${deviceSymbol}`;

    document.getElementById("hh-route").innerHTML =
        `<b>Route:</b> ${deviceRoute}`;


    /* ---------------------------------------------------------
       PIPELINE DASHBOARD (TriAxiom + RESPO + AXI + TEM)
    --------------------------------------------------------- */

    const tria = await fetch("tria.json").then(r => r.json()).catch(() => null);
    const respo = await fetch("respo.json").then(r => r.json()).catch(() => null);
    const axi = await fetch("axi.json").then(r => r.json()).catch(() => null);
    const tem = await fetch("TEM.id.json").then(r => r.json()).catch(() => null);

    const run8Ready = true;
    const symReady = true;

    const connected = tria && respo && axi ? true : false;

    document.getElementById("pipe-tria").innerHTML =
        `<b>TriAxiom:</b> ${tria ? "geladen" : "fehlt"}`;

    document.getElementById("pipe-respo").innerHTML =
        `<b>RESPO:</b> ${respo ? "geladen" : "fehlt"}`;

    document.getElementById("pipe-axi").innerHTML =
        `<b>AXI:</b> ${axi ? "geladen" : "fehlt"}`;

    document.getElementById("pipe-tem").innerHTML =
        `<b>TEM:</b> ${tem ? "Zeit‑Engine aktiv" : "nicht geladen"}`;

    document.getElementById("pipe-run8").innerHTML =
        `<b>RUN8 Kernel:</b> ${run8Ready ? "aktiv" : "inaktiv"}`;

    document.getElementById("pipe-sym").innerHTML =
        `<b>SYM Engine:</b> ${symReady ? "Symbole geladen" : "Fehler"}`;

    document.getElementById("pipe-connect").innerHTML =
        `<b>Pipeline:</b> ${connected ? "VERBUNDEN" : "NICHT VERBUNDEN"}`;

})();
</script>
