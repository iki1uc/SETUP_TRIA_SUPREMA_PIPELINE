// TRIA SUPREMA PIPELINE – echte Verbindung

async function TRIA_SUPREMA_PIPELINE() {

    // 1) TriAxiom laden
    const tria = await fetch("tria.json").then(r => r.json()).catch(() => null);

    // 2) RESPO laden
    const respo = await fetch("respo.json").then(r => r.json()).catch(() => null);

    // 3) AXI laden
    const axi = await fetch("axi.json").then(r => r.json()).catch(() => null);

    // Pipeline-Status
    const pipeline = {
        triaLoaded: !!tria,
        respoLoaded: !!respo,
        axiLoaded: !!axi,
        connected: tria && respo && axi ? true : false
    };

    // Ausgabe ins HH Panel
    const hhPanel = document.getElementById("hh-panel");
    if (hhPanel) {
        hhPanel.innerHTML += `
            <div style="margin-top:15px;">
                <b>TRIA SUPREMA PIPELINE:</b><br>
                TriAxiom: ${pipeline.triaLoaded ? "geladen" : "fehlt"}<br>
                RESPO: ${pipeline.respoLoaded ? "geladen" : "fehlt"}<br>
                AXI: ${pipeline.axiLoaded ? "geladen" : "fehlt"}<br>
                Verbindung: ${pipeline.connected ? "AKTIV" : "NICHT AKTIV"}
            </div>
        `;
    }

    return pipeline;
}

// Pipeline automatisch starten
TRIA_SUPREMA_PIPELINE();
