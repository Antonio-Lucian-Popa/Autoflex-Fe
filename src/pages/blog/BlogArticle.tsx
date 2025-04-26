import { JSX } from "react";
import { useParams } from "react-router-dom";

const articles: Record<string, { title: string; date: string; content: JSX.Element }> = {
  "masina-pentru-vacanta": {
    title: "Cum să alegi mașina ideală pentru vacanță",
    date: "10 aprilie 2025",
    content: (
      <>
        <p>
          Când pleci într-o călătorie, alegerea mașinii potrivite poate face toată diferența. Iată câțiva factori esențiali de luat în considerare:
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Numărul de pasageri și bagajele</li>
          <li>Tipul de teren (oraș, munte, drumuri neasfaltate)</li>
          <li>Consumul și tipul de combustibil</li>
        </ul>
        <p className="mt-4">
          Cu AutoFlex, poți filtra rapid mașinile după dotări, consum și alte preferințe – astfel încât vacanța ta să fie 100% relaxată.
        </p>
      </>
    ),
  },
  "sfaturi-inchiriere": {
    title: "5 sfaturi pentru a-ți închiria mașina în siguranță",
    date: "4 aprilie 2025",
    content: (
      <>
        <p>Vrei să închiriezi mașina ta pe AutoFlex? Iată 5 sfaturi esențiale:</p>
        <ol className="list-decimal pl-5 mt-3 space-y-1">
          <li>Adaugă fotografii clare și recente</li>
          <li>Descrie sincer starea tehnică</li>
          <li>Setează un preț competitiv</li>
          <li>Fii prompt la mesaje</li>
          <li>Încarcă documentele necesare pentru verificare</li>
        </ol>
        <p className="mt-4">Cu cât ești mai transparent, cu atât clienții vor avea mai multă încredere în tine.</p>
      </>
    ),
  },
  "prima-rezervare": {
    title: "Ghidul complet pentru prima ta rezervare AutoFlex",
    date: "1 aprilie 2025",
    content: (
      <>
        <p>Te-ai decis să închiriezi o mașină? Felicitări! Urmează acești pași simpli:</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Creează un cont și completează profilul</li>
          <li>Caută mașini după locație și perioadă</li>
          <li>Verifică recenziile și dotările</li>
          <li>Trimite cererea de rezervare</li>
          <li>Așteaptă confirmarea și bucură-te de drum!</li>
        </ul>
      </>
    ),
  },
};

export default function BlogArticle() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? articles[slug] : null;

  if (!post) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6">
        <h1 className="text-2xl font-bold text-red-500">404 – Articolul nu a fost găsit</h1>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">{post.date}</p>
      <div className="space-y-4 text-sm leading-6 text-muted-foreground">{post.content}</div>
    </div>
  );
}
