

export default function CookiesPolicy() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Politica de Cookies – AutoFlex</h1>

      <section className="space-y-4 text-sm leading-6 text-muted-foreground">
        <p>
          Această politică explică ce sunt cookie-urile, cum le folosim în platforma AutoFlex
          și cum îți poți gestiona preferințele legate de acestea.
        </p>

        <h2 className="text-lg font-semibold mt-6">1. Ce sunt cookie-urile?</h2>
        <p>
          Cookie-urile sunt fișiere text de mici dimensiuni stocate pe dispozitivul tău atunci
          când vizitezi un website. Acestea sunt utilizate pentru a-ți recunoaște browserul și a
          reține informații esențiale (ex: preferințe, sesiune, autentificare).
        </p>

        <h2 className="text-lg font-semibold mt-6">2. Ce tipuri de cookie-uri folosim?</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            <strong>Cookie-uri esențiale:</strong> necesare pentru funcționarea corectă a aplicației
            (ex. autentificare, menținerea sesiunii).
          </li>
          <li>
            <strong>Cookie-uri de performanță:</strong> ne ajută să analizăm traficul și modul de utilizare
            al aplicației pentru a îmbunătăți experiența utilizatorului.
          </li>
          <li>
            <strong>Cookie-uri de funcționalitate:</strong> rețin setările tale (ex. limbă, temă).
          </li>
          <li>
            <strong>Cookie-uri de marketing (opționale):</strong> pot fi folosite pentru personalizarea conținutului
            publicitar, dacă sunt activate.
          </li>
        </ul>

        <h2 className="text-lg font-semibold mt-6">3. Cum poți gestiona cookie-urile?</h2>
        <p>
          Poți modifica preferințele tale privind cookie-urile în orice moment din setările browserului.
          Majoritatea browserelor îți permit să blochezi sau să ștergi cookie-urile.
        </p>
        <p>
          De asemenea, poți utiliza extensii sau funcții dedicate din aplicație (ex. banner de consimțământ)
          pentru a accepta sau respinge anumite tipuri de cookie-uri.
        </p>

        <h2 className="text-lg font-semibold mt-6">4. Modificări ale politicii</h2>
        <p>
          Ne rezervăm dreptul de a actualiza această politică periodic. Orice modificare va fi afișată
          în această pagină cu mențiunea datei ultimei actualizări.
        </p>

        <h2 className="text-lg font-semibold mt-6">5. Contact</h2>
        <p>
          Pentru întrebări sau solicitări privind cookie-urile, ne poți contacta la:{" "}
          <a href="mailto:privacy@autoflex.ro" className="text-primary underline">
            privacy@autoflex.ro
          </a>.
        </p>

        <p className="mt-8 text-xs text-gray-500">Ultima actualizare: Aprilie 2025</p>
      </section>
    </div>
  );
}
