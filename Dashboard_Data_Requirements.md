# LIMS Dashboard Mockup - Data Requirements and Source Mapping

Document purpose: outline each page and dashboard in the mockup, the items shown on each page, and the data or calculations needed to power them.

How to use this document: copy into Google Docs and fill in the blank source-mapping sections with the correct system, table, API, report, or calculation owner.

Source mapping fields to complete for each section:

- Source system:
- Source table, API, report, or query:
- Required source fields:
- Join keys:
- Calculation logic:
- Refresh frequency:
- Data owner:
- Validation notes:
- Open questions:

## 1. Application Structure

Top-level navigation:

- Batch Operational Dashboards
- Lab Operational Dashboard
- Reports

Global assumptions:

- Client ID and Batch ID should be treated as primary linking fields across dashboards.
- Batch-level flags such as Slow Growth, Quarantine, Discard, Initial/Replate, and Shipment/Order impact should come from shared operational status logic where possible.
- All date-based filters should use an agreed reference date/time zone and should be consistent across dashboards.

Source system:

Required source fields:

Join keys:

Calculation logic:

Refresh frequency:

Data owner:

Open questions:

## 2. Batch Operational Dashboards

### 2.1 Initials Dashboard

Purpose: show active initial batches and key exception flags.

Summary cards:

- Initials Growing: count of active initial rows.
- Slow Growth Flag: count of active initial rows where growth status is not "No".
- Intake Issues: count of rows where intake issue is not "None".
- Discard Flag: count of rows where discard flag is "Yes".

Filters and search:

- Search by client, batch, sample, or issue.
- Quick filters from summary cards.
- Display filter labels: Sample Type, Days Growing, Slow Growth Flag, Discard Flag.

Main table columns:

- Client ID
- Cell Batch ID
- Sample Type
- Days Growing
- Slow Growth
- Discard
- Intake Issues

Calculations:

- Days Growing: current date minus growth/seeding/start date.
- Slow Growth Flag: derive from growth exception status.
- Discard Flag: derive from discard workflow or disposition status.
- Intake Issues: derive from intake issue records.

Source system:

Required source fields:

Join keys:

Calculation logic:

Refresh frequency:

Data owner:

Open questions:

### 2.2 Slow/No Growth Dashboard

Purpose: show batches with slow or no growth exceptions.

Summary cards:

- Slow/No Growth: count of all growth exception rows.
- Initial Batches: count where Initial flag is "Yes".
- Replates: count where stage is "Replate".
- Quarantine Flag: count where Quarantine flag is "Yes".

Filters and search:

- Search by client, batch, or stage.
- Quick filters from summary cards.
- Display filter labels: Initial/Replate, Days Growing, Initial Flag, Quarantine Flag.

Main table columns:

- Client ID
- Batch ID
- Initial or Replate
- Days Growing
- Initial
- Quarantine

Calculations:

- Days Growing: current date minus growth/seeding/start date.
- Initial/Replate: derive from batch process stage or passage/replate workflow.
- Quarantine flag: derive from current quarantine status.

Source system:

Required source fields:

Join keys:

Calculation logic:

Refresh frequency:

Data owner:

Open questions:

### 2.3 Quarantine Dashboard

Purpose: show batches currently in quarantine and related release timing.

Summary cards:

- In Quarantine: count of quarantined batches.
- Slow Growth Flag: count of quarantined batches also flagged for growth issues.

Filters and search:

- Search by client, batch, reason, or release date.
- Quick filters from summary cards.
- Display filter labels: Sample Type, Reason, Initial/Replate, Flask/Vials, Release Date.

Visual summaries:

- Quarantine by Reason.
- Release Timing.

Main table columns:

- Cell Batch ID
- Client ID
- Sample Type
- Date Placed
- Reason
- Expected Release
- Initial/Replate
- Flask/Vials
- Slow Growth
- Days Needed

Calculations:

- Days Needed: expected release date minus current date. Show "Today" when zero and "N/A" when expected release is unavailable.
- Slow Growth flag: derive from growth exception status.
- Quarantine reason: derive from QA hold, sterility, contamination, intake discrepancy, or other quarantine reason codes.

Source system:

Required source fields:

Join keys:

Calculation logic:

Refresh frequency:

Data owner:

Open questions:

### 2.4 Discard Dashboard

Purpose: show discarded flasks, vials, and related flags.

Summary cards:

- Discards: count of all discard records.
- Flask Discards: count where discard type is Flask.
- Vial Discards: count where discard type is Vials.
- Quarantine Flag: count where discarded material was quarantined.

Filters and search:

- Search by client, batch, type, or reason.
- Quick filters from summary cards.
- Display filter labels: Discard Type, Reason, Initial Flag, Quarantine Flag.

Visual summaries:

- Discard Type.
- Top Discard Reasons.

Main table columns:

- Client ID
- Cell Batch ID
- Discard Type
- Reason for Discard
- Initial
- Quarantine

Calculations:

- Discard type: derive from discarded inventory/material type.
- Reason for discard: derive from discard workflow reason.
- Initial flag: derive from batch process stage.
- Quarantine flag: derive from quarantine history or current status.

