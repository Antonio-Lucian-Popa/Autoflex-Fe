export default function Terms() {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8">Termeni și Condiții – AutoFlex</h1>
  
        <section className="space-y-8 text-sm leading-6 text-muted-foreground">
          <p>
            Bine ai venit pe AutoFlex – platforma care conectează șoferii cu proprietarii de mașini.
            Prin utilizarea aplicației, ești de acord cu termenii și condițiile de mai jos.
          </p>
  
          {/* 1. Definiții */}
          <div>
            <h2 className="text-lg font-semibold mb-2">1. Definiții</h2>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Client:</strong> persoana care rezervă o mașină pentru o perioadă de timp.</li>
              <li><strong>Proprietar:</strong> persoana care deține și publică o mașină disponibilă pentru închiriere.</li>
              <li><strong>Platforma:</strong> aplicația AutoFlex, disponibilă online.</li>
            </ul>
          </div>
  
          {/* 2. Condiții Generale */}
          <div>
            <h2 className="text-lg font-semibold mb-2">2. Condiții Generale</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Utilizatorii trebuie să aibă cel puțin 18 ani și un cont activ înregistrat în platformă.</li>
              <li>Este interzisă furnizarea de informații false sau incomplete în timpul înregistrării sau utilizării platformei.</li>
              <li>AutoFlex are dreptul de a suspenda sau șterge conturi în caz de comportament abuziv sau fraudulos.</li>
            </ul>
          </div>
  
          {/* 3. Drepturile Clientului */}
          <div>
            <h2 className="text-lg font-semibold mb-2">3. Drepturile și Obligațiile Clientului</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Clientul este responsabil de mașina închiriată pe toată perioada rezervării.</li>
              <li>Clientul trebuie să returneze mașina la timp, în starea în care a fost primită.</li>
              <li>În cazul unor daune, clientul trebuie să notifice imediat proprietarul.</li>
            </ul>
          </div>
  
          {/* 4. Drepturile Proprietarului */}
          <div>
            <h2 className="text-lg font-semibold mb-2">4. Drepturile și Obligațiile Proprietarului</h2>
            <ul className="list-disc list-inside space-y-1">
              <li>Proprietarul trebuie să ofere informații reale despre mașină și să o mențină într-o stare bună de funcționare.</li>
              <li>Proprietarul trebuie să respecte rezervările acceptate și să nu anuleze nejustificat.</li>
              <li>Este responsabil de rezolvarea eventualelor neconcordanțe privind starea mașinii.</li>
            </ul>
          </div>
  
          {/* 5. Limitarea Răspunderii */}
          <div>
            <h2 className="text-lg font-semibold mb-2">5. Limitarea Răspunderii</h2>
            <p>
              AutoFlex acționează ca un intermediar și nu este parte directă în înțelegerile dintre utilizatori.
              Nu răspundem pentru daunele apărute în urma utilizării platformei sau a vehiculelor închiriate.
            </p>
          </div>
  
          {/* 6. Modificarea Termenilor */}
          <div>
            <h2 className="text-lg font-semibold mb-2">6. Modificarea Termenilor</h2>
            <p>
              Ne rezervăm dreptul de a modifica acești termeni. Orice modificare va fi comunicată prin aplicație sau email.
            </p>
          </div>
  
          {/* 7. Contact */}
          <div>
            <h2 className="text-lg font-semibold mb-2">7. Contact</h2>
            <p>
              Pentru întrebări sau nelămuriri, ne poți contacta la{" "}
              <a href="mailto:support@autoflex.ro" className="text-primary underline">
                support@autoflex.ro
              </a>.
            </p>
          </div>
  
          {/* Footer Note */}
          <p className="mt-8 text-xs text-gray-500">Ultima actualizare: Aprilie 2025</p>
        </section>
      </div>
    );
  }
  