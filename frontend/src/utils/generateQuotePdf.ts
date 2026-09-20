import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { QuoteProposal } from "@/app/(dashboard)/quotes/page";
import { CompanyLetterheadConfig } from "@/data/letterheadConfig";

export function generateQuotePdf(
  quote: QuoteProposal,
  config: CompanyLetterheadConfig,
  mode: "digital" | "uploadedPdf" | "prePrinted" = "digital"
): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2; // 182mm

  // Professional formatting using INR (ASCII compliant so it never renders broken glyphs in PDF)
  const formatCurrency = (val: number) => {
    return `INR ${val.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const formatNumber = (val: number) => {
    return val.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Calculations
  const subTotal = quote.items.reduce((acc, item) => acc + item.qty * item.unitRate, 0);
  const totalGst = quote.items.reduce((acc, item) => {
    const itemSub = item.qty * item.unitRate;
    return acc + itemSub * (item.gstPercent / 100);
  }, 0);
  const grandTotal = subTotal + totalGst;

  let currentY = 14;

  // ==========================================
  // 1. STUDIO LETTERHEAD HEADER
  // ==========================================
  if (mode !== "prePrinted") {
    // Studio Logo Badge
    doc.setFillColor(18, 18, 22);
    doc.roundedRect(marginX, currentY, 12, 12, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.text("BK", marginX + 6, currentY + 8, { align: "center" });

    // Studio Title & Legal Name
    doc.setTextColor(18, 18, 22);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(config.studioBrand, marginX + 15, currentY + 5);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 100);
    doc.text(config.legalName, marginX + 15, currentY + 9);
    doc.text(config.tagline, marginX + 15, currentY + 12.5);

    // Right Side Tax & Location Identifiers
    const rightX = pageWidth - marginX;
    doc.setFontSize(7.5);
    doc.setTextColor(60, 60, 70);
    doc.setFont("helvetica", "bold");
    doc.text(`GSTIN: ${config.gstin}`, rightX, currentY + 3.5, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setTextColor(90, 90, 100);
    doc.text(`PAN: ${config.pan}  |  CIN: ${config.cin}`, rightX, currentY + 7.5, { align: "right" });
    doc.text(`${config.address}, ${config.cityStatePincode}`, rightX, currentY + 11, { align: "right" });
    doc.text(`Ph: ${config.phone}  •  Email: ${config.email}`, rightX, currentY + 14.5, { align: "right" });

    currentY += 18;

    // Elegant architectural double header line
    doc.setDrawColor(20, 20, 25);
    doc.setLineWidth(0.6);
    doc.line(marginX, currentY, rightX, currentY);

    doc.setDrawColor(180, 180, 190);
    doc.setLineWidth(0.15);
    doc.line(marginX, currentY + 1, rightX, currentY + 1);

    currentY += 4;
  } else {
    // Offset for pre-printed letterhead sheets
    currentY = config.topMarginMm || 42;
  }

  // ==========================================
  // 2. PROPOSAL METADATA BAR
  // ==========================================
  doc.setFillColor(248, 249, 251);
  doc.rect(marginX, currentY, contentWidth, 13, "F");
  doc.setDrawColor(220, 222, 228);
  doc.setLineWidth(0.2);
  doc.rect(marginX, currentY, contentWidth, 13, "D");

  doc.setTextColor(110, 110, 125);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.text("COMMERCIAL PROPOSAL & ITEM SPECIFICATION SCHEDULE", marginX + 3.5, currentY + 4.2);

  doc.setTextColor(18, 18, 22);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(quote.code, marginX + 3.5, currentY + 10);

  // Right Metadata Details
  const bannerRight = pageWidth - marginX - 3.5;
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 100);
  doc.text(`Issue Date: ${quote.createdDate}   |   Validity: 15 Business Days`, bannerRight, currentY + 5, {
    align: "right",
  });

  // Status Badge Pill
  const isApproved = quote.status === "Approved";
  doc.setFillColor(isApproved ? 236 : 243, isApproved ? 253 : 244, isApproved ? 245 : 246);
  doc.roundedRect(bannerRight - 28, currentY + 6.8, 28, 4.8, 1, 1, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(isApproved ? 16 : 80, isApproved ? 140 : 80, isApproved ? 60 : 80);
  doc.text(`STATUS: ${quote.status.toUpperCase()}`, bannerRight - 14, currentY + 10.2, { align: "center" });

  currentY += 16;

  // ==========================================
  // 3. CLIENT & PROJECT SCOPE CARDS (2-Columns)
  // ==========================================
  const boxWidth = (contentWidth - 4) / 2;

  // Card 1: Client Card
  doc.setFillColor(252, 252, 254);
  doc.roundedRect(marginX, currentY, boxWidth, 18, 1, 1, "F");
  doc.setDrawColor(228, 230, 236);
  doc.setLineWidth(0.2);
  doc.roundedRect(marginX, currentY, boxWidth, 18, 1, 1, "D");

  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(120, 120, 135);
  doc.text("BILLED TO / CLIENT PARTICULARS", marginX + 3.5, currentY + 4.2);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 25);
  doc.text(quote.clientName, marginX + 3.5, currentY + 8.5);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 90);
  doc.text(`Project Site: ${quote.projectName}`, marginX + 3.5, currentY + 12.5);
  doc.text(`Reference Project Code: ${quote.projectCode}`, marginX + 3.5, currentY + 16);

  // Card 2: Scope Classification Card
  const scopeX = marginX + boxWidth + 4;
  doc.setFillColor(252, 252, 254);
  doc.roundedRect(scopeX, currentY, boxWidth, 18, 1, 1, "F");
  doc.roundedRect(scopeX, currentY, boxWidth, 18, 1, 1, "D");

  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(120, 120, 135);
  doc.text("PROJECT SCOPE & SPECIFICATION CLASSIFICATION", scopeX + 3.5, currentY + 4.2);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 25);
  doc.text(quote.sector, scopeX + 3.5, currentY + 8.5);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 90);
  doc.text("Specification Standard: Tier-1 Architectural Turnkey", scopeX + 3.5, currentY + 12.5);
  doc.text(`Authorized Studio Lead: ${config.signatoryName}`, scopeX + 3.5, currentY + 16);

  currentY += 21;

  // ==========================================
  // 4. ITEMIZED BOQ BILL OF QUANTITIES TABLE
  // ==========================================
  const tableRows = quote.items.map((item, idx) => {
    const itemTotal = item.qty * item.unitRate;
    const itemGst = itemTotal * (item.gstPercent / 100);
    const lineTotal = itemTotal + itemGst;
    return [
      (idx + 1).toString(),
      item.roomOrZone,
      item.category,
      item.description,
      item.qty.toString(),
      item.uom,
      formatNumber(item.unitRate),
      `${item.gstPercent}%`,
      formatNumber(lineTotal),
    ];
  });

  autoTable(doc, {
    startY: currentY,
    margin: { left: marginX, right: marginX },
    tableWidth: contentWidth,
    head: [
      ["#", "Room / Zone", "Category", "Item Description & Material Specification", "Qty", "Unit", "Rate (INR)", "GST", "Total (INR)"],
    ],
    body: tableRows,
    theme: "striped",
    headStyles: {
      fillColor: [22, 24, 29],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 7.5,
      halign: "left",
      cellPadding: { top: 2.8, bottom: 2.8, left: 2, right: 2 },
    },
    styles: {
      fontSize: 7.5,
      textColor: [30, 30, 35],
      cellPadding: { top: 2.5, bottom: 2.5, left: 2, right: 2 },
      overflow: "linebreak",
      lineColor: [225, 228, 233],
      lineWidth: 0.15,
    },
    columnStyles: {
      0: { cellWidth: 7, halign: "center" },
      1: { cellWidth: 22 },
      2: { cellWidth: 22 },
      3: { cellWidth: 50 }, // Plenty of room for descriptions
      4: { cellWidth: 10, halign: "right", fontStyle: "bold" },
      5: { cellWidth: 11, halign: "center" },
      6: { cellWidth: 18, halign: "right" },
      7: { cellWidth: 12, halign: "center" },
      8: { cellWidth: 30, halign: "right", fontStyle: "bold", textColor: [18, 18, 22] },
    },
    alternateRowStyles: {
      fillColor: [250, 250, 253],
    },
  });

  // ==========================================
  // 5. COMMERCIAL SUMMARY & BANK PARTICULARS
  // ==========================================
  // @ts-ignore
  let finalY = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 5 : currentY + 45;

  // Ensure plenty of room for ledger, terms, and signatures
  if (finalY > 210) {
    doc.addPage();
    finalY = 18;
  }

  const ledgerBoxWidth = 82;
  const bankBoxWidth = contentWidth - ledgerBoxWidth - 4; // 96mm

  // Left Bank Account Details Box
  doc.setFillColor(250, 250, 253);
  doc.roundedRect(marginX, finalY, bankBoxWidth, 29, 1, 1, "F");
  doc.setDrawColor(225, 228, 234);
  doc.setLineWidth(0.2);
  doc.roundedRect(marginX, finalY, bankBoxWidth, 29, 1, 1, "D");

  doc.setFontSize(6.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(115, 115, 130);
  doc.text("BANK SETTLEMENT & RTGS / NEFT REMITTANCE", marginX + 3.5, finalY + 4.2);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 50);
  doc.text(`Bank Name: ${config.bankName}`, marginX + 3.5, finalY + 8.5);
  doc.text(`Beneficiary Account: ${config.accountName}`, marginX + 3.5, finalY + 12.5);
  doc.text(`Account No: ${config.accountNumber}`, marginX + 3.5, finalY + 16.5);
  doc.text(`IFSC Code: ${config.ifscCode}   |   Branch: ${config.branch}`, marginX + 3.5, finalY + 20.5);

  doc.setFont("helvetica", "bold");
  doc.setTextColor(18, 18, 22);
  doc.text(`Direct UPI Settlement ID: ${config.upiId}`, marginX + 3.5, finalY + 25.5);

  // Right Calculations Ledger
  const calcX = pageWidth - marginX - ledgerBoxWidth;

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 95);
  doc.text("Subtotal (Excl. Taxes):", calcX, finalY + 5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 25);
  doc.text(formatCurrency(subTotal), pageWidth - marginX, finalY + 5, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 95);
  doc.text("Total GST (18% CGST + SGST):", calcX, finalY + 10.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 25);
  doc.text(formatCurrency(totalGst), pageWidth - marginX, finalY + 10.5, { align: "right" });

  // Grand Total Highlight Card
  doc.setFillColor(20, 22, 28);
  doc.roundedRect(calcX, finalY + 15, ledgerBoxWidth, 13, 1, 1, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "bold");
  doc.text("GRAND TOTAL:", calcX + 3.5, finalY + 23);
  doc.setFontSize(10);
  doc.text(formatCurrency(grandTotal), pageWidth - marginX - 3.5, finalY + 23, { align: "right" });

  finalY += 34;

  // ==========================================
  // 6. COMMERCIAL PAYMENT TERMS & MILESTONES
  // ==========================================
  if (finalY > 235) {
    doc.addPage();
    finalY = 18;
  }

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 50);
  doc.text("Commercial Terms & Milestone Disbursal Conditions:", marginX, finalY);
  finalY += 3.5;

  doc.setFontSize(6.8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(85, 85, 95);
  config.termsAndConditions.forEach((term, idx) => {
    const wrapped = doc.splitTextToSize(`${idx + 1}. ${term}`, contentWidth);
    doc.text(wrapped, marginX, finalY);
    finalY += wrapped.length * 3.1;
  });

  finalY += 4;

  // ==========================================
  // 7. SIGNATURE & STAMP BLOCK
  // ==========================================
  if (finalY > 260) {
    doc.addPage();
    finalY = 18;
  }

  doc.setDrawColor(215, 218, 225);
  doc.setLineWidth(0.3);
  doc.line(marginX, finalY, pageWidth - marginX, finalY);
  finalY += 4;

  // Studio Authorized Signatory
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 100, 110);
  doc.text(`For ${config.legalName}`, marginX, finalY + 3);

  doc.setFillColor(248, 248, 250);
  doc.roundedRect(marginX, finalY + 5, 52, 8, 1, 1, "F");
  doc.setFontSize(6.5);
  doc.setTextColor(110, 110, 120);
  doc.text("[DIGITALLY VERIFIED BY OS]", marginX + 3.5, finalY + 10.5);

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 25);
  doc.text(config.signatoryName, marginX, finalY + 17.5);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 110);
  doc.text(config.signatoryTitle, marginX, finalY + 21);

  // Client Acceptance
  const clientSigX = pageWidth - marginX;
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 100, 110);
  doc.text("Client Acceptance & Sign-off", clientSigX, finalY + 3, { align: "right" });

  doc.setDrawColor(180, 180, 190);
  doc.setLineWidth(0.3);
  doc.line(clientSigX - 52, finalY + 13.5, clientSigX, finalY + 13.5);

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 25);
  doc.text(quote.clientName, clientSigX, finalY + 17.5, { align: "right" });
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 110);
  doc.text("Date: ________________________", clientSigX, finalY + 21, { align: "right" });

  // ==========================================
  // 8. FILE DOWNLOAD TRIGGER
  // ==========================================
  const safeFilename = `${quote.code.replace(/[\/\\]/g, "_")}_Proposal.pdf`;
  doc.save(safeFilename);
}
