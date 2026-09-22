const { useState, useMemo } = React;

function App() {
  const [phone, setPhone] = useState("");
  const [student, setStudent] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const cleanPhone = useMemo(() => phone.replace(/\D/g, "").slice(0, 10), [phone]);

  const searchCertificate = () => {
    setSearched(true);
    setDownloaded(false);
    setLoading(true);

    setTimeout(() => {
      const result = window.SIH_STUDENTS.find(s => s.phone === cleanPhone);
      setStudent(result || null);
      setLoading(false);
    }, 450);
  };

  const resetSearch = () => {
    setPhone("");
    setStudent(null);
    setSearched(false);
    setDownloaded(false);
  };

  const downloadPDF = async () => {
    const node = document.getElementById("certificate");
    if (!node || !window.html2canvas || !window.jspdf) return;

    setDownloaded(false);
    const oldShadow = node.style.boxShadow;
    node.style.boxShadow = "none";

    try {
      const canvas = await html2canvas(node, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#f5f2e8",
        logging: false
      });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageWidth = 210;
      const pageHeight = 297;
      pdf.addImage(canvas.toDataURL("image/jpeg", 0.96), "JPEG", 0, 0, pageWidth, pageHeight);
      pdf.save(`${student.name.replace(/\s+/g, "-")}-SIH-2026-Participation-Certificate.pdf`);
      setDownloaded(true);
    } finally {
      node.style.boxShadow = oldShadow;
    }
  };

  const downloadPNG = async () => {
    const node = document.getElementById("certificate");
    if (!node || !window.html2canvas) return;

    const canvas = await html2canvas(node, { scale: 3, useCORS: true, backgroundColor: "#f5f2e8" });
    const link = document.createElement("a");
    link.download = `${student.name.replace(/\s+/g, "-")}-SIH-2026-Certificate.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="app-shell">
      <nav className="navbar navbar-dark portal-nav">
        <div className="container nav-inner">
          <div className="brand-wrap">
            <div className="brand-mark">BGI</div>
            <div>
              <div className="brand-title">SIH 2026</div>
              <div className="brand-subtitle">Internal Hackathon Certificate Portal</div>
            </div>
          </div>
          <span className="verified-badge">✓ Verified Portal</span>
        </div>
      </nav>

      <main className="container py-5">
        <section className="hero-card">
          <div className="hero-copy">
            <span className="eyebrow">SMART INDIA HACKATHON • 2026</span>
            <h1>Download Your<br /><span>Participation Certificate</span></h1>
            <p>
              Enter the registered 10-digit mobile number used during the SIH 2026 Internal Hackathon.
              Your certificate will be generated with the registered student and team details.
            </p>
          </div>

          <div className="search-card">
            <div className="search-icon">⌕</div>
            <h2>Find Certificate</h2>
            <p className="search-help">Only your registered phone number is required.</p>

            <label htmlFor="phone" className="form-label fw-semibold">Mobile Number</label>
            <div className="input-group input-group-lg phone-group">
              <span className="input-group-text">+91</span>
              <input
                id="phone"
                className="form-control"
                type="tel"
                inputMode="numeric"
                autoComplete="off"
                placeholder="Enter 10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                onKeyDown={(e) => { if (e.key === "Enter" && cleanPhone.length === 10) searchCertificate(); }}
                maxLength="10"
              />
            </div>
            <div className="number-count">{cleanPhone.length}/10 digits</div>

            <button
              className="btn btn-primary btn-lg w-100 search-btn"
              disabled={cleanPhone.length !== 10 || loading}
              onClick={searchCertificate}
            >
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span>Searching...</> : <>Search Certificate <span>→</span></>}
            </button>

            {searched && !loading && !student && (
              <div className="alert alert-warning mt-3 mb-0 small">
                <strong>Certificate not found.</strong><br />Please check the registered mobile number or contact the SIH coordinator.
              </div>
            )}
          </div>
        </section>

        {student && (
          <section className="result-section">
            <div className="result-toolbar">
              <div>
                <span className="success-dot">●</span>
                <strong>Certificate Found</strong>
                <div className="certificate-id">Certificate ID: {student.certificateId}</div>
              </div>
              <div className="toolbar-actions">
                <button className="btn btn-outline-dark" onClick={resetSearch}>New Search</button>
                <button className="btn btn-dark" onClick={downloadPNG}>Download PNG</button>
                <button className="btn btn-primary" onClick={downloadPDF}>Download PDF</button>
              </div>
            </div>

            <div className="preview-wrap">
              <div className="preview-label">CERTIFICATE PREVIEW</div>
              <div id="certificate" className="certificate">
                <img className="certificate-bg" src="assets/certificate-template11.png" alt="SIH certificate template" />
                <div className="cert-heading">
                  {/* <div className="heading-main">Certificate</div>
                  <div className="heading-sub">OF PARTICIPATION</div> */}
                </div>

                <div className="cert-content">
                  <div
  className="cert-name"
  style={{ transform: "translateY(-18px)" }}
>
  {student.name}
</div>
                  {/* <div className="cert-team"><b>Team Name:</b> <span>{student.team}</span></div> */}

                  {/* <div className="cert-body">
                    <p>
                      This certificate is proudly presented to <strong>{student.name}</strong> for successfully
                      participating in the <strong>SIH 2026 Internal Hackathon</strong>, organized at
                    </p>
                    <p className="institute">{student.college}</p>
                    <p>on <strong>{student.eventDate}</strong>.</p>
                    <p>
                      The participant demonstrated innovation, collaboration, creativity, and
                      problem-solving abilities while contributing to solutions addressing real-world challenges.
                    </p>
                    <p className="appreciation">We sincerely appreciate their participation and dedication.</p>
                  </div>
                </div> */}
                </div>
<br>
</br>
                {/* <div className="cert-id">Certificate ID: {student.certificateId}</div> */}
              </div>
            </div>
          </section>
        )}

        <section className="info-grid">
          <div className="info-box"><div className="info-icon">✓</div><div><b>Participation Certificate</b><span>Issued for SIH 2026 Internal Hackathon participation.</span></div></div>
          <div className="info-box"><div className="info-icon">⌕</div><div><b>Phone Verification</b><span>Search is based on the registered mobile number.</span></div></div>
          <div className="info-box"><div className="info-icon">↓</div><div><b>Instant Download</b><span>Download a print-ready PDF or PNG certificate.</span></div></div>
        </section>
      </main>

      <footer className="portal-footer">
        <div className="container d-flex flex-wrap justify-content-between gap-2">
          <span>SIH 2026 Internal Hackathon • Bansal Institute of Research, Technology and Science, Bhopal</span>
          <span>© 2026 Certificate Portal</span>
        </div>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
