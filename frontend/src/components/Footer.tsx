"use client";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <form
          action="https://buttondown.com/api/emails/embed-subscribe/grantsetu"
          method="post"
          target="popupwindow"
          onSubmit={() => window.open("https://buttondown.com/grantsetu", "popupwindow")}
          style={{ display: "flex", gap: "8px", justifyContent: "center", marginBottom: "16px", flexWrap: "wrap" }}
        >
          <input type="email" name="email" placeholder="you@example.com" required style={{ padding: "8px 12px", minWidth: "240px" }} />
          <input type="hidden" name="tag" value="source-argajitsrkar" />
          <button type="submit" className="hero-link hero-link--primary">Subscribe</button>
        </form>
        <p>&copy; Argajit Sarkar {year}. North-East, India.</p>
      </div>
    </footer>
  );
}
