# ProjectStudio Reverse Engineering & Architecture Blueprint

## Executive Overview
**ProjectStudio** (`https://app.projectstudio.ai/`) is an all-in-one ERP/CRM SaaS platform built specifically for the interior design, architectural, and turnkey fit-out industry. It addresses the end-to-end lifecycle of an interior project: from customer acquisition and 3D design concept to on-site execution, procurement, vendor billing, and final handover.

---

## 1. Complete Reverse-Engineered Feature Matrix

### A. Authentication & Organization Hierarchy
- **Auth Modality:** Phone Number (+91) primary identifier with dual authentication paths:
  1. OTP login (SMS-based)
  2. Password login
- **Multi-Tenant Structure:** Workspace-based architecture with seat-based licensing (e.g., 9 total seats, consumed project counter).
- **Role-Based Access Control (RBAC):** Admin/Founder, Design Lead, Project Manager / Site Engineer, Estimator/Accountant, Client (Viewer/Approver), Vendor/Contractor.

### B. Project Lifecycle Stages
The entire application organizes projects into 5 progressive stages:
1. **Sales (Leads & Pitching):**
   - Lead qualification, client meetings, preliminary budget ranges, site measurement visits, initial pitches.
2. **Design (Concept to GFC):**
   - Moodboards, 2D floor plans, 3D renderings, material selection, client approvals, GFC (Good For Construction) drawings.
3. **Execution (On-Site Fit-out):**
   - Civil, electrical, plumbing, carpentry, false ceiling, painting, vendor purchase orders, material deliveries, milestone audits.
4. **Handover (Snagging & Sign-off):**
   - Snag list resolution, deep cleaning, client walk-through, final billing reconciliation, warranty handover certificates.
5. **Inactive (Archived / Lost):**
   - Lost pitches, dropped leads, or dormant projects.

### C. Module Breakdown

#### 1. CRM & Projects Hub (`/#/projects`)
- **Dual View Modes:**
  - **Tabular Grid View:** Rich data grid with column sorting, filtering (Project Code, Project Name, Lead Source, Client Name, Legal Name, Budget, Location: City & State).
  - **Kanban Pipeline View:** Drag-and-drop stage progression with customizable sub-stages (`+ Add Stage` and context menu controls).
- **Batch Operations:** Excel Export, Project Code indexing (e.g., `P-619`, `P-438`), Quick search.
- **Project Quick-Creation Modal:** Form capturing Client Info (Phone, Name, Address, GSTIN), Property Details, Budget, Assigned PM, and Target Handover Date.

#### 2. Project Detail Workspace (`/#/project?id=...`)
- **Header & Switcher:** Instant search & switch across active projects. Stage and Sub-Stage status selectors.
- **Checklists & Milestones:** Progress tracking widget (`X of Y checkpoints completed`), with template import ("Turnkey 3BHK Checklist", "Commercial Office Checklist") and custom checkpoint creation.
- **Gantt & Timeline View:** Interactive milestone scheduling, dependency mapping, task assignment, and critical path identification.
- **Pending Approvals Queue:** Dedicated tab for design revisions, material samples, and extra-item work orders awaiting client or lead architect sign-off.
- **Issue Tracker & Overdue Items:** High-priority delay alerts, on-site snag logs with photo attachments, and next-action task assignments.
- **AI Pro Assistant:** Context-aware sidebar assistant with voice input, file attachments, and prompt suggestions (e.g., "Summarize delays in Chelsea project", "Generate vendor quotation comparison").

#### 3. Estimation, BOQ & Quotations (`/#/dashboard?view=all-quotes`)
- **BOQ Architecture:** Hierarchical Bill of Quantities broken down by room/zone (Living Room, Master Bedroom, Kitchen) and category (Civil, Carpentry, Electrical, Finishing).
- **Version Control:** Automatic versioning of client proposals (e.g., `P-438/Q-101-V1`, `P-438/Q-101-V2`).
- **Financial Breakdown:** Line item quantities, unit rates, wastage allowances, contractor margins, and GST breakdown.
- **Status Lifecycle:** Draft $\rightarrow$ Internal Review $\rightarrow$ Sent to Client $\rightarrow$ Approved $\rightarrow$ Rejected $\rightarrow$ Revised.

#### 4. Vendor Management & Procurement (`/#/dashboard?view=all-orders`)
- **Purchase Orders (PO):** Generation of vendor POs tied directly to approved BOQ line items to prevent over-purchasing.
- **Order Tracking:** Metrics for Approved Orders Total, Payments Made, Pending Balance, and Delivery Schedule.
- **Vendor Directory:** Database of suppliers, carpenters, MEP contractors, glass/fabricators, and turnkey labor teams with performance ratings.

