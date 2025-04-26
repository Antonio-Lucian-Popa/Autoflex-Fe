import { Link } from "react-router-dom";

export default function HowItWorks() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Cum funcționează AutoFlex</h1>

      <p className="text-muted-foreground mb-8">
        AutoFlex este o platformă peer-to-peer care conectează proprietarii de mașini cu persoane
        care doresc să închirieze rapid și în siguranță. Iată cum funcționează pentru fiecare tip de utilizator:
      </p>

      <div className="space-y-12">
        {/* CLIENT */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Pentru clienți</h2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground text-sm">
            <li>
              <strong>Înregistrează-te</strong>: Creează un cont rapid folosind emailul sau contul tău Google.
            </li>
            <li>
              <strong>Caută o mașină</strong>: Filtrează în funcție de locație, preț, dotări sau perioadă.
            </li>
            <li>
              <strong>Rezervă</strong>: Alege perioada dorită și trimite o cerere de rezervare.
            </li>
            <li>
              <strong>Primește confirmarea</strong>: Proprietarul acceptă cererea, iar tu primești detaliile rezervării.
            </li>
            <li>
              <strong>Ridică mașina</strong>: Întâlnește-te cu proprietarul, semnați contractul și pornește la drum!
            </li>
          </ol>
        </section>

        {/* OWNER */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Pentru proprietari</h2>
          <ol className="list-decimal list-inside space-y-3 text-muted-foreground text-sm">
            <li>
              <strong>Înregistrează-te ca proprietar</strong>: Creează un cont și completează datele tale.
            </li>
            <li>
              <strong>Adaugă o mașină</strong>: Încarcă poze, descriere, dotări și stabilește un preț pe zi.
            </li>
            <li>
              <strong>Primește rezervări</strong>: Clienții pot trimite cereri pentru perioade disponibile.
            </li>
            <li>
              <strong>Confirmă și predă cheia</strong>: Confirmă rezervarea și stabilește locul întâlnirii.
            </li>
            <li>
              <strong>Primești plata</strong>: După finalizarea rezervării, primești banii în contul tău.
            </li>
          </ol>
        </section>
      </div>

      <div className="mt-12 text-sm text-muted-foreground">
        Ai întrebări? Vizitează pagina de{" "}
        <Link to="/contact" className="text-primary underline">Contact</Link>{" "}
        sau consultă secțiunile{" "}
        <Link to="/terms" className="text-primary underline">Termeni și condiții</Link>{" "}
        și{" "}
        <Link to="/privacy" className="text-primary underline">Politica de confidențialitate</Link>.
      </div>
    </div>
  );
}
