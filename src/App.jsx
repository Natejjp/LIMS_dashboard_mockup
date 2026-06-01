import React, { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  PackageCheck,
  FlaskConical,
  Search,
  Filter,
  ArrowUpRight,
  Truck,
  Boxes,
  TimerReset,
  Trash2,
  ClipboardCheck,
  TrendingDown,
  Layers,
  CheckCircle2,
  FileText,
  History,
  Users,
  Activity,
  Snowflake,
  Beaker,
  Wrench,
  Warehouse,
  ClipboardList,
  ChevronDown,
} from "lucide-react";

const dashboards = [
  "Initials",
  "Slow/No Growth",
  "Quarantine",
  "Discard",
];

const topLevelTabs = ["Batch Operational Dashboards", "Lab Operational Dashboard", "Reports"];
const reportTabs = [
  "Sample Intake Issues",
  "Client Lineage / Batch History",
  "Lab Cleanroom",
];
const labTabs = [
  "Lab Manufacturing / Schedule",
  "Incubator",
];

function Card({ children, className = "", ...props }) {
  return (
    <section className={`border border-slate-200 bg-white shadow-sm ${className}`} {...props}>
      {children}
    </section>
  );
}

function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

function Button({ children, variant = "primary", className = "", ...props }) {
  const styles =
    variant === "outline"
      ? "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
      : "bg-slate-900 text-white hover:bg-slate-800";

  return (
    <button
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium transition ${styles} ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}

const quarantineRows = [
  {
    batch: "H4012-A01-P0-P20260508-01",
    client: "H4012",
    sample: "ADI",
    placed: "05/18/2026",
    reason: "Pending sterility review",
    release: "05/29/2026",
    stage: "Initial",
    inventory: "Vials",
    growth: "No",
    shipment: "Yes",
    daysNeeded: 2,
    risk: "High",
  },
  {
    batch: "H3988-CB01-P0-P20260503-01",
    client: "H3988",
    sample: "NB - Cord Blood",
    placed: "05/20/2026",
    reason: "Intake discrepancy",
    release: "TBD",
    stage: "Initial",
    inventory: "Flask",
    growth: "Slow Growth",
    shipment: "No",
    daysNeeded: null,
    risk: "Medium",
  },
  {
    batch: "H4205-BM01-P1-P20260514-01",
    client: "H4205",
    sample: "BM",
    placed: "05/21/2026",
    reason: "QA hold - form correction",
    release: "05/28/2026",
    stage: "Replate",
    inventory: "Flask",
    growth: "Slow Growth",
    shipment: "Yes",
    daysNeeded: 5,
    risk: "Medium",
  },
  {
    batch: "H4077-A01-P0-P20260510-02",
    client: "H4077",
    sample: "ADI",
    placed: "05/22/2026",
    reason: "Low dose count review",
    release: "05/30/2026",
    stage: "Initial",
    inventory: "Vials",
    growth: "No",
    shipment: "Yes",
    daysNeeded: 1,
    risk: "High",
  },
  {
    batch: "H4099-A01-P2-P20260507-01",
    client: "H4099",
    sample: "ADI",
    placed: "05/17/2026",
    reason: "Possible contamination review",
    release: "TBD",
    stage: "Replate",
    inventory: "Vials",
    growth: "No",
    shipment: "Yes",
    daysNeeded: 0,
    risk: "Critical",
  },
];

const shippingRows = [
  {
    client: "H4012",
    order: "Cell Request",
    status: "At Risk",
    ordered: 8,
    banked: 10,
    needed: 8,
    quarantine: "Yes",
    growth: "No",
    initial: "No",
    batches: "H4012-A01-P0-P20260508-01",
  },
  {
    client: "H4031",
    order: "Bio",
    status: "Ready",
    ordered: 2,
    banked: 6,
    needed: 2,
    quarantine: "No",
    growth: "No",
    initial: "No",
    batches: "H4031-A01-P1-P20260502-01",
  },
  {
    client: "H4205",
    order: "Cell Request",
    status: "Delayed",
    ordered: 12,
    banked: 7,
    needed: 5,
    quarantine: "Yes",
    growth: "Yes",
    initial: "No",
    batches: "H4205-BM01-P1-P20260514-01",
  },
  {
    client: "H4150",
    order: "Cell Request",
    status: "At Risk",
    ordered: 6,
    banked: 0,
    needed: 6,
    quarantine: "No",
    growth: "Yes",
    initial: "Yes",
    batches: "H4150-CT01-P0-P20260511-01",
  },
  {
    client: "H4077",
    order: "Bio",
    status: "At Risk",
    ordered: 4,
    banked: 4,
    needed: 4,
    quarantine: "Yes",
    growth: "No",
    initial: "No",
    batches: "H4077-A01-P0-P20260510-02",
  },
];

const initialRows = [
  {
    client: "H3988",
    batch: "H3988-CB01-P0-P20260503-01",
    sample: "NB - Cord Blood",
    days: 17,
    shipment: "No",
    growth: "Slow Growth",
    discard: "No",
    intake: "Temperature missing",
  },
  {
    client: "H4150",
    batch: "H4150-CT01-P0-P20260511-01",
    sample: "NB - Cord Tissue",
    days: 9,
    shipment: "Yes",
    growth: "No Growth",
    discard: "No",
    intake: "Shipping box damaged",
  },
  {
    client: "H4302",
    batch: "H4302-A01-P0-P20260512-01",
    sample: "ADI",
    days: 8,
    shipment: "No",
    growth: "No",
    discard: "No",
    intake: "None",
  },
  {
    client: "H4211",
    batch: "H4211-BM01-P0-P20260509-01",
    sample: "BM",
    days: 12,
    shipment: "Yes",
    growth: "Slow Growth",
    discard: "Yes",
    intake: "Low starting cell count",
  },
];

const slowGrowthRows = [
  {
    client: "H3988",
    batch: "H3988-CB01-P0-P20260503-01",
    stage: "Initial",
    days: 17,
    shipment: "No",
    initial: "Yes",
    quarantine: "Yes",
  },
  {
    client: "H4205",
    batch: "H4205-BM01-P1-P20260514-01",
    stage: "Replate",
    days: 13,
    shipment: "Yes",
    initial: "No",
    quarantine: "Yes",
  },
  {
    client: "H4150",
    batch: "H4150-CT01-P0-P20260511-01",
    stage: "Initial",
    days: 9,
    shipment: "Yes",
    initial: "Yes",
    quarantine: "No",
  },
  {
    client: "H4211",
    batch: "H4211-BM01-P0-P20260509-01",
    stage: "Initial",
    days: 12,
    shipment: "Yes",
    initial: "Yes",
    quarantine: "No",
  },
];

const discardRows = [
  {
    client: "H4211",
    batch: "H4211-BM01-P0-P20260509-01",
    type: "Flask",
    reason: "No growth after review period",
    shipment: "Yes",
    initial: "Yes",
    quarantine: "No",
  },
  {
    client: "H4077",
    batch: "H4077-A01-P0-P20260510-02",
    type: "Vials",
    reason: "Low dose count",
    shipment: "Yes",
    initial: "No",
    quarantine: "Yes",
  },
  {
    client: "H3902",
    batch: "H3902-A01-P2-P20260428-01",
    type: "Flask",
    reason: "Contamination concern",
    shipment: "No",
    initial: "No",
    quarantine: "Yes",
  },
  {
    client: "H3888",
    batch: "H3888-CT01-P0-P20260501-01",
    type: "Vials",
    reason: "Client-requested discard",
    shipment: "No",
    initial: "Yes",
    quarantine: "No",
  },
];

const intakeIssueRows = [
  {
    client: "H4012",
    batch: "H4012-A01-P0-P20260508-01",
    delayedDays: 1,
    temperature: "8.5°C",
    icePacks: "No",
    parafilm: "Yes",
    lowVolume: "No",
    tissueType: "ADI",
    issueType: ["Delayed sample", "Temperature issue", "Incorrect ice packs"],
    clinic: "Clinic A",
    issueDate: "05/08/2026",
  },
  {
    client: "H4205",
    batch: "H4205-BM01-P1-P20260514-01",
    delayedDays: 0,
    temperature: "4.2°C",
    icePacks: "Yes",
    parafilm: "No",
    lowVolume: "Yes",
    tissueType: "BM",
    issueType: ["Missing parafilm", "Low volume"],
    clinic: "Clinic B",
    issueDate: "05/14/2026",
  },
  {
    client: "H3988",
    batch: "H3988-CB01-P0-P20260503-01",
    delayedDays: 2,
    temperature: "12.1°C",
    icePacks: "No",
    parafilm: "Yes",
    lowVolume: "No",
    tissueType: "NB - Cord Blood",
    issueType: ["Delayed sample", "Temperature issue", "Incorrect ice packs"],
    clinic: "Clinic C",
    issueDate: "05/03/2026",
  },
  {
    client: "H4150",
    batch: "H4150-CT01-P0-P20260511-01",
    delayedDays: 1,
    temperature: "6.8°C",
    icePacks: "Yes",
    parafilm: "No",
    lowVolume: "Yes",
    tissueType: "NB - Cord Tissue",
    issueType: ["Delayed sample", "Missing parafilm", "Low volume"],
    clinic: "Clinic A",
    issueDate: "05/11/2026",
  },
  {
    client: "H4211",
    batch: "H4211-BM01-P0-P20260509-01",
    delayedDays: 3,
    temperature: "9.4°C",
    icePacks: "No",
    parafilm: "No",
    lowVolume: "Yes",
    tissueType: "BM",
    issueType: ["Delayed sample", "Temperature issue", "Incorrect ice packs", "Missing parafilm", "Low volume"],
    clinic: "Clinic B",
    issueDate: "05/09/2026",
  },
];

function getIntakeIssueTypes(row) {
  return Array.isArray(row.issueType) ? row.issueType : [row.issueType || "Intake review"];
}

function getIntakeIssueType(row) {
  return getIntakeIssueTypes(row).join(", ");
}

const clientLineageRows = [
  {
    client: "H4012",
    samples: 2,
    tissueTypes: "ADI, BM",
    batches: 5,
    availableBatches: 4,
    intakeIssues: "Temperature excursion",
    growHours: 74,
    doublingTime: "31.2 hrs",
    flaskMix: "1-stack: 2, 2-stack: 3",
    processingRows: [
      { flaskSize: "1-stack", avgYield: "15.8 vials", avgGrowHours: 68, stdDev: 2.1, totalBatches: 2 },
      { flaskSize: "2-stack", avgYield: "20.1 vials", avgGrowHours: 78, stdDev: 2.8, totalBatches: 3 },
    ],
    avgOrdered: 8,
    frequency: "Quarterly",
    masterBank: 42,
    workingBank: 28,
    passageDoses: "P0: 16, P1: 24, P2: 30",
    batchRows: [
      { batch: "H4012-A01-P0-P20260508-01", tissueType: "ADI", flaskSize: "1-stack", processingDate: "05/08/2026", freezingDate: "05/20/2026", slowGrowth: "No", quarantine: "No", discard: "No" },
      { batch: "H4012-A01-P1-P20260512-01", tissueType: "ADI", flaskSize: "2-stack", processingDate: "05/12/2026", freezingDate: "05/24/2026", slowGrowth: "No", quarantine: "Yes", discard: "No" },
      { batch: "H4012-BM01-P0-P20260509-01", tissueType: "BM", flaskSize: "2-stack", processingDate: "05/09/2026", freezingDate: "05/22/2026", slowGrowth: "Yes", quarantine: "No", discard: "No" },
      { batch: "H4012-BM01-P1-P20260515-01", tissueType: "BM", flaskSize: "1-stack", processingDate: "05/15/2026", freezingDate: "-", slowGrowth: "No", quarantine: "No", discard: "No" },
      { batch: "H4012-A01-P2-P20260518-01", tissueType: "ADI", flaskSize: "2-stack", processingDate: "05/18/2026", freezingDate: "-", slowGrowth: "No", quarantine: "No", discard: "Yes" },
    ],
    qualityEvents: "Sterility review",
    qualityRows: [
      { batch: "H4012-A01-P1-P20260512-01", batchEvent: "Quarantine review opened", shippingEvent: "No shipping impact" },
      { batch: "H4012-BM01-P0-P20260509-01", batchEvent: "Slow growth observation", shippingEvent: "Release date monitored" },
      { batch: "H4012-A01-P2-P20260518-01", batchEvent: "Discard review", shippingEvent: "Replacement batch needed" },
    ],
    shippingEvents: "1 delayed shipment",
  },
  {
    client: "H4205",
    samples: 1,
    tissueTypes: "BM",
    batches: 4,
    availableBatches: 2,
    intakeIssues: "Low volume",
    growHours: 92,
    doublingTime: "39.5 hrs",
    flaskMix: "2-stack: 2, 5-stack: 2",
    processingRows: [
      { flaskSize: "2-stack", avgYield: "12.6 vials", avgGrowHours: 88, stdDev: 3.4, totalBatches: 2 },
      { flaskSize: "5-stack", avgYield: "17.0 vials", avgGrowHours: 96, stdDev: 4.1, totalBatches: 2 },
    ],
    avgOrdered: 12,
    frequency: "Monthly",
    masterBank: 24,
    workingBank: 18,
    passageDoses: "P0: 8, P1: 18, P2: 16",
    batchRows: [
      { batch: "H4205-BM01-P0-P20260430-01", tissueType: "BM", flaskSize: "2-stack", processingDate: "04/30/2026", freezingDate: "05/12/2026", slowGrowth: "No", quarantine: "No", discard: "No" },
      { batch: "H4205-BM01-P1-P20260514-01", tissueType: "BM", flaskSize: "5-stack", processingDate: "05/14/2026", freezingDate: "05/28/2026", slowGrowth: "No", quarantine: "No", discard: "No" },
      { batch: "H4205-BM01-P2-P20260516-01", tissueType: "BM", flaskSize: "5-stack", processingDate: "05/16/2026", freezingDate: "-", slowGrowth: "Yes", quarantine: "Yes", discard: "No" },
      { batch: "H4205-BM01-P3-P20260518-01", tissueType: "BM", flaskSize: "2-stack", processingDate: "05/18/2026", freezingDate: "-", slowGrowth: "No", quarantine: "No", discard: "Yes" },
    ],
    qualityEvents: "QA form correction",
    qualityRows: [
      { batch: "H4205-BM01-P1-P20260514-01", batchEvent: "QA form correction", shippingEvent: "No shipping impact" },
      { batch: "H4205-BM01-P2-P20260516-01", batchEvent: "Quarantine review opened", shippingEvent: "Open order at risk" },
      { batch: "H4205-BM01-P3-P20260518-01", batchEvent: "Discard review", shippingEvent: "Order quantity recalculation" },
    ],
    shippingEvents: "2 open orders",
  },
  {
    client: "H3988",
    samples: 2,
    tissueTypes: "NB - Cord Blood, NB - Cord Tissue",
    batches: 3,
    availableBatches: 1,
    intakeIssues: "Intake discrepancy",
    growHours: 118,
    doublingTime: "44.1 hrs",
    flaskMix: "1-stack: 1, 2-stack: 2",
    processingRows: [
      { flaskSize: "1-stack", avgYield: "8.4 vials", avgGrowHours: 112, stdDev: 1.9, totalBatches: 1 },
      { flaskSize: "2-stack", avgYield: "11.7 vials", avgGrowHours: 121, stdDev: 2.6, totalBatches: 2 },
    ],
    avgOrdered: 5,
    frequency: "As needed",
    masterBank: 14,
    workingBank: 9,
    passageDoses: "P0: 6, P1: 10, P2: 7",
    batchRows: [
      { batch: "H3988-CB01-P0-P20260503-01", tissueType: "NB - Cord Blood", flaskSize: "1-stack", processingDate: "05/03/2026", freezingDate: "-", slowGrowth: "Yes", quarantine: "No", discard: "No" },
      { batch: "H3988-CT01-P0-P20260501-01", tissueType: "NB - Cord Tissue", flaskSize: "2-stack", processingDate: "05/01/2026", freezingDate: "05/14/2026", slowGrowth: "No", quarantine: "Yes", discard: "No" },
      { batch: "H3988-CB01-P1-P20260510-01", tissueType: "NB - Cord Blood", flaskSize: "2-stack", processingDate: "05/10/2026", freezingDate: "-", slowGrowth: "No", quarantine: "No", discard: "Yes" },
    ],
    qualityEvents: "Slow growth review",
    qualityRows: [
      { batch: "H3988-CB01-P0-P20260503-01", batchEvent: "Slow growth review", shippingEvent: "No active order" },
      { batch: "H3988-CT01-P0-P20260501-01", batchEvent: "Quarantine review opened", shippingEvent: "Release date pending" },
      { batch: "H3988-CB01-P1-P20260510-01", batchEvent: "Discard review", shippingEvent: "No active order" },
    ],
    shippingEvents: "No active orders",
  },
];

const cleanroomRows = [
  {
    date: "05/28/2026",
    technician: "Technician A",
    tissue: "ADI",
    flask: "1-stack",
    vials: 18.2,
    confluency: "86%",
    growTime: "74 hrs",
    stdDev: 2.4,
    freezings: 14,
    passagings: 22,
    discards: 1,
  },
  {
    date: "05/27/2026",
    technician: "Technician B",
    tissue: "BM",
    flask: "2-stack",
    vials: 15.7,
    confluency: "82%",
    growTime: "91 hrs",
    stdDev: 3.1,
    freezings: 10,
    passagings: 18,
    discards: 3,
  },
  {
    date: "05/21/2026",
    technician: "Technician C",
    tissue: "NB - Cord Blood",
    flask: "5-stack",
    vials: 22.4,
    confluency: "89%",
    growTime: "104 hrs",
    stdDev: 4.2,
    freezings: 8,
    passagings: 16,
    discards: 2,
  },
  {
    date: "05/14/2026",
    technician: "Technician A",
    tissue: "NB - Cord Tissue",
    flask: "2-stack",
    vials: 16.9,
    confluency: "84%",
    growTime: "96 hrs",
    stdDev: 2.8,
    freezings: 11,
    passagings: 19,
    discards: 1,
  },
  {
    date: "04/24/2026",
    technician: "Technician B",
    tissue: "ADI",
    flask: "5-stack",
    vials: 25.1,
    confluency: "91%",
    growTime: "80 hrs",
    stdDev: 3.6,
    freezings: 9,
    passagings: 15,
    discards: 0,
  },
];

const labScheduleRows = [
  {
    date: "05/28/2026",
    time: "08:00 AM",
    process: "Freezing",
    status: "Available",
    processStartTime: "-",
    processEndTime: "-",
    technician: "-",
    client: "H4012",
    batch: "H4012-A01-P0-P20260508-01",
    sample: "ADI",
    section: "Batches Ready for Freezing",
    notes: "Enough vials projected for morning freeze.",
  },
  {
    date: "05/28/2026",
    time: "08:30 AM",
    process: "Isolation",
    status: "In Process",
    processStartTime: "08:35 AM",
    processEndTime: "-",
    technician: "Technician B",
    client: "H3988",
    batch: "H3988-CB01-P0-P20260503-01",
    sample: "NB - Cord Blood",
    section: "In-Progress Isolation Forms",
    notes: "Verify intake discrepancy before sign-off.",
  },
  {
    date: "05/28/2026",
    time: "09:15 AM",
    process: "Feeding",
    status: "Available",
    processStartTime: "-",
    processEndTime: "-",
    technician: "-",
    client: "H4150",
    batch: "H4150-CT01-P0-P20260511-01",
    sample: "NB - Cord Tissue",
    section: "Batches Ready for Feeding",
    notes: "Growth check requested after feed.",
  },
  {
    date: "05/28/2026",
    time: "10:00 AM",
    process: "Transfer",
    status: "Completed",
    processStartTime: "10:00 AM",
    processEndTime: "10:45 AM",
    technician: "Technician D",
    client: "H4205",
    batch: "H4205-BM01-P1-P20260514-01",
    sample: "BM",
    section: "Taken Off List",
    notes: "Transfer complete; awaiting QC review.",
  },
  {
    date: "05/28/2026",
    time: "11:30 AM",
    process: "Replate",
    status: "In Process",
    processStartTime: "11:35 AM",
    processEndTime: "-",
    technician: "Technician A",
    client: "H4211",
    batch: "H4211-BM01-P0-P20260509-01",
    sample: "BM",
    section: "In-Progress Replate Forms",
    notes: "Slow-growth observation added to form.",
  },
  {
    date: "05/28/2026",
    time: "01:00 PM",
    process: "Shipping",
    status: "Available",
    processStartTime: "-",
    processEndTime: "-",
    technician: "-",
    client: "H4077",
    batch: "H4077-A01-P0-P20260510-02",
    sample: "ADI",
    section: "Scheduled Shipping",
    notes: "Confirm quarantine release before pack-out.",
  },
  {
    date: "05/29/2026",
    time: "09:00 AM",
    process: "Passaging",
    status: "Available",
    processStartTime: "-",
    processEndTime: "-",
    technician: "-",
    client: "H4302",
    batch: "H4302-A01-P0-P20260512-01",
    sample: "ADI",
    section: "Batches Ready for Passaging",
    notes: "Passage window opens tomorrow morning.",
  },
  {
    date: "05/29/2026",
    time: "02:00 PM",
    process: "Freezing",
    status: "Completed",
    processStartTime: "02:00 PM",
    processEndTime: "03:15 PM",
    technician: "Technician D",
    client: "H3902",
    batch: "H3902-A01-P2-P20260428-01",
    sample: "ADI",
    section: "Taken Off List",
    notes: "Removed after discard decision.",
  },
];

const incubatorSpaces = [
  {
    incubator: "Incubator 1",
    rack: "Rack 1",
    status: "Occupied",
    batches: ["H4012-A01-P0-P20260508-01"],
    sample: "ADI",
    days: 5,
    owner: "Technician A",
    updated: "05/28/2026 07:45 AM",
  },
  {
    incubator: "Incubator 1",
    rack: "Rack 2",
    status: "Near Capacity",
    batches: ["H4205-BM01-P1-P20260514-01", "H4211-BM01-P0-P20260509-01"],
    sample: "BM",
    days: 9,
    owner: "Technician B",
    updated: "05/28/2026 08:10 AM",
  },
  {
    incubator: "Incubator 1",
    rack: "Rack 3",
    status: "Available",
    batches: [],
    sample: "None",
    days: 0,
    owner: "Unassigned",
    updated: "05/28/2026 06:30 AM",
  },
  {
    incubator: "Incubator 1",
    rack: "Rack 4",
    status: "Occupied",
    batches: ["H4150-CT01-P0-P20260511-01"],
    sample: "NB - Cord Tissue",
    days: 7,
    owner: "Technician C",
    updated: "05/28/2026 08:35 AM",
  },
  {
    incubator: "Incubator 1",
    rack: "Rack 5",
    status: "Available",
    batches: [],
    sample: "None",
    days: 0,
    owner: "Unassigned",
    updated: "05/28/2026 06:30 AM",
  },
  {
    incubator: "Incubator 1",
    rack: "Rack 6",
    status: "Occupied",
    batches: ["H3988-CB01-P0-P20260503-01"],
    sample: "NB - Cord Blood",
    days: 12,
    owner: "Technician D",
    updated: "05/28/2026 07:55 AM",
  },
  {
    incubator: "Incubator 2",
    rack: "Rack 1",
    status: "Available",
    batches: [],
    sample: "None",
    days: 0,
    owner: "Unassigned",
    updated: "05/28/2026 06:40 AM",
  },
  {
    incubator: "Incubator 2",
    rack: "Rack 2",
    status: "Occupied",
    batches: ["H4302-A01-P0-P20260512-01"],
    sample: "ADI",
    days: 4,
    owner: "Technician A",
    updated: "05/28/2026 08:20 AM",
  },
  {
    incubator: "Incubator 2",
    rack: "Rack 3",
    status: "Near Capacity",
    batches: ["H4077-A01-P0-P20260510-02", "H4099-A01-P2-P20260507-01"],
    sample: "ADI",
    days: 10,
    owner: "Technician C",
    updated: "05/28/2026 08:05 AM",
  },
  {
    incubator: "Incubator 2",
    rack: "Rack 4",
    status: "Available",
    batches: [],
    sample: "None",
    days: 0,
    owner: "Unassigned",
    updated: "05/28/2026 06:40 AM",
  },
  {
    incubator: "Incubator 2",
    rack: "Rack 5",
    status: "Occupied",
    batches: ["H3888-CT01-P0-P20260501-01"],
    sample: "NB - Cord Tissue",
    days: 15,
    owner: "Technician B",
    updated: "05/28/2026 07:25 AM",
  },
  {
    incubator: "Incubator 2",
    rack: "Rack 6",
    status: "Available",
    batches: [],
    sample: "None",
    days: 0,
    owner: "Unassigned",
    updated: "05/28/2026 06:40 AM",
  },
];

const incubatorHistoryRows = [
  ["Incubator 1", "Rack 1", "H3902-A01-P2-P20260428-01", "ADI", "05/10/2026", "05/20/2026", "10 days", "Technician D"],
  ["Incubator 1", "Rack 4", "H3888-CT01-P0-P20260501-01", "NB - Cord Tissue", "05/03/2026", "05/14/2026", "11 days", "Technician B"],
  ["Incubator 2", "Rack 2", "H4031-A01-P1-P20260502-01", "ADI", "05/05/2026", "05/16/2026", "11 days", "Technician A"],
  ["Incubator 2", "Rack 5", "H4205-BM01-P0-P20260430-01", "BM", "05/01/2026", "05/12/2026", "11 days", "Technician C"],
];

const equipmentRows = [
  {
    id: "BSC-01",
    name: "Biosafety Cabinet BSC-01",
    type: "Biosafety Cabinet",
    status: "In Use",
    daysInUse: 6,
    daysOut: 0,
    location: "Cleanroom A",
    process: "Isolation",
    technician: "Technician B",
    updated: "05/28/2026 08:15 AM",
  },
  {
    id: "CEN-02",
    name: "Centrifuge CEN-02",
    type: "Centrifuge",
    status: "Available",
    daysInUse: 0,
    daysOut: 0,
    location: "Cleanroom B",
    process: "None",
    technician: "Unassigned",
    updated: "05/28/2026 07:30 AM",
  },
  {
    id: "INC-01",
    name: "Incubator INC-01",
    type: "Incubator",
    status: "In Use",
    daysInUse: 22,
    daysOut: 0,
    location: "Incubator Room",
    process: "Culture Growth",
    technician: "Technician A",
    updated: "05/28/2026 08:35 AM",
  },
  {
    id: "MIC-01",
    name: "Microscope MIC-01",
    type: "Microscope",
    status: "Maintenance",
    daysInUse: 0,
    daysOut: 2,
    location: "QC Bench",
    process: "QC Review",
    technician: "Technician D",
    updated: "05/27/2026 04:20 PM",
  },
  {
    id: "CRF-01",
    name: "Controlled Rate Freezer CRF-01",
    type: "Freezer",
    status: "In Use",
    daysInUse: 3,
    daysOut: 0,
    location: "Freezing Suite",
    process: "Freezing",
    technician: "Technician C",
    updated: "05/28/2026 08:05 AM",
  },
  {
    id: "WB-01",
    name: "Water Bath WB-01",
    type: "Water Bath",
    status: "Out of Use",
    daysInUse: 0,
    daysOut: 5,
    location: "Cleanroom A",
    process: "Thaw Prep",
    technician: "Technician A",
    updated: "05/27/2026 02:45 PM",
  },
];

const reagentRows = [
  {
    name: "Culture Medium",
    lot: "CM-202605-A",
    status: "In Use",
    daysInUse: 4,
    expiration: "06/18/2026",
    location: "Cold Storage 1",
    process: "Feeding",
    quantity: "62%",
    notes: "Primary lot for active feedings.",
  },
  {
    name: "Trypsin",
    lot: "TR-202605-B",
    status: "Low Quantity",
    daysInUse: 8,
    expiration: "06/05/2026",
    location: "Cleanroom A",
    process: "Passaging",
    quantity: "18%",
    notes: "Reorder request submitted.",
  },
  {
    name: "Freezing Solution",
    lot: "FS-202605-C",
    status: "In Use",
    daysInUse: 3,
    expiration: "07/02/2026",
    location: "Freezing Suite",
    process: "Freezing",
    quantity: "44%",
    notes: "Reserved for afternoon freezing.",
  },
  {
    name: "PBS",
    lot: "PBS-202604-D",
    status: "Available",
    daysInUse: 0,
    expiration: "07/20/2026",
    location: "Cleanroom B",
    process: "Isolation",
    quantity: "88%",
    notes: "Ready for next isolation batch.",
  },
  {
    name: "FBS",
    lot: "FBS-202605-E",
    status: "Expiring Soon",
    daysInUse: 11,
    expiration: "06/01/2026",
    location: "Cold Storage 2",
    process: "Culture Growth",
    quantity: "33%",
    notes: "Use before newer lot.",
  },
  {
    name: "Antibiotic Solution",
    lot: "AB-202605-F",
    status: "Available",
    daysInUse: 1,
    expiration: "08/12/2026",
    location: "Cold Storage 1",
    process: "Culture Growth",
    quantity: "76%",
    notes: "No exceptions.",
  },
];

function Badge({ children, tone = "neutral" }) {
  const styles = {
    neutral: "bg-slate-100 text-slate-700 border-slate-200",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-100",
    red: "bg-red-50 text-red-700 border-red-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    purple: "bg-purple-50 text-purple-700 border-purple-100",
  };
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${styles[tone]}`}>
      {children}
    </span>
  );
}

function FlagBadge({ value }) {
  if (value === "Yes") return <Badge tone="red">Yes</Badge>;
  if (value === "No") return <Badge tone="green">No</Badge>;
  return <Badge tone="yellow">{value}</Badge>;
}

function OperationalStatusBadge({ value }) {
  const tone =
    value === "Available"
      ? "green"
      : value === "In Process" || value === "Near Capacity" || value === "Expiring Soon" || value === "Low Quantity"
        ? "yellow"
        : value === "Completed"
          ? "neutral"
          : value === "Out of Use" || value === "Maintenance"
            ? "red"
            : "blue";
  return <Badge tone={tone}>{value}</Badge>;
}

function StatusBadge({ value }) {
  const tone = value === "Ready" ? "green" : value === "Delayed" ? "red" : value === "At Risk" ? "yellow" : "blue";
  return <Badge tone={tone}>{value}</Badge>;
}

function KpiCard({ title, value, note, icon: Icon, onClick, active = false }) {
  return (
    <Card
      aria-pressed={onClick ? active : undefined}
      className={`rounded-lg shadow-sm transition ${
        onClick ? "cursor-pointer hover:border-slate-300 hover:shadow-md" : ""
      } ${active ? "border-slate-900 ring-2 ring-slate-900/10" : ""}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (!onClick) return;
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">{title}</p>
          {Icon && <Icon size={20} className="text-slate-500" />}
        </div>
        <p className="mt-3 text-3xl font-bold">{value}</p>
        <p className="mt-1 text-xs text-slate-500">{note}</p>
      </CardContent>
    </Card>
  );
}