#### 5. Payment Requests & Digital Ledger (`/#/payment-requests`)
- **Four Core Sub-Modules:**
  - *All Payment Requests:* On-site expense requests from site engineers needing management authorization.
  - *All Expenses:* Direct operational expenditure logging.
  - *Transactions:* Client receipt ledger matching payment milestones (e.g., 10% Advance, 40% Framing, 30% Finishes, 20% Handover).
  - *All Wallets:* Petty cash balance management for site supervisors.
- **Approval Workflow:** `Pending Approval` $\rightarrow$ `Approved` $\rightarrow$ `Partially Paid` $\rightarrow$ `Paid` $\rightarrow$ `Rejected`.
- **Audit Trails & Invoicing:** Ties requests to Project Codes, Order Numbers, and Vendor Tax Invoices with attachment proofs.

#### 6. HRMS & Workforce (`/#/hrms`)
- Internal team directory (Interior Designers, 3D Visualizers, Site Supervisors, Project Leads).
- Project allocation & workload balancing (prevents burnout, optimizes delivery timelines).
- Cross-project timesheet logs.

#### 7. Subscription & Organization Settings (`/#/settings`)
- Per-seat billing model with dynamic project quotas.
- Company branding (logo, custom header/footer for generated PDF quotes).
- Audit logs and project consumption history.

---

## 2. Technical Stack Recommendation

### Frontend: Next.js (App Router, React 19 / 18, TypeScript)
- **Framework:** Next.js 14/15 with Server Components (RSC) for lightning-fast initial loads and SEO-ready landing pages.
- **Styling:** Tailwind CSS + Radix UI / Shadcn UI primitives for an ultra-polished, accessible, responsive design.
- **State Management:** TanStack Query (React Query) for server state caching + Zustand for client state (Kanban drag-and-drop, modals, active project context).
- **Complex UI Components:**
  - `@tanstack/react-table` for multi-column sortable, filterable project and financial tables.
  - `@dnd-kit` or `hello-pangea/dnd` for smooth, touch-friendly Kanban boards.
  - `Frappe Gantt` or `DHTMLX Gantt / SVGGantt` for interactive timeline scheduling.
  - `Lucide React` icons for clean modern iconography.

### Backend: Django & Django REST Framework (Python 3.12+)
- **API Framework:** Django REST Framework (DRF) or `django-ninja` (fast async type-safe endpoints).
- **Database:** PostgreSQL with JSONB support for flexible BOQ line items and custom stage checklists.
- **Authentication:** JWT (JSON Web Tokens) with Phone OTP (Twilio / Fast2SMS / MSG91) + Password fallback.
- **Asynchronous Tasks:** Celery + Redis for generating PDF quotes, processing high-res site photos, and automated email/WhatsApp notifications.
- **Document & Media Storage:** AWS S3 or Cloudflare R2 for storing high-res 3D renders, CAD DWG files, and invoice receipts.
- **AI Engine:** LangChain / OpenAI / Claude / Gemini API integration for floor-plan BOQ estimation and automated delay prediction.

---

## 3. How We Build It "Better Than ProjectStudio"

| Feature Area | ProjectStudio (Current) | Our Next-Gen Platform ("Better Than ProjectStudio") |
| :--- | :--- | :--- |
| **Client Experience** | Internal tool only; designs sent via WhatsApp/PDF. | **Interactive Client Portal:** Clients get a branded link to view 3D renders, approve material swatches, track live photo feeds from the site, and pay milestones via UPI/Stripe. |
| **On-Site Field Updates** | Desktop-heavy web dashboard. | **Offline-Ready Mobile PWA & WhatsApp Bot:** Site supervisors can click a photo on WhatsApp with caption `#P-619 Tile work completed` and it auto-updates the project timeline! |
| **BOQ & Quotations** | Standard line-item table. | **Smart BOQ with Live Catalog:** Integrated rate analysis templates (rates for plywood, laminate, hardware, labor) with instant margin calculations and one-click PDF generation. |
| **Design Revision History** | Basic file attachments. | **Visual Diff & Pinpoint Commenting:** Review 2D/3D renders with Figma-style pin comments directly on the image for clear designer-client communication. |
| **AI Capabilities** | Standard chat panel. | **Action-Oriented AI:** Auto-generate Gantt charts from floor plans, estimate budget ranges from square footage, and proactively alert PMs before material price hikes. |
| **Performance & UX** | Traditional SPA with occasional lag on large datasets. | **Instant Next.js Server Components + Optimistic UI updates** for zero-latency interactions. |