Source system:

Required source fields:

Join keys:

Calculation logic:

Refresh frequency:

Data owner:

Open questions:

## 3. Lab Operational Dashboard

### 3.1 Lab Manufacturing / Schedule

Purpose: show active and upcoming lab manufacturing tasks.

Summary cards:

- Scheduled Tasks: count of all schedule rows.
- Available Tasks: count where status is Available.
- In Process: count where status is In Process.
- Completed: count where status is Completed.
- Active Technicians: count of assigned technicians for the current day, excluding unassigned rows.

Filters and search:

- Search by process, status, technician, client, or batch.
- Quick filters from summary cards.
- Display filter labels: Date / Time Span, Process, Status, Technician, Sample Type.

Visual summaries:

- Task Count by Process.
- Task Status Breakdown.
- Technician Workload.
- Time Blocks.

Timeline schedule cards:

- Process
- Status
- Batch ID
- Technician, when assigned
- Current LIMS section

Manufacturing Schedule table columns:

- Process
- Status
- Process Start Time
- Process End Time
- Technician
- Client ID
- Cell Batch ID
- Sample Type
- Current LIMS Section
- Notes

Status rules:

- Available: Process Start Time, Process End Time, and Technician should be blank or "-".
- In Process: Process Start Time should be populated; Process End Time should be blank or "-".
- Completed: Process Start Time and Process End Time should both be populated.

Calculations:

- Scheduled Tasks: count of task records in selected scope.
- Active Technicians: distinct technician count for current day where technician is assigned.
- Time Blocks: group tasks by scheduled time or process window.

Source system:

Required source fields:

Join keys:

Calculation logic:

Refresh frequency:

Data owner:

Open questions:

### 3.2 Incubator Dashboard

Purpose: show batches currently represented in incubator operations, plus a capacity visual by incubator and rack.

Ruleset shown at top of page:

- Entry rule: plate is in the confluence check process.
- Entry rule: batch had an Isolation, Replate, or Passage performed to it.
- Exit rule: discard of plate.
- Exit rule: freezing of plate or batch.

View toggle:

- Table View: detailed incubator batch table.
- Capacity View: visual layout of incubators and racks with current Batch IDs under each rack.

Capacity View:

- Incubator 1 and Incubator 2.
- Six racks per incubator.
- Each rack shows current Batch IDs or "Open space".
- Rack status states: Available, Occupied, Near Capacity.
- Supporting rack information shown in visual: owner/technician, sample type, days, last updated.

Incubator table columns:

- Incubator
- Rack Space
- Client ID
- Batch ID
- Passage #
- Seeding Date
- Tissue Type
- Replate/Initial
- Last Confluency
- Days Incubator
- Last Feeding Date
- Last Feeding Type (Complete/ Partial)
- Flask Size

Calculations:

- Days Incubator: current date minus seeding date or incubator entry date.
- Replate/Initial: derive from batch process stage or passage workflow.
- Last Confluency: most recent confluence check result.
- Last Feeding Date and Type: most recent feeding event associated with the batch/plate.
- Rack status: derive from rack occupancy rules and capacity thresholds.

Source system:

Required source fields:

Join keys:

Calculation logic:

Refresh frequency:

Data owner:

Open questions:

## 4. Reports

### 4.1 Sample Intake Issues Report

Purpose: show samples with intake condition, packaging, delay, temperature, or low-volume flags.

Filters:

- Search by client or batch ID.
- Time Range: Last 30 days, Last 7 days, This month, Last quarter, Custom range.
- Tissue Type: All tissue types, ADI, BM, NB - Cord Blood, NB - Cord Tissue.
- Issue Type: All issue types, Delayed sample, Temperature issue, Incorrect ice packs, Missing parafilm, Low volume.
- Clinic: All clinics, Clinic A, Clinic B, Clinic C.

Main table columns:

- Client ID
- Cell Batch ID
- Clinic
- Issue Type
- Tissue Type
- Sample Delayed by How Many Days
- Temperature of Sample
- Correct Ice Packs Used
- Parafilm Used
- Low Volume

Calculations:

- Issue Type: may be a multi-value derived field from intake checks.
- Sample Delayed by How Many Days: actual received date minus expected received date.
- Temperature issue: derive from accepted temperature range.
- Correct Ice Packs Used, Parafilm Used, Low Volume: derive from intake checklist.

Source system:

Required source fields:

Join keys:

Calculation logic:

Refresh frequency:

Data owner:

Open questions:

### 4.2 Client Lineage / Batch History Report

Purpose: allow user to search by Client ID and see client summary, batches, processing metrics, intake information, current banking information, and quality events.

Client lookup:

- Search one Client ID.
- Selected client drives all tables on the page.

Client Summary table columns:

- Client ID
- Number of Tissue Samples
- Tissue Types
- Total Number of Batches
- Number of Batches Available

Client Batches table:

- Includes table-specific filters in the table header.

Client Batches filters:

