import { Link } from "react-router-dom";

export default function Blog() {
  const posts = [
    {
      title: "Cum să alegi mașina ideală pentru vacanță",
      slug: "masina-pentru-vacanta",
      excerpt: "Descoperă ce tip de mașină ți se potrivește cel mai bine pentru călătorii lungi sau aventuri urbane.",
      date: "10 aprilie 2025",
    },
    {
      title: "5 sfaturi pentru a-ți închiria mașina în siguranță",
      slug: "sfaturi-inchiriere",
      excerpt: "Află cum să-ți protejezi vehiculul și cum să oferi o experiență plăcută clienților AutoFlex.",
      date: "4 aprilie 2025",
    },
    {
      title: "Ghidul complet pentru prima ta rezervare AutoFlex",
      slug: "prima-rezervare",
      excerpt: "Tot ce trebuie să știi pentru a închiria o mașină rapid și fără bătăi de cap.",
      date: "1 aprilie 2025",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Blog AutoFlex</h1>

      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.slug} className="border-b pb-6">
            <p className="text-sm text-muted-foreground">{post.date}</p>

            <Link to={`/blog/${post.slug}`}>
              <h2 className="text-xl font-semibold text-primary hover:underline">{post.title}</h2>
            </Link>

            <p className="text-sm mt-2 text-muted-foreground">{post.excerpt}</p>

            <Link
              to={`/blog/${post.slug}`}
              className="text-sm text-blue-500 mt-2 inline-block hover:underline"
            >
              Citește mai mult →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
