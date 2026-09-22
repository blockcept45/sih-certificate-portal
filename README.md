# SIH 2026 Internal Hackathon Certificate Portal

React-based certificate search portal using Bootstrap + Tailwind CSS + custom CSS.

## Features
- Student enters only the registered 10-digit mobile number.
- Certificate data is manually maintained in `students.js`.
- Participation certificate only — no rank/position field.
- Responsive mobile/desktop design.
- Certificate preview based on the supplied BGI/SIH certificate design.
- Download as PDF or PNG.
- Certificate ID shown for each record.
- Enter key support and invalid-number handling.

## Add students
Open `students.js` and add records:

```js
{
  phone: "9876543210",
  name: "Student Name",
  team: "Team Name",
  certificateId: "SIH26-BIRTS-0004",
  college: "Bansal Institute of Research, Technology and Science, Bhopal",
  eventDate: "25 August 2026"
}
```

## Run
This version is intentionally simple and can run as a static website.

1. Keep the complete folder structure.
2. Open `index.html` through a local server (recommended) or deploy the folder to GitHub Pages/Netlify/Hostinger.
3. Internet access is required because React, Bootstrap, Tailwind CDN, html2canvas and jsPDF are loaded from CDNs.

For a production portal, move `students.js` data into PHP/MySQL/API. That prevents the complete student list from being downloaded to every browser.