function TopLevelTabs({ active, setActive }) {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardContent className="flex flex-wrap gap-2 p-2">
        {topLevelTabs.map((name) => (
          <button
            key={name}
            onClick={() => setActive(name)}
            aria-pressed={active === name}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition ${
              active === name ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
            type="button"
          >
            {name}
          </button>
        ))}
      </CardContent>
    </Card>
  );
}

function DashboardTabs({ active, setActive }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Batch Operational Dashboards</p>
          <h1 className="text-3xl font-bold tracking-tight">LIMS Batch Operational Dashboards</h1>
          <p className="mt-2 max-w-4xl text-sm text-slate-600">
            Separate operational views of shared batch data. The same batch may appear in multiple dashboards through relationship flags.
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2 rounded-lg"><ArrowUpRight size={16} /> Export</Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {dashboards.map((name) => (
          <button
            key={name}
            onClick={() => setActive(name)}
            aria-pressed={active === name}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === name ? "bg-slate-900 text-white" : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

function ReportTabs({ active, setActive }) {
  return (
    <div className="flex flex-wrap gap-2">
      {reportTabs.map((name) => (
        <button
          key={name}
          onClick={() => setActive(name)}
          aria-pressed={active === name}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            active === name ? "bg-slate-900 text-white" : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
          }`}
          type="button"
        >
          {name}
        </button>
      ))}
    </div>
  );
}

function LabDashboardTabs({ active, setActive }) {
  return (
    <div className="flex flex-wrap gap-2">
      {labTabs.map((name) => (
        <button
          key={name}
          onClick={() => setActive(name)}
          aria-pressed={active === name}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            active === name ? "bg-slate-900 text-white" : "bg-white text-slate-600 shadow-sm hover:bg-slate-100"
          }`}
          type="button"
        >
          {name}
        </button>
      ))}
    </div>
  );
}

