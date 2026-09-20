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

  const formatCurrency = (val: number) => {
    return `₹${val.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Calculations
  const subTotal = quote.items.reduce((acc, item) => acc + item.qty * item.unitRate, 0);
  const totalGst = quote.items.reduce((acc, item) => {
    const itemSub = item.qty * item.unitRate;
    return acc + itemSub * (item.gstPercent / 100);
  }, 0);
  const grandTotal = subTotal + totalGst;

  let startY = 16;

  // 1. HEADER SECTION (Hidden if mode === "prePrinted")
  if (mode !== "prePrinted") {
    // Studio Logo Box
    doc.setFillColor(15, 15, 18);
    doc.roundedRect(marginX, startY, 11, 11, 1.5, 1.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("BK", marginX + 2.5, startY + 7.5);

    // Studio Brand Name & Legal Name
    doc.setTextColor(18, 18, 22);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text(config.studioBrand, marginX + 14, startY + 4.5);

    doc.setFontSize(7.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 110);
    doc.text(config.legalName, marginX + 14, startY + 8.5);
    doc.text(config.tagline, marginX + 14, startY + 12.5);

    // Right Side Identifiers
    doc.setFontSize(7.5);
    doc.setTextColor(80, 80, 90);
    const rightX = pageWidth - marginX;
    doc.text(`GSTIN: ${config.gstin}`, rightX, startY + 3.5, { align: "right" });
    doc.text(`PAN: ${config.pan} | CIN: ${config.cin}`, rightX, startY + 7.5, { align: "right" });
    doc.text(`${config.address}, ${config.cityStatePincode}`, rightX, startY + 11.5, { align: "right" });
    doc.text(`${config.phone}  •  ${config.email}`, rightX, startY + 15.5, { align: "right" });

    // Dividing rule
    startY += 19;
    doc.setDrawColor(20, 20, 25);
    doc.setLineWidth(0.6);
    doc.line(marginX, startY, pageWidth - marginX, startY);
    startY += 5;
  } else {
    // Offset for pre-printed letterhead
    startY = config.topMarginMm || 42;
  }

  // 2. DOCUMENT METADATA BANNER
  doc.setFillColor(245, 245, 248);
  doc.rect(marginX, startY, contentWidth, 14, "F");
  doc.setDrawColor(220, 220, 228);
  doc.setLineWidth(0.2);
  doc.rect(marginX, startY, contentWidth, 14, "D");

  doc.setTextColor(100, 100, 115);
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.text("COMMERCIAL PROPOSAL & BILL OF QUANTITIES", marginX + 3.5, startY + 4.5);

  doc.setTextColor(15, 15, 20);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text(quote.code, marginX + 3.5, startY + 10.5);

  // Right metadata
  const bannerRight = pageWidth - marginX - 3.5;
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 115);
  doc.text(`Issue Date: ${quote.createdDate}   |   Validity: 15 Calendar Days`, bannerRight, startY + 5.5, {
    align: "right",
  });

  doc.setFont("helvetica", "bold");
  doc.setTextColor(quote.status === "Approved" ? 16 : 80, quote.status === "Approved" ? 140 : 80, quote.status === "Approved" ? 60 : 80);
  doc.text(`Status: ${quote.status.toUpperCase()}`, bannerRight, startY + 10.5, { align: "right" });

  startY += 18;

  // 3. CLIENT & SCOPE BOXES (2 columns)
  const boxWidth = (contentWidth - 4) / 2;

  // Client Box
  doc.setFillColor(252, 252, 253);
  doc.rect(marginX, startY, boxWidth, 19, "F");
  doc.setDrawColor(230, 230, 235);
  doc.rect(marginX, startY, boxWidth, 19, "D");

  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(120, 120, 130);
  doc.text("BILLED TO (CLIENT)", marginX + 3.5, startY + 4.5);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 25);
  doc.text(quote.clientName, marginX + 3.5, startY + 9);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 100);
  doc.text(`Project Site: ${quote.projectName}`, marginX + 3.5, startY + 13);
  doc.text(`Project Code: ${quote.projectCode}`, marginX + 3.5, startY + 16.5);

  // Scope Box
  const scopeX = marginX + boxWidth + 4;
  doc.setFillColor(252, 252, 253);
  doc.rect(scopeX, startY, boxWidth, 19, "F");
  doc.setDrawColor(230, 230, 235);
  doc.rect(scopeX, startY, boxWidth, 19, "D");

  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(120, 120, 130);
  doc.text("PROJECT SCOPE & CLASSIFICATION", scopeX + 3.5, startY + 4.5);

  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 25);
  doc.text(quote.sector, scopeX + 3.5, startY + 9);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 100);
  doc.text("Standard: Tier-1 Architectural Turnkey Grade", scopeX + 3.5, startY + 13);
  doc.text(`Authorized Signatory: ${config.signatoryName}`, scopeX + 3.5, startY + 16.5);

  startY += 24;

  // 4. ITEMIZED BOQ TABLE
  const tableRows = quote.items.map((item, idx) => {
    const itemTotal = item.qty * item.unitRate;
    const itemGst = itemTotal * (item.gstPercent / 100);
    const lineTotal = itemTotal + itemGst;
    return [
      idx + 1,
      item.roomOrZone,
      item.category,
      item.description,
      item.qty.toString(),
      item.uom,
      `₹${item.unitRate.toLocaleString("en-IN")}`,
      `${item.gstPercent}%`,
      `₹${lineTotal.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    ];
  });

  autoTable(doc, {
    startY: startY,
    margin: { left: marginX, right: marginX },
    head: [
      ["#", "Room / Zone", "Category", "Item Specification", "Qty", "Unit", "Rate (₹)", "GST", "Line Total (₹)"],
    ],
    body: tableRows,
    theme: "striped",
    headStyles: {
      fillColor: [24, 24, 28],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 7.5,
      halign: "left",
      cellPadding: 2.2,
    },
    styles: {
      fontSize: 7.5,
      textColor: [30, 30, 35],
      cellPadding: 2.2,
      overflow: "linebreak",
      lineColor: [230, 230, 235],
      lineWidth: 0.1,
    },
    columnStyles: {
      0: { cellWidth: 7, halign: "center" },
      1: { cellWidth: 26 },
      2: { cellWidth: 26 },
      3: { cellWidth: 50 },
      4: { cellWidth: 12, halign: "right" },
      5: { cellWidth: 12, halign: "center" },
      6: { cellWidth: 17, halign: "right" },
      7: { cellWidth: 11, halign: "right" },
      8: { cellWidth: 21, halign: "right", fontStyle: "bold" },
    },
    alternateRowStyles: {
      fillColor: [250, 250, 252],
    },
  });

  // 5. COMMERCIAL TOTALS & BANKING SECTION
  // @ts-ignore
  let finalY = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 6 : startY + 40;

  // Check page overflow
  if (finalY > 215) {
    doc.addPage();
    finalY = 20;
  }

  // Left Bank Account Details Box
  const ledgerBoxWidth = 84;
  doc.setFillColor(250, 250, 253);
  doc.rect(marginX, finalY, 94, 30, "F");
  doc.setDrawColor(220, 220, 230);
  doc.rect(marginX, finalY, 94, 30, "D");

  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(110, 110, 120);
  doc.text("BANK & RTGS / NEFT SETTLEMENT PARTICULARS", marginX + 3.5, finalY + 4.5);

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 40, 45);
  doc.text(`Bank Name: ${config.bankName}`, marginX + 3.5, finalY + 9);
  doc.text(`Beneficiary: ${config.accountName}`, marginX + 3.5, finalY + 13);
  doc.text(`A/C No: ${config.accountNumber}`, marginX + 3.5, finalY + 17);
  doc.text(`IFSC: ${config.ifscCode}   |   Branch: ${config.branch}`, marginX + 3.5, finalY + 21);
  doc.setFont("helvetica", "bold");
  doc.text(`Direct UPI Settlement ID: ${config.upiId}`, marginX + 3.5, finalY + 26);

  // Right Calculations Ledger
  const calcX = pageWidth - marginX - ledgerBoxWidth;
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 90);
  doc.text("Subtotal (Excl. Taxes):", calcX, finalY + 5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 25);
  doc.text(formatCurrency(subTotal), pageWidth - marginX, finalY + 5, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 90);
  doc.text("Total GST (CGST + SGST):", calcX, finalY + 11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 25);
  doc.text(formatCurrency(totalGst), pageWidth - marginX, finalY + 11, { align: "right" });

  // Grand Total Box
  doc.setFillColor(24, 24, 28);
  doc.rect(calcX, finalY + 16, ledgerBoxWidth, 12, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("Grand Total:", calcX + 3, finalY + 23.5);
  doc.setFontSize(10);
  doc.text(formatCurrency(grandTotal), pageWidth - marginX - 3, finalY + 23.5, { align: "right" });

  finalY += 35;

  // 6. TERMS & CONDITIONS
  if (finalY > 235) {
    doc.addPage();
    finalY = 20;
  }

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 50);
  doc.text("Commercial Terms & Milestone Disbursal Conditions:", marginX, finalY);
  finalY += 3.5;

  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(90, 90, 100);
  config.termsAndConditions.forEach((term, idx) => {
    const wrapped = doc.splitTextToSize(`${idx + 1}. ${term}`, contentWidth);
    doc.text(wrapped, marginX, finalY);
    finalY += wrapped.length * 3.2;
  });

  finalY += 3;

  // 7. SIGNATURE BLOCK
  if (finalY > 260) {
    doc.addPage();
    finalY = 20;
  }

  doc.setDrawColor(210, 210, 220);
  doc.line(marginX, finalY, pageWidth - marginX, finalY);
  finalY += 4;

  // Studio signature
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 100, 110);
  doc.text(`For ${config.legalName}`, marginX, finalY + 3);

  doc.setFillColor(248, 248, 250);
  doc.rect(marginX, finalY + 5, 45, 9, "F");
  doc.setFontSize(6.5);
  doc.setTextColor(110, 110, 120);
  doc.text("[DIGITALLY VERIFIED BY OS]", marginX + 3, finalY + 11);

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 25);
  doc.text(config.signatoryName, marginX, finalY + 18);
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 110);
  doc.text(config.signatoryTitle, marginX, finalY + 21.5);

  // Client signature
  const clientSigX = pageWidth - marginX;
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(100, 100, 110);
  doc.text("Client Acceptance & Sign-off", clientSigX, finalY + 3, { align: "right" });

  doc.setDrawColor(180, 180, 190);
  doc.line(clientSigX - 50, finalY + 14, clientSigX, finalY + 14);

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(20, 20, 25);
  doc.text(quote.clientName, clientSigX, finalY + 18, { align: "right" });
  doc.setFontSize(7);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 100, 110);
  doc.text("Date: ________________________", clientSigX, finalY + 21.5, { align: "right" });

  // 8. TRIGGER DIRECT FILE DOWNLOAD (NO PRINT DIALOG)
  const safeFilename = `${quote.code.replace(/[\/\\]/g, "_")}_Proposal.pdf`;
  doc.save(safeFilename);
}
