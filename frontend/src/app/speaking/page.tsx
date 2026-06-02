export const metadata = { title: "Speaking - Argajit Sarkar" };

export default function SpeakingPage() {
  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>Speaking & Workshops</h1>
          <p>Talks, posters, and NEP Saarthi outreach.</p>
        </div>
      </div>
      <section className="section">
        <div className="container container--narrow">
          {/* TODO: replace with real talk list. */}
          <ul>
            <li>ICABSB 2025 - IIT Roorkee - Poster.</li>
            <li>IISF 2025 - Chandigarh - Poster.</li>
            <li>AICBio 2025 - Amrita Vidyapeetham - Poster.</li>
            <li>NCRTBSNEI 2025 - Tripura University - Oral.</li>
            <li>NEP Saarthi workshops across Tripura University, 2025-26.</li>
          </ul>
          <p style={{ marginTop: 16 }}>
            To invite me to speak, email <a href="mailto:argajit05@gmail.com">argajit05@gmail.com</a>.
          </p>
        </div>
      </section>
    </>
  );
}