- Time Frame: All time, Last 7 days, Last 30 days.
- Flask Size: dynamically derived from selected client's batch rows.
- Tissue Type: dynamically derived from selected client's batch rows.

Client Batches table columns:

- Client Batch
- Tissue Type
- Flask Size
- Processing Date
- Freezing Date
- Slow Growth
- Quarantine
- Discard

Processing Information table columns:

- Client ID
- Flask Size
- Average Yield
- Average Time to Grow(Hr)
- Standard Dev
- Total Batches

Intake Information table columns:

- Client ID
- Initial Intake Issues
- Number of Tissue Samples
- Tissue Type

Current Banking Information table columns:

- Client ID
- Master Bank Doses
- Working Bank Doses
- Number of Doses per Passage
- Number of Batches Available

Quality Events table columns:

- Client ID
- Batch ID
- Batch-Level Quality Events
- Shipping-Level Quality Events
- Export Report

Quality Events actions:

- Export Report button per event to export a PDF for that quality event.

Calculations:

- Number of Tissue Samples: count of tissue sample records for selected client.
- Total Number of Batches: count of all batches associated with selected client.
- Number of Batches Available: count of batches with available inventory/status.
- Average Yield: average vials yielded by flask size.
- Average Time to Grow(Hr): average grow time by flask size.
- Standard Dev: standard deviation of vials yielded by flask size.
- Total Batches: count of batches by flask size.
- Slow Growth, Quarantine, Discard: derive from batch-level exception/status workflows.
- Export Report: generate a PDF using selected Client ID, Batch ID, and quality event details.

Source system:

Required source fields:

Join keys:

Calculation logic:

Refresh frequency:

Data owner:

Open questions:

### 4.3 Lab Cleanroom Report

Purpose: show cleanroom performance across technicians, tissue types, flask sizes, yield, growth time, and process event counts.

Summary cards:

- Avg Vials Yielded.
- Avg Confluency.
- Avg Time to Grow.
- Std Dev Yield.
- Freezings.
- Passagings.
- Discards.

Filters:

- Search.
- Time Range: All time, Last 7 days, Last 30 days.
- Flask Size: All flask sizes, 1-stack, 2-stack, 5-stack.
- Technician: All technicians, Technician A, Technician B, Technician C.

Visual summaries:

- Yield by Flask Size.
- Time by Tissue Type.
- Yield by Technician.
- Freezings vs Passagings.
- Discards by Tissue.

Main table columns:

- Technician
- Tissue Type
- Flask Size
- Average Vials Yielded
- Average Time to Grow
- Standard Deviation of Vials Yielded
- Number of Freezings
- Number of Passagings
- Number of Discards

Calculations:

- Avg Vials Yielded: average vials yielded across filtered rows.
- Avg Confluency: average confluency percentage across filtered rows.
- Avg Time to Grow: average grow time in hours across filtered rows.
- Std Dev Yield: standard deviation of vials yielded.
- Freezings, Passagings, Discards: sum of event counts across filtered rows.
- Visual summaries: aggregate by flask size, tissue type, technician, process event type, or discard tissue.

Source system:

Required source fields:

Join keys:

Calculation logic:

Refresh frequency:

Data owner:

Open questions:

## 5. Shared Data Definitions

Recommended shared dimensions:

- Client ID
- Batch ID
- Tissue Type
- Sample Type
- Flask Size
- Passage #
- Initial/Replate
- Technician
- Process
- Status
- Date fields
- Current LIMS section

Recommended shared flags:

- Slow Growth
- Quarantine
- Discard
- Initial
- Available
- In Process
- Completed

Recommended date calculations:

- Days Growing = current date minus growth start date.
- Days Incubator = current date minus seeding date or incubator entry date.
- Days Needed = expected release date minus current date.
- Average Time to Grow(Hr) = average of completed grow duration in hours.

Recommended event sources:

- Intake events.
- Isolation events.
- Replate events.
- Passage events.
- Feeding events.
- Confluence checks.
- Quarantine events.
- Discard events.
- Freezing events.
- Shipping/order events.
- Quality events.

Source system:

Required source fields:

Join keys:

Calculation logic:

Refresh frequency:

Data owner:

Open questions:

## 6. Implementation Notes for Developers

Recommended approach:

- Build a shared batch fact view keyed by Client ID and Batch ID.
- Build separate event tables or views for intake, manufacturing process steps, incubator activity, quality events, freezing, discard, quarantine, and shipping/order activity.
- Use derived status fields consistently across dashboards so counts and flags reconcile.
- Keep page-level filters and table-level filters scoped clearly. For example, Client Batches filters should only filter Client Batches.
- Define a standard "current date" and time zone for mockups, testing, and production calculations.
- Add QA checks for count reconciliation between summary cards and table rows.

Open implementation decisions:

- Should dashboards show only active records, all historical records, or both?
- What is the authoritative source for Client ID and Batch ID?
- What is the authoritative source for current batch status?
- How should multiple simultaneous flags be prioritized visually?
- Should PDF export be generated client-side, server-side, or through an existing reporting tool?
- What role permissions are required for quality event export?