function SimpleBarVisual({ label, value, max = 10 }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm"><span>{label}</span><span className="font-medium">{value}</span></div>
      <div className="h-3 overflow-hidden rounded-full bg-slate-100">
        <div className="h-full rounded-full bg-slate-700" style={{ width: `${Math.max(8, (value / max) * 100)}%` }} />
      </div>
    </div>
  );
}

function VisualCard({ title, children, className = "" }) {
  return (
    <Card className={`rounded-lg shadow-sm ${className}`}>
      <CardContent className="space-y-3 p-5">
        <h2 className="text-lg font-semibold">{title}</h2>
        {children}
      </CardContent>
    </Card>
  );
}

function CollapsibleSection({ title, children, className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className={`rounded-lg shadow-sm ${className}`}>
      <CardContent className="p-5">
        <button
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-3 text-left"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          <h2 className="text-lg font-semibold">{title}</h2>
          <ChevronDown
            className={`shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
            size={18}
          />
        </button>
        {open && <div className="mt-4">{children}</div>}
      </CardContent>
    </Card>
  );
}

function FilterStrip({ filters = [], searchValue, onSearchChange, placeholder = "Search client, batch, or order", showTags = true }) {
  const inputProps = onSearchChange
    ? {
        value: searchValue,
        onChange: (event) => onSearchChange(event.target.value),
      }
    : {};

  return (
    <Card className="rounded-lg shadow-sm">
      <CardContent className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between">
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 md:w-80">
          <Search size={16} />
          <input
            className="min-w-0 flex-1 bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
            placeholder={placeholder}
            type="search"
            {...inputProps}
          />
        </label>
        {showTags && (
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => <Badge key={filter} tone="neutral">{filter}</Badge>)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function SelectField({ label, options }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      <span className="font-medium text-slate-600">{label}</span>
      <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function ControlledSelectField({ label, options, value, onChange }) {
  return (
    <label className="flex min-w-0 flex-col gap-1 text-sm">
      <span className="font-medium text-slate-600">{label}</span>
      <select
        aria-label={label}
        className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function SampleIntakeIssueFilters({
  clinic,
  issueType,
  onClinicChange,
  onIssueTypeChange,
  onSearchChange,
  onTimeRangeChange,
  onTissueTypeChange,
  search,
  timeRange,
  tissueType,
}) {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardContent className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-5">
        <label className="flex min-w-0 flex-col gap-1 text-sm md:col-span-2 xl:col-span-1">
          <span className="font-medium text-slate-600">Search</span>
          <span className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-500">
            <Search size={16} />
            <input
              className="min-w-0 flex-1 bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Client or batch ID"
              type="search"
              value={search}
            />
          </span>
        </label>
        <ControlledSelectField label="Time Range" onChange={onTimeRangeChange} options={["Last 30 days", "Last 7 days", "This month", "Last quarter", "Custom range"]} value={timeRange} />
        <ControlledSelectField label="Tissue Type" onChange={onTissueTypeChange} options={["All tissue types", "ADI", "BM", "NB - Cord Blood", "NB - Cord Tissue"]} value={tissueType} />
        <ControlledSelectField label="Issue Type" onChange={onIssueTypeChange} options={["All issue types", "Delayed sample", "Temperature issue", "Incorrect ice packs", "Missing parafilm", "Low volume"]} value={issueType} />
        <ControlledSelectField label="Clinic" onChange={onClinicChange} options={["All clinics", "Clinic A", "Clinic B", "Clinic C"]} value={clinic} />
      </CardContent>
    </Card>
  );
}

function LabCleanroomFilters({
  flaskSize,
  onFlaskSizeChange,
  onSearchChange,
  onTechnicianChange,
  onTimeRangeChange,
  search,
  technician,
  timeRange,
}) {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardContent className="grid gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        <label className="flex min-w-0 flex-col gap-1 text-sm">
          <span className="font-medium text-slate-600">Search</span>
          <span className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-500">
            <Search size={16} />
            <input
              className="min-w-0 flex-1 bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search technician, tissue, or flask"
              type="search"
              value={search}
            />
          </span>
        </label>
        <ControlledSelectField label="Time Range" onChange={onTimeRangeChange} options={["All time", "Last 7 days", "Last 30 days"]} value={timeRange} />
        <ControlledSelectField label="Flask Size" onChange={onFlaskSizeChange} options={["All flask sizes", "1-stack", "2-stack", "5-stack"]} value={flaskSize} />
        <ControlledSelectField label="Technician" onChange={onTechnicianChange} options={["All technicians", "Technician A", "Technician B", "Technician C"]} value={technician} />
      </CardContent>
    </Card>
  );
}

function DashboardShell({ children }) {
  return <div className="space-y-5">{children}</div>;
}

function QuarantineDashboard() {
  const [search, setSearch] = useState("");
  const [quickFilter, setQuickFilter] = useState("All");

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return quarantineRows.filter((row) => {
      const matchesSearch =
        !query ||
        [row.batch, row.client, row.sample, row.reason, row.release, row.stage, row.inventory]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesQuickFilter =
        quickFilter === "All" ||
        (quickFilter === "Slow Growth Flag" && row.growth !== "No");

      return matchesSearch && matchesQuickFilter;
    });
  }, [quickFilter, search]);

  const toggleQuickFilter = (filterName) => {
    setQuickFilter((current) => (current === filterName ? "All" : filterName));
  };

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <KpiCard title="In Quarantine" value={quarantineRows.length} note="Show all quarantined batches" icon={AlertTriangle} active={quickFilter === "All"} onClick={() => setQuickFilter("All")} />
        <KpiCard title="Slow Growth Flag" value={quarantineRows.filter((r) => r.growth !== "No").length} note="Also in growth dashboard" icon={TrendingDown} active={quickFilter === "Slow Growth Flag"} onClick={() => toggleQuickFilter("Slow Growth Flag")} />
      </div>
      <FilterStrip
        filters={[`Showing ${filteredRows.length} of ${quarantineRows.length}`, quickFilter === "All" ? "All Quarantine" : quickFilter, "Sample Type", "Reason", "Initial/Replate", "Flask/Vials", "Release Date"]}
        onSearchChange={setSearch}
        placeholder="Search client, batch, reason, or release"
        searchValue={search}
        showTags={false}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="rounded-lg shadow-sm lg:col-span-2"><CardContent className="space-y-3 p-5"><h2 className="text-lg font-semibold">Quarantine by Reason</h2><SimpleBarVisual label="Sterility / contamination review" value={2} max={3} /><SimpleBarVisual label="QA hold / form correction" value={1} max={3} /><SimpleBarVisual label="Intake discrepancy" value={1} max={3} /><SimpleBarVisual label="Low dose count review" value={1} max={3} /></CardContent></Card>
        <Card className="rounded-lg shadow-sm"><CardContent className="p-5"><h2 className="text-lg font-semibold">Release Timing</h2><div className="mt-4 space-y-3 text-sm"><div className="flex justify-between rounded-lg bg-slate-100 p-3"><span>Needed today</span><strong>1</strong></div><div className="flex justify-between rounded-lg bg-slate-100 p-3"><span>Needed in 1–2 days</span><strong>2</strong></div><div className="flex justify-between rounded-lg bg-slate-100 p-3"><span>No shipment impact</span><strong>1</strong></div></div></CardContent></Card>
      </div>
      <DataTable columns={["Cell Batch ID", "Client ID", "Sample Type", "Date Placed", "Reason", "Expected Release", "Initial/Replate", "Flask/Vials", "Slow Growth", "Days Needed"]} rows={filteredRows.map(r => [r.batch, r.client, r.sample, r.placed, r.reason, r.release, <Badge tone="blue">{r.stage}</Badge>, <Badge tone="purple">{r.inventory}</Badge>, <FlagBadge value={r.growth === "No" ? "No" : "Yes"} />, r.daysNeeded === null ? "N/A" : r.daysNeeded === 0 ? "Today" : `${r.daysNeeded} day${r.daysNeeded > 1 ? "s" : ""}`])} />
    </DashboardShell>
  );
}

function ShippingDashboard() {
  const [search, setSearch] = useState("");
  const [quickFilter, setQuickFilter] = useState("All");

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return shippingRows.filter((row) => {
      const matchesSearch =
        !query ||
        [row.client, row.order, row.status, row.batches]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesQuickFilter =
        quickFilter === "All" ||
        (quickFilter === "Could Be Delayed" && row.status !== "Ready") ||
        (quickFilter === "Ready to Ship" && row.status === "Ready") ||
        (quickFilter === "Quarantine Blocked" && row.quarantine === "Yes") ||
        (quickFilter === "Vial Shortage" && row.banked < row.needed);

      return matchesSearch && matchesQuickFilter;
    });
  }, [quickFilter, search]);

  const toggleQuickFilter = (filterName) => {
    setQuickFilter((current) => (current === filterName ? "All" : filterName));
  };

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <KpiCard title="Shipments" value={shippingRows.length} note="Show all active requests" icon={Truck} active={quickFilter === "All"} onClick={() => setQuickFilter("All")} />
        <KpiCard title="Could Be Delayed" value={shippingRows.filter(r => r.status !== "Ready").length} note="Delayed or at risk" icon={AlertTriangle} active={quickFilter === "Could Be Delayed"} onClick={() => toggleQuickFilter("Could Be Delayed")} />
        <KpiCard title="Ready to Ship" value={shippingRows.filter(r => r.status === "Ready").length} note="Enough eligible vials" icon={CheckCircle2} active={quickFilter === "Ready to Ship"} onClick={() => toggleQuickFilter("Ready to Ship")} />
        <KpiCard title="Quarantine Blocked" value={shippingRows.filter(r => r.quarantine === "Yes").length} note="Related quarantine flag" icon={PackageCheck} active={quickFilter === "Quarantine Blocked"} onClick={() => toggleQuickFilter("Quarantine Blocked")} />
        <KpiCard title="Vial Shortage" value={shippingRows.filter(r => r.banked < r.needed).length} note="Banked less than needed" icon={Boxes} active={quickFilter === "Vial Shortage"} onClick={() => toggleQuickFilter("Vial Shortage")} />
      </div>
      <FilterStrip
        filters={[`Showing ${filteredRows.length} of ${shippingRows.length}`, quickFilter === "All" ? "All Shipments" : quickFilter, "Order Type", "Ready Status", "Quarantine Flag", "Slow Growth Flag", "Initial Flag"]}
        onSearchChange={setSearch}
        placeholder="Search client, batch, order, or status"
        searchValue={search}
        showTags={false}
      />
      <DataTable columns={["Client ID", "Type of Order", "Ready to Ship Status", "Vials Ordered", "Vials Banked", "Vials Needed", "Quarantine", "Slow Growth", "Initial", "Batches Used"]} rows={filteredRows.map(r => [r.client, r.order, <StatusBadge value={r.status} />, r.ordered, r.banked, r.needed, <FlagBadge value={r.quarantine} />, <FlagBadge value={r.growth} />, <FlagBadge value={r.initial} />, r.batches])} />
    </DashboardShell>
  );
}

function InitialsDashboard() {
  const [search, setSearch] = useState("");
  const [quickFilter, setQuickFilter] = useState("All");

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return initialRows.filter((row) => {
      const matchesSearch =
        !query ||
        [row.client, row.batch, row.sample, row.growth, row.intake]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesQuickFilter =
        quickFilter === "All" ||
        (quickFilter === "Slow Growth Flag" && row.growth !== "No") ||
        (quickFilter === "Intake Issues" && row.intake !== "None") ||
        (quickFilter === "Discard Flag" && row.discard === "Yes");

      return matchesSearch && matchesQuickFilter;
    });
  }, [quickFilter, search]);

  const toggleQuickFilter = (filterName) => {
    setQuickFilter((current) => (current === filterName ? "All" : filterName));
  };

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Initials Growing" value={initialRows.length} note="Show all active initials" icon={FlaskConical} active={quickFilter === "All"} onClick={() => setQuickFilter("All")} />
        <KpiCard title="Slow Growth Flag" value={initialRows.filter(r => r.growth !== "No").length} note="Growth concern" icon={TrendingDown} active={quickFilter === "Slow Growth Flag"} onClick={() => toggleQuickFilter("Slow Growth Flag")} />
        <KpiCard title="Intake Issues" value={initialRows.filter(r => r.intake !== "None").length} note="Pulled from intake" icon={ClipboardCheck} active={quickFilter === "Intake Issues"} onClick={() => toggleQuickFilter("Intake Issues")} />
        <KpiCard title="Discard Flag" value={initialRows.filter(r => r.discard === "Yes").length} note="Also in discard view" icon={Trash2} active={quickFilter === "Discard Flag"} onClick={() => toggleQuickFilter("Discard Flag")} />
      </div>
      <FilterStrip
        filters={[`Showing ${filteredRows.length} of ${initialRows.length}`, quickFilter === "All" ? "All Initials" : quickFilter, "Sample Type", "Days Growing", "Slow Growth Flag", "Discard Flag"]}
        onSearchChange={setSearch}
        placeholder="Search client, batch, sample, or issue"
        searchValue={search}
        showTags={false}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="rounded-lg shadow-sm"><CardContent className="space-y-3 p-5"><h2 className="text-lg font-semibold">Initials by Sample Type</h2><SimpleBarVisual label="ADI" value={1} max={3} /><SimpleBarVisual label="BM" value={1} max={3} /><SimpleBarVisual label="Cord Blood" value={1} max={3} /><SimpleBarVisual label="Cord Tissue" value={1} max={3} /></CardContent></Card>
        <Card className="rounded-lg shadow-sm"><CardContent className="space-y-3 p-5"><h2 className="text-lg font-semibold">Days Growing Buckets</h2><SimpleBarVisual label="0–7 days" value={0} max={4} /><SimpleBarVisual label="8–14 days" value={3} max={4} /><SimpleBarVisual label="15+ days" value={1} max={4} /></CardContent></Card>
      </div>
      <DataTable columns={["Client ID", "Cell Batch ID", "Sample Type", "Days Growing", "Slow Growth", "Discard", "Intake Issues"]} rows={filteredRows.map(r => [r.client, r.batch, r.sample, `${r.days} days`, r.growth === "No" ? <FlagBadge value="No" /> : <Badge tone="yellow">{r.growth}</Badge>, <FlagBadge value={r.discard} />, r.intake])} />
    </DashboardShell>
  );
}

function SlowGrowthDashboard() {
  const [search, setSearch] = useState("");
  const [quickFilter, setQuickFilter] = useState("All");

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return slowGrowthRows.filter((row) => {
      const matchesSearch =
        !query ||
        [row.client, row.batch, row.stage]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesQuickFilter =
        quickFilter === "All" ||
        (quickFilter === "Initial Batches" && row.initial === "Yes") ||
        (quickFilter === "Replates" && row.stage === "Replate") ||
        (quickFilter === "Quarantine Flag" && row.quarantine === "Yes");

      return matchesSearch && matchesQuickFilter;
    });
  }, [quickFilter, search]);

  const toggleQuickFilter = (filterName) => {
    setQuickFilter((current) => (current === filterName ? "All" : filterName));
  };

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Slow/No Growth" value={slowGrowthRows.length} note="Show all growth exceptions" icon={TrendingDown} active={quickFilter === "All"} onClick={() => setQuickFilter("All")} />
        <KpiCard title="Initial Batches" value={slowGrowthRows.filter(r => r.initial === "Yes").length} note="Initial growth concerns" icon={FlaskConical} active={quickFilter === "Initial Batches"} onClick={() => toggleQuickFilter("Initial Batches")} />
        <KpiCard title="Replates" value={slowGrowthRows.filter(r => r.stage === "Replate").length} note="Replate growth concerns" icon={Layers} active={quickFilter === "Replates"} onClick={() => toggleQuickFilter("Replates")} />
        <KpiCard title="Quarantine Flag" value={slowGrowthRows.filter(r => r.quarantine === "Yes").length} note="Also quarantined" icon={AlertTriangle} active={quickFilter === "Quarantine Flag"} onClick={() => toggleQuickFilter("Quarantine Flag")} />
      </div>
      <FilterStrip
        filters={[`Showing ${filteredRows.length} of ${slowGrowthRows.length}`, quickFilter === "All" ? "All Growth Exceptions" : quickFilter, "Initial/Replate", "Days Growing", "Initial Flag", "Quarantine Flag"]}
        onSearchChange={setSearch}
        placeholder="Search client, batch, or stage"
        searchValue={search}
        showTags={false}
      />
      <DataTable columns={["Client ID", "Batch ID", "Initial or Replate", "Days Growing", "Initial", "Quarantine"]} rows={filteredRows.map(r => [r.client, r.batch, <Badge tone="blue">{r.stage}</Badge>, `${r.days} days`, <FlagBadge value={r.initial} />, <FlagBadge value={r.quarantine} />])} />
    </DashboardShell>
  );
}

function DiscardDashboard() {
  const [search, setSearch] = useState("");
  const [quickFilter, setQuickFilter] = useState("All");

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return discardRows.filter((row) => {
      const matchesSearch =
        !query ||
        [row.client, row.batch, row.type, row.reason]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesQuickFilter =
        quickFilter === "All" ||
        (quickFilter === "Flask Discards" && row.type === "Flask") ||
        (quickFilter === "Vial Discards" && row.type === "Vials") ||
        (quickFilter === "Quarantine Flag" && row.quarantine === "Yes");

      return matchesSearch && matchesQuickFilter;
    });
  }, [quickFilter, search]);

  const toggleQuickFilter = (filterName) => {
    setQuickFilter((current) => (current === filterName ? "All" : filterName));
  };

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Discards" value={discardRows.length} note="Show all discard records" icon={Trash2} active={quickFilter === "All"} onClick={() => setQuickFilter("All")} />
        <KpiCard title="Flask Discards" value={discardRows.filter(r => r.type === "Flask").length} note="Discarded flasks" icon={FlaskConical} active={quickFilter === "Flask Discards"} onClick={() => toggleQuickFilter("Flask Discards")} />
        <KpiCard title="Vial Discards" value={discardRows.filter(r => r.type === "Vials").length} note="Discarded vials" icon={Boxes} active={quickFilter === "Vial Discards"} onClick={() => toggleQuickFilter("Vial Discards")} />
        <KpiCard title="Quarantine Flag" value={discardRows.filter(r => r.quarantine === "Yes").length} note="Was quarantined" icon={AlertTriangle} active={quickFilter === "Quarantine Flag"} onClick={() => toggleQuickFilter("Quarantine Flag")} />
      </div>
      <FilterStrip
        filters={[`Showing ${filteredRows.length} of ${discardRows.length}`, quickFilter === "All" ? "All Discards" : quickFilter, "Discard Type", "Reason", "Initial Flag", "Quarantine Flag"]}
        onSearchChange={setSearch}
        placeholder="Search client, batch, type, or reason"
        searchValue={search}
        showTags={false}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="rounded-lg shadow-sm"><CardContent className="space-y-3 p-5"><h2 className="text-lg font-semibold">Discard Type</h2><SimpleBarVisual label="Flask" value={2} max={3} /><SimpleBarVisual label="Vials" value={2} max={3} /></CardContent></Card>
        <Card className="rounded-lg shadow-sm"><CardContent className="space-y-3 p-5"><h2 className="text-lg font-semibold">Top Discard Reasons</h2><SimpleBarVisual label="No growth" value={1} max={2} /><SimpleBarVisual label="Low dose count" value={1} max={2} /><SimpleBarVisual label="Contamination concern" value={1} max={2} /><SimpleBarVisual label="Client-requested" value={1} max={2} /></CardContent></Card>
      </div>
      <DataTable columns={["Client ID", "Cell Batch ID", "Discard Type", "Reason for Discard", "Initial", "Quarantine"]} rows={filteredRows.map(r => [r.client, r.batch, <Badge tone="purple">{r.type}</Badge>, r.reason, <FlagBadge value={r.initial} />, <FlagBadge value={r.quarantine} />])} />
    </DashboardShell>
  );
}

function SampleIntakeIssuesReport() {
  const [search, setSearch] = useState("");
  const [timeRange, setTimeRange] = useState("Last 30 days");
  const [tissueType, setTissueType] = useState("All tissue types");
  const [issueType, setIssueType] = useState("All issue types");
  const [clinic, setClinic] = useState("All clinics");

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    const currentDate = new Date("2026-05-28T12:00:00");
    const rangeDays =
      timeRange === "Last 7 days"
        ? 7
        : timeRange === "Last 30 days" || timeRange === "This month" || timeRange === "Custom range"
          ? 30
          : timeRange === "Last quarter"
            ? 90
            : null;

    return intakeIssueRows.filter((row) => {
      const rowDate = new Date(`${row.issueDate} 12:00:00`);
      const daysOld = (currentDate - rowDate) / (1000 * 60 * 60 * 24);
      const rowIssueTypes = getIntakeIssueTypes(row);
      const rowIssueType = rowIssueTypes.join(" ");
      const matchesTimeRange = rangeDays === null || daysOld <= rangeDays;
      const matchesTissue = tissueType === "All tissue types" || row.tissueType === tissueType;
      const matchesIssue = issueType === "All issue types" || rowIssueTypes.includes(issueType);
      const matchesClinic = clinic === "All clinics" || row.clinic === clinic;
      const matchesSearch =
        !query ||
        [row.client, row.batch, row.tissueType, row.clinic, rowIssueType]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesSearch && matchesTimeRange && matchesTissue && matchesIssue && matchesClinic;
    });
  }, [clinic, issueType, search, timeRange, tissueType]);

  return (
    <DashboardShell>
      <SampleIntakeIssueFilters
        clinic={clinic}
        issueType={issueType}
        onClinicChange={setClinic}
        onIssueTypeChange={setIssueType}
        onSearchChange={setSearch}
        onTimeRangeChange={setTimeRange}
        onTissueTypeChange={setTissueType}
        search={search}
        timeRange={timeRange}
        tissueType={tissueType}
      />
      <DataTable
        title="Sample Intake Issues"
        description="Samples with intake condition, packaging, delay, or low-volume flags."
        columns={["Client ID", "Cell Batch ID", "Clinic", "Issue Type", "Tissue Type", "Sample Delayed by How Many Days", "Temperature of Sample", "Correct Ice Packs Used", "Parafilm Used", "Low Volume"]}
        rows={filteredRows.map(r => [r.client, r.batch, r.clinic, <Badge tone="yellow">{getIntakeIssueType(r)}</Badge>, r.tissueType, `${r.delayedDays} day${r.delayedDays === 1 ? "" : "s"}`, r.temperature, <FlagBadge value={r.icePacks} />, <FlagBadge value={r.parafilm} />, <FlagBadge value={r.lowVolume} />])}
      />
    </DashboardShell>
  );
}

function ClientLineageReport() {
  const [clientSearch, setClientSearch] = useState(clientLineageRows[0].client);
  const [batchTimeFrame, setBatchTimeFrame] = useState("All time");
  const [batchFlaskSize, setBatchFlaskSize] = useState("All flask sizes");
  const [batchTissueType, setBatchTissueType] = useState("All tissue types");
  const query = clientSearch.trim().toLowerCase();
  const selectedClient =
    clientLineageRows.find((row) => row.client.toLowerCase() === query) ||
    clientLineageRows.find((row) => row.client.toLowerCase().includes(query)) ||
    null;
  const selectedClientRows = selectedClient ? [selectedClient] : [];
  const selectedBatchRows = selectedClient?.batchRows || [];
  const selectedProcessingRows = selectedClient?.processingRows || [];
  const selectedQualityRows = selectedClient?.qualityRows || [];
  const batchFlaskOptions = ["All flask sizes", ...Array.from(new Set(selectedBatchRows.map((row) => row.flaskSize)))];
  const batchTissueOptions = ["All tissue types", ...Array.from(new Set(selectedBatchRows.map((row) => row.tissueType)))];
  const effectiveBatchFlaskSize = batchFlaskOptions.includes(batchFlaskSize) ? batchFlaskSize : "All flask sizes";
  const effectiveBatchTissueType = batchTissueOptions.includes(batchTissueType) ? batchTissueType : "All tissue types";
  const filteredBatchRows = selectedBatchRows.filter((row) => {
    const currentDate = new Date("2026-05-28T12:00:00");
    const batchDate = new Date(`${row.processingDate} 12:00:00`);
    const daysOld = (currentDate - batchDate) / (1000 * 60 * 60 * 24);
    const matchesTimeFrame =
      batchTimeFrame === "All time" ||
      (batchTimeFrame === "Last 7 days" && daysOld <= 7) ||
      (batchTimeFrame === "Last 30 days" && daysOld <= 30);
    const matchesFlaskSize = effectiveBatchFlaskSize === "All flask sizes" || row.flaskSize === effectiveBatchFlaskSize;
    const matchesTissueType = effectiveBatchTissueType === "All tissue types" || row.tissueType === effectiveBatchTissueType;

    return matchesTimeFrame && matchesFlaskSize && matchesTissueType;
  });

  return (
    <DashboardShell>
      <Card className="rounded-lg shadow-sm">
        <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-end lg:justify-between">
          <label className="flex min-w-0 flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-slate-600">Client Lookup</span>
            <span className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-slate-500">
              <Search size={16} />
              <input
                className="min-w-0 flex-1 bg-transparent text-slate-700 outline-none placeholder:text-slate-400"
                onChange={(event) => setClientSearch(event.target.value)}
                placeholder="Search one client ID"
                type="search"
                value={clientSearch}
              />
            </span>
          </label>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase text-slate-500">Showing Single Client</p>
            <p className="mt-1 text-lg font-bold text-slate-900">{selectedClient?.client || "No match"}</p>
          </div>
        </CardContent>
      </Card>
      <DataTable
        title={`Client Summary: ${selectedClient?.client || "No client selected"}`}
        description="Single-client profile snapshot for tissue samples, batches, and available inventory."
        columns={["Client ID", "Number of Tissue Samples", "Tissue Types", "Total Number of Batches", "Number of Batches Available"]}
        rows={selectedClientRows.map(r => [r.client, r.samples, r.tissueTypes, r.batches, r.availableBatches])}
      />
      <DataTable
        title="Client Batches"
        description="Batch-level lineage details for the selected client."
        columns={["Client Batch", "Tissue Type", "Flask Size", "Processing Date", "Freezing Date", "Slow Growth", "Quarantine", "Discard"]}
        headerContent={
          <div className="grid gap-4 md:grid-cols-3">
            <ControlledSelectField label="Time Frame" onChange={setBatchTimeFrame} options={["All time", "Last 7 days", "Last 30 days"]} value={batchTimeFrame} />
            <ControlledSelectField label="Flask Size" onChange={setBatchFlaskSize} options={batchFlaskOptions} value={effectiveBatchFlaskSize} />
            <ControlledSelectField label="Tissue Type" onChange={setBatchTissueType} options={batchTissueOptions} value={effectiveBatchTissueType} />
          </div>
        }
        rows={filteredBatchRows.map(r => [r.batch, r.tissueType, r.flaskSize, r.processingDate, r.freezingDate, <FlagBadge value={r.slowGrowth} />, <FlagBadge value={r.quarantine} />, <FlagBadge value={r.discard} />])}
      />
      <DataTable title="Processing Information" description="Growth and yield metrics by flask size." columns={["Client ID", "Flask Size", "Average Yield", "Average Time to Grow(Hr)", "Standard Dev", "Total Batches"]} rows={selectedProcessingRows.map(r => [selectedClient.client, r.flaskSize, r.avgYield, r.avgGrowHours, r.stdDev, r.totalBatches])} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DataTable title="Intake Information" description="Initial intake issues and tissue sample context." columns={["Client ID", "Initial Intake Issues", "Number of Tissue Samples", "Tissue Type"]} rows={selectedClientRows.map(r => [r.client, r.intakeIssues, r.samples, r.tissueTypes])} />
        <DataTable title="Current Banking Information" description="Current master and working bank availability." columns={["Client ID", "Master Bank Doses", "Working Bank Doses", "Number of Doses per Passage", "Number of Batches Available"]} rows={selectedClientRows.map(r => [r.client, r.masterBank, r.workingBank, r.passageDoses, r.availableBatches])} />
      </div>
      <DataTable
        title="Quality Events"
        description="Batch-level and shipping-level quality events for this client."
        columns={["Client ID", "Batch ID", "Batch-Level Quality Events", "Shipping-Level Quality Events", "Export Report"]}
        rows={selectedQualityRows.map(r => [
          selectedClient.client,
          r.batch,
          r.batchEvent,
          r.shippingEvent,
          <Button aria-label={`Export quality event PDF for ${r.batch}`} className="gap-2 rounded-lg px-3 py-1.5" variant="outline"><FileText size={14} /> PDF</Button>,
        ])}
      />
    </DashboardShell>
  );
}

function LabCleanroomReport() {
  const [search, setSearch] = useState("");
  const [timeRange, setTimeRange] = useState("All time");
  const [flaskSize, setFlaskSize] = useState("All flask sizes");
  const [technician, setTechnician] = useState("All technicians");

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    const currentDate = new Date("2026-05-28T12:00:00");
    const rangeDays = timeRange === "Last 7 days" ? 7 : timeRange === "Last 30 days" ? 30 : null;

    return cleanroomRows.filter((row) => {
      const rowDate = new Date(`${row.date} 12:00:00`);
      const daysOld = (currentDate - rowDate) / (1000 * 60 * 60 * 24);
      const matchesTimeRange = rangeDays === null || daysOld <= rangeDays;
      const matchesFlask = flaskSize === "All flask sizes" || row.flask === flaskSize;
      const matchesTechnician = technician === "All technicians" || row.technician === technician;
      const matchesSearch =
        !query ||
        [row.technician, row.tissue, row.flask, row.confluency, row.growTime]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesSearch && matchesTimeRange && matchesFlask && matchesTechnician;
    });
  }, [flaskSize, search, technician, timeRange]);

  const total = Math.max(1, filteredRows.length);
  const avg = (key) => (filteredRows.reduce((sum, r) => sum + r[key], 0) / total).toFixed(1);
  const avgConfluency = filteredRows.length
    ? `${Math.round(filteredRows.reduce((sum, r) => sum + Number.parseInt(r.confluency, 10), 0) / filteredRows.length)}%`
    : "0%";
  const avgGrowTime = filteredRows.length
    ? `${Math.round(filteredRows.reduce((sum, r) => sum + Number.parseInt(r.growTime, 10), 0) / filteredRows.length)} hrs`
    : "0 hrs";

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
        <KpiCard title="Avg Vials Yielded" value={avg("vials")} note="Across cleanroom runs" icon={FlaskConical} />
        <KpiCard title="Avg Confluency" value={avgConfluency} note="Mean visual confluency" icon={Activity} />
        <KpiCard title="Avg Time to Grow" value={avgGrowTime} note="Start to harvest" icon={TimerReset} />
        <KpiCard title="Std Dev Yield" value={avg("stdDev")} note="Vials yielded variance" icon={TrendingDown} />
        <KpiCard title="Freezings" value={filteredRows.reduce((sum, r) => sum + r.freezings, 0)} note="Completed freezing events" icon={Snowflake} />
        <KpiCard title="Passagings" value={filteredRows.reduce((sum, r) => sum + r.passagings, 0)} note="Completed passages" icon={Layers} />
        <KpiCard title="Discards" value={filteredRows.reduce((sum, r) => sum + r.discards, 0)} note="Discarded runs" icon={Trash2} />
      </div>
      <LabCleanroomFilters
        flaskSize={flaskSize}
        onFlaskSizeChange={setFlaskSize}
        onSearchChange={setSearch}
        onTechnicianChange={setTechnician}
        onTimeRangeChange={setTimeRange}
        search={search}
        technician={technician}
        timeRange={timeRange}
      />
      <CollapsibleSection title="Visual Summaries">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
          <VisualCard title="Yield by Flask Size"><SimpleBarVisual label="1-stack" value={18} max={26} /><SimpleBarVisual label="2-stack" value={17} max={26} /><SimpleBarVisual label="5-stack" value={25} max={26} /></VisualCard>
          <VisualCard title="Time by Tissue Type"><SimpleBarVisual label="ADI" value={77} max={120} /><SimpleBarVisual label="BM" value={91} max={120} /><SimpleBarVisual label="Cord Blood" value={104} max={120} /><SimpleBarVisual label="Cord Tissue" value={96} max={120} /></VisualCard>
          <VisualCard title="Yield by Technician"><SimpleBarVisual label="Technician A" value={18} max={26} /><SimpleBarVisual label="Technician B" value={20} max={26} /><SimpleBarVisual label="Technician C" value={22} max={26} /></VisualCard>
          <VisualCard title="Freezings vs Passagings"><SimpleBarVisual label="Freezings" value={52} max={90} /><SimpleBarVisual label="Passagings" value={90} max={90} /></VisualCard>
          <VisualCard title="Discards by Tissue"><SimpleBarVisual label="ADI" value={1} max={3} /><SimpleBarVisual label="BM" value={3} max={3} /><SimpleBarVisual label="Cord Blood" value={2} max={3} /><SimpleBarVisual label="Cord Tissue" value={1} max={3} /></VisualCard>
        </div>
      </CollapsibleSection>
      <DataTable
        title="Lab Cleanroom Performance"
        description="Technician, tissue, flask, growth, yield, and event counts for cleanroom operations."
        columns={["Technician", "Tissue Type", "Flask Size", "Average Vials Yielded", "Average Time to Grow", "Standard Deviation of Vials Yielded", "Number of Freezings", "Number of Passagings", "Number of Discards"]}
        rows={filteredRows.map(r => [r.technician, r.tissue, r.flask, r.vials, r.growTime, r.stdDev, r.freezings, r.passagings, r.discards])}
      />
    </DashboardShell>
  );
}

function ReportsPage() {
  const [activeReport, setActiveReport] = useState("Sample Intake Issues");

  const view = useMemo(() => {
    if (activeReport === "Client Lineage / Batch History") return <ClientLineageReport />;
    if (activeReport === "Lab Cleanroom") return <LabCleanroomReport />;
    return <SampleIntakeIssuesReport />;
  }, [activeReport]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Reporting</p>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="mt-2 max-w-4xl text-sm text-slate-600">
            Profile-style and operational reports using the same client, batch, intake, cleanroom, and quality event data.
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2 rounded-lg"><FileText size={16} /> Export Report</Button>
        </div>
      </div>
      <ReportTabs active={activeReport} setActive={setActiveReport} />
      {view}
    </div>
  );
}

function BatchOperationalDashboardsPage() {
  const [active, setActive] = useState("Initials");

  const view = useMemo(() => {
    if (active === "Quarantine") return <QuarantineDashboard />;
    if (active === "Initials") return <InitialsDashboard />;
    if (active === "Slow/No Growth") return <SlowGrowthDashboard />;
    return <DiscardDashboard />;
  }, [active]);

  return (
    <div className="space-y-6">
      <DashboardTabs active={active} setActive={setActive} />
      {view}
    </div>
  );
}

function TimelineSchedule({ rows }) {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardContent className="p-5">
        <h2 className="text-lg font-semibold">Timeline Schedule</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {rows.slice(0, 8).map((row) => (
            <div key={`${row.batch}-${row.time}`} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{row.process}</p>
                </div>
                <OperationalStatusBadge value={row.status} />
              </div>
              <p className="mt-3 truncate text-sm text-slate-600">{row.batch}</p>
              <p className="mt-1 text-xs text-slate-500">{row.technician === "-" ? row.section : `${row.technician} · ${row.section}`}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function RackCard({ rack }) {
  const statusStyles = {
    Available: "border-emerald-200 bg-emerald-50",
    Occupied: "border-blue-200 bg-blue-50",
    "Near Capacity": "border-yellow-200 bg-yellow-50",
  };

  return (
    <div className={`rounded-lg border p-4 ${statusStyles[rack.status] || "border-slate-200 bg-slate-50"}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">{rack.rack}</p>
          <p className="mt-1 text-xs text-slate-500">{rack.owner}</p>
        </div>
        <OperationalStatusBadge value={rack.status} />
      </div>
      <div className="mt-4 space-y-2 text-sm">
        <div>
          <p className="text-xs uppercase text-slate-500">Current Batches</p>
          <div className="mt-2 flex flex-col gap-2">
            {rack.batches.length ? (
              rack.batches.map((batch) => (
                <span key={batch} className="rounded-md border border-white/70 bg-white px-2 py-1 font-mono text-xs font-medium text-slate-800 shadow-sm">
                  {batch}
                </span>
              ))
            ) : (
              <span className="rounded-md border border-dashed border-emerald-300 bg-white/70 px-2 py-1 text-xs font-medium text-emerald-700">
                Open space
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
          <span>{rack.sample}</span>
          <span>{rack.days} days</span>
        </div>
        <p className="text-xs text-slate-500">Updated {rack.updated}</p>
      </div>
    </div>
  );
}

function IncubatorGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      {["Incubator 1", "Incubator 2"].map((incubator) => (
        <Card key={incubator} className="rounded-lg shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">{incubator}</h2>
                <p className="text-sm text-slate-500">Capacity view by rack and current batch ID</p>
              </div>
              <Badge tone="blue">6 racks</Badge>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {incubatorSpaces.filter((space) => space.incubator === incubator).map((rack) => (
                <RackCard key={`${rack.incubator}-${rack.rack}`} rack={rack} />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function LabManufacturingScheduleDashboard() {
  const activeTechs = new Set(labScheduleRows.filter((row) => row.date === "05/28/2026" && row.technician !== "-").map((row) => row.technician)).size;
  const [search, setSearch] = useState("");
  const [quickFilter, setQuickFilter] = useState("All");

  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();

    return labScheduleRows.filter((row) => {
      const matchesSearch =
        !query ||
        [row.date, row.time, row.process, row.status, row.technician, row.client, row.batch, row.sample, row.section, row.notes]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesQuickFilter =
        quickFilter === "All" ||
        (quickFilter === "Available Tasks" && row.status === "Available") ||
        (quickFilter === "In Process" && row.status === "In Process") ||
        (quickFilter === "Completed" && row.status === "Completed") ||
        (quickFilter === "Active Technicians" && row.date === "05/28/2026" && row.technician !== "-");

      return matchesSearch && matchesQuickFilter;
    });
  }, [quickFilter, search]);

  const toggleQuickFilter = (filterName) => {
    setQuickFilter((current) => (current === filterName ? "All" : filterName));
  };

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <KpiCard title="Scheduled Tasks" value={labScheduleRows.length} note="Show all manufacturing tasks" icon={ClipboardList} active={quickFilter === "All"} onClick={() => setQuickFilter("All")} />
        <KpiCard title="Available Tasks" value={labScheduleRows.filter(r => r.status === "Available").length} note="Ready list sections" icon={CheckCircle2} active={quickFilter === "Available Tasks"} onClick={() => toggleQuickFilter("Available Tasks")} />
        <KpiCard title="In Process" value={labScheduleRows.filter(r => r.status === "In Process").length} note="Open process forms" icon={TimerReset} active={quickFilter === "In Process"} onClick={() => toggleQuickFilter("In Process")} />
        <KpiCard title="Completed" value={labScheduleRows.filter(r => r.status === "Completed").length} note="Taken off list" icon={PackageCheck} active={quickFilter === "Completed"} onClick={() => toggleQuickFilter("Completed")} />
        <KpiCard title="Active Technicians" value={activeTechs} note="Assigned today" icon={Users} active={quickFilter === "Active Technicians"} onClick={() => toggleQuickFilter("Active Technicians")} />
      </div>
      <FilterStrip
        filters={[`Showing ${filteredRows.length} of ${labScheduleRows.length}`, quickFilter === "All" ? "All Tasks" : quickFilter, "Date / Time Span", "Process", "Status", "Technician", "Sample Type"]}
        onSearchChange={setSearch}
        placeholder="Search process, status, technician, client, or batch"
        searchValue={search}
        showTags={false}
      />
      <CollapsibleSection title="Visual Summaries">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <VisualCard title="Task Count by Process"><SimpleBarVisual label="Freezing" value={2} max={3} /><SimpleBarVisual label="Isolation" value={1} max={3} /><SimpleBarVisual label="Feeding" value={1} max={3} /><SimpleBarVisual label="Transfer" value={1} max={3} /><SimpleBarVisual label="Replate" value={1} max={3} /><SimpleBarVisual label="Shipping" value={1} max={3} /><SimpleBarVisual label="Passaging" value={1} max={3} /></VisualCard>
          <VisualCard title="Task Status Breakdown"><SimpleBarVisual label="Available" value={4} max={5} /><SimpleBarVisual label="In Process" value={2} max={5} /><SimpleBarVisual label="Completed" value={2} max={5} /></VisualCard>
          <VisualCard title="Technician Workload"><SimpleBarVisual label="Technician A" value={2} max={3} /><SimpleBarVisual label="Technician B" value={2} max={3} /><SimpleBarVisual label="Technician C" value={2} max={3} /><SimpleBarVisual label="Technician D" value={2} max={3} /></VisualCard>
          <VisualCard title="Time Blocks"><SimpleBarVisual label="Morning" value={5} max={6} /><SimpleBarVisual label="Afternoon" value={3} max={6} /><SimpleBarVisual label="Tomorrow" value={2} max={6} /></VisualCard>
        </div>
      </CollapsibleSection>
      <TimelineSchedule rows={filteredRows} />
      <DataTable
        title="Manufacturing Schedule"
        description="Upcoming and active lab manufacturing tasks by process, technician, status, and LIMS section."
        columns={["Process", "Status", "Process Start Time", "Process End Time", "Technician", "Client ID", "Cell Batch ID", "Sample Type", "Current LIMS Section", "Notes"]}
        rows={filteredRows.map(r => [r.process, <OperationalStatusBadge value={r.status} />, r.processStartTime, r.processEndTime, r.technician, r.client, r.batch, r.sample, r.section, r.notes])}
      />
    </DashboardShell>
  );
}

function IncubatorDashboard() {
  const [showCapacityView, setShowCapacityView] = useState(false);
  const incubatorRows = [
    {
      incubator: "Incubator 1",
      rackSpace: "Rack 1",
      client: "H4012",
      batch: "H4012-A01-P0-P20260508-01",
      passage: "P0",
      seedingDate: "05/08/2026",
      tissue: "ADI",
      stage: "Initial",
      confluency: "82%",
      days: 20,
      feedingDate: "05/26/2026",
      feedingType: "Complete",
      flask: "1-stack",
    },
    {
      incubator: "Incubator 1",
      rackSpace: "Rack 2",
      client: "H4205",
      batch: "H4205-BM01-P1-P20260514-01",
      passage: "P1",
      seedingDate: "05/14/2026",
      tissue: "BM",
      stage: "Replate",
      confluency: "76%",
      days: 14,
      feedingDate: "05/27/2026",
      feedingType: "Partial",
      flask: "5-stack",
    },
    {
      incubator: "Incubator 1",
      rackSpace: "Rack 2",
      client: "H4211",
      batch: "H4211-BM01-P0-P20260509-01",
      passage: "P0",
      seedingDate: "05/09/2026",
      tissue: "BM",
      stage: "Initial",
      confluency: "58%",
      days: 19,
      feedingDate: "05/25/2026",
      feedingType: "Partial",
      flask: "2-stack",
    },
    {
      incubator: "Incubator 1",
      rackSpace: "Rack 4",
      client: "H4150",
      batch: "H4150-CT01-P0-P20260511-01",
      passage: "P0",
      seedingDate: "05/11/2026",
      tissue: "NB - Cord Tissue",
      stage: "Initial",
      confluency: "69%",
      days: 17,
      feedingDate: "05/27/2026",
      feedingType: "Complete",
      flask: "2-stack",
    },
    {
      incubator: "Incubator 1",
      rackSpace: "Rack 6",
      client: "H3988",
      batch: "H3988-CB01-P0-P20260503-01",
      passage: "P0",
      seedingDate: "05/03/2026",
      tissue: "NB - Cord Blood",
      stage: "Initial",
      confluency: "51%",
      days: 25,
      feedingDate: "05/24/2026",
      feedingType: "Partial",
      flask: "1-stack",
    },
    {
      incubator: "Incubator 2",
      rackSpace: "Rack 2",
      client: "H4302",
      batch: "H4302-A01-P0-P20260512-01",
      passage: "P0",
      seedingDate: "05/12/2026",
      tissue: "ADI",
      stage: "Initial",
      confluency: "74%",
      days: 16,
      feedingDate: "05/26/2026",
      feedingType: "Complete",
      flask: "2-stack",
    },
    {
      incubator: "Incubator 2",
      rackSpace: "Rack 3",
      client: "H4077",
      batch: "H4077-A01-P0-P20260510-02",
      passage: "P0",
      seedingDate: "05/10/2026",
      tissue: "ADI",
      stage: "Initial",
      confluency: "88%",
      days: 18,
      feedingDate: "05/27/2026",
      feedingType: "Complete",
      flask: "5-stack",
    },
    {
      incubator: "Incubator 2",
      rackSpace: "Rack 5",
      client: "H3888",
      batch: "H3888-CT01-P0-P20260501-01",
      passage: "P0",
      seedingDate: "05/01/2026",
      tissue: "NB - Cord Tissue",
      stage: "Initial",
      confluency: "63%",
      days: 27,
      feedingDate: "05/23/2026",
      feedingType: "Partial",
      flask: "2-stack",
    },
  ];

  return (
    <DashboardShell>
      <Card className="rounded-lg shadow-sm">
        <CardContent className="grid gap-4 p-5 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">Entry Rules</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Plate is in the confluence check process</li>
              <li>Batch had an Isolation, Replate, or Passage performed</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Exit Rules</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Discard of plate</li>
              <li>Freezing of plate or batch</li>
            </ul>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button className="gap-2 rounded-lg" onClick={() => setShowCapacityView((current) => !current)} variant="outline">
          <Warehouse size={16} />
          {showCapacityView ? "Table View" : "Capacity View"}
        </Button>
      </div>
      {showCapacityView ? (
        <IncubatorGrid />
      ) : (
        <DataTable
          title="Incubator"
          description="Active incubator batches, feeding status, confluency, and flask details."
          columns={["Incubator", "Rack Space", "Client ID", "Batch ID", "Passage #", "Seeding Date", "Tissue Type", "Replate/Initial", "Last Confluency", "Days Incubator", "Last Feeding Date", "Last Feeding Type (Complete/ Partial)", "Flask Size"]}
          rows={incubatorRows.map(r => [r.incubator, r.rackSpace, r.client, r.batch, r.passage, r.seedingDate, r.tissue, r.stage, r.confluency, r.days, r.feedingDate, r.feedingType, r.flask])}
        />
      )}
    </DashboardShell>
  );
}

function LabEquipmentReagentDashboard() {
  const attentionItems =
    equipmentRows.filter((row) => ["Out of Use", "Maintenance"].includes(row.status)).length +
    reagentRows.filter((row) => ["Expiring Soon", "Low Quantity"].includes(row.status)).length;
  const equipmentInUse = equipmentRows.filter((row) => row.status === "In Use");
  const averageDaysInUse = (equipmentInUse.reduce((sum, row) => sum + row.daysInUse, 0) / equipmentInUse.length).toFixed(1);

  return (
    <DashboardShell>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        <KpiCard title="Equipment In Use" value={equipmentInUse.length} note="Actively assigned" icon={Wrench} />
        <KpiCard title="Equipment Out of Use" value={equipmentRows.filter(r => r.status === "Out of Use").length} note="Unavailable equipment" icon={AlertTriangle} />
        <KpiCard title="Reagents In Use" value={reagentRows.filter(r => r.status === "In Use").length} note="Open reagent lots" icon={Beaker} />
        <KpiCard title="Needs Attention" value={attentionItems} note="Maintenance, low, expiring" icon={ClipboardCheck} />
        <KpiCard title="Avg Days in Use" value={averageDaysInUse} note="Equipment in use" icon={TimerReset} />
      </div>
      <FilterStrip filters={["Equipment Type", "Reagent Type", "Status", "Days in Use", "Days Out of Use", "Location"]} showTags={false} />
      <DataTable
        title="Equipment Usage"
        description="Equipment currently in use, availability, downtime, process assignment, and location."
        columns={["Equipment ID", "Equipment Name", "Equipment Type", "Status", "Days in Use", "Days Out of Use", "Location", "Current Process", "Assigned Technician", "Last Updated"]}
        rows={equipmentRows.map(r => [r.id, r.name, r.type, <OperationalStatusBadge value={r.status} />, r.daysInUse, r.daysOut, r.location, r.process, r.technician, r.updated])}
      />
      <DataTable
        title="Reagent Usage"
        description="Open reagent lots, inventory condition, expiration risk, and process usage."
        columns={["Reagent Name", "Lot Number", "Status", "Days in Use", "Expiration Date", "Location", "Used For Process", "Quantity Remaining", "Notes"]}
        rows={reagentRows.map(r => [r.name, r.lot, <OperationalStatusBadge value={r.status} />, r.daysInUse, r.expiration, r.location, r.process, r.quantity, r.notes])}
      />
    </DashboardShell>
  );
}

function LabOperationalDashboardPage() {
  const [activeLab, setActiveLab] = useState("Lab Manufacturing / Schedule");

  const view = useMemo(() => {
    if (activeLab === "Incubator") return <IncubatorDashboard />;
    return <LabManufacturingScheduleDashboard />;
  }, [activeLab]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">Lab Operations Command Center</p>
          <h1 className="text-3xl font-bold tracking-tight">Lab Operational Dashboard</h1>
          <p className="mt-2 max-w-4xl text-sm text-slate-600">
            Scheduling and incubator capacity views for active lab manufacturing operations.
          </p>
        </div>
      </div>
      <LabDashboardTabs active={activeLab} setActive={setActiveLab} />
      {view}
    </div>
  );
}

function DataTable({ columns, rows, title = "Detailed Work Queue", description = "Main operational table for review, filtering, and follow-up.", headerContent = null }) {
  return (
    <Card className="rounded-lg shadow-sm">
      <CardContent className="p-5">
        <div className="mb-4 space-y-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-slate-500">{description}</p>
          {headerContent}
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
                {columns.map((col) => <th key={col} className="p-3">{col}</th>)}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className="border-b bg-white hover:bg-slate-50">
                  {row.map((cell, cellIdx) => <td key={cellIdx} className="p-3 align-middle">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LimsBatchDashboardMockups() {
  const [activeTopLevel, setActiveTopLevel] = useState("Batch Operational Dashboards");

  const view = useMemo(() => {
    if (activeTopLevel === "Lab Operational Dashboard") return <LabOperationalDashboardPage />;
    if (activeTopLevel === "Reports") return <ReportsPage />;
    return <BatchOperationalDashboardsPage />;
  }, [activeTopLevel]);

  return (
    <div className="min-h-screen bg-slate-50 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <TopLevelTabs active={activeTopLevel} setActive={setActiveTopLevel} />
        {view}
      </div>
    </div>
  );
}
