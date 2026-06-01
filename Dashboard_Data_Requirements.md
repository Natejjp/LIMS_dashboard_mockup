 

LIMS Dashboard Mockup  

Document purpose: outline each page and dashboard in the mockup, the items shown on each page, and the data or calculations needed to power them. 

1. Application Structure 

Top-level navigation: 

Batch Operational Dashboards 

Lab Operational Dashboard 

Reports 

Global assumptions: 

Client ID and Batch ID should be treated as primary linking fields across dashboards. 

Batch-level flags such as Slow Growth, Quarantine, Discard and Initial/Replate should come from shared operational status logic where possible. 

2. Batch Operational Dashboards 

2.1 Initials Dashboard 

Purpose: show active initial batches and key exception flags. 

Displayed if a batch has an isolation form BPF-1 and intake form that is completed but does not have freezing form BPF-3. 

Remove if the batch is frozen or discarded. Freezing form BPF-3, discard frm-42 

Summary cards: 

Initials Growing: count of active initial rows. 

Slow Growth Flag: count of active initial rows where growth status is not "No". 

Intake Issues: count of rows where intake issue is not "None". 

Discard Flag: count of rows where discard flag is "Yes". 

Filters and search: 

Search by client, batch, sample, or issue. 

Quick filters from summary cards. 

Main table columns: 

Client ID 

Cell Batch ID 

Sample Type 

Days Growing 

Slow Growth 

Discard 

Intake Issues 

Calculations: 

Days Growing:  

current date minus growth/seeding/start date.  

Slow Growth Flag:  

If the Batch is also in the slow/no growth dashboard 

Discard Flag:  

If the batch has FRM-42 

Intake Issues:  

derive from intake issue records. 

2.2 Slow/No Growth Dashboard 

Purpose: show batches with slow or no growth exceptions. 

Displayed if a batch has a slow growth based on the below. 

Initials ADI: More than 18 days since seeding date 

Initials NB: More than 20 days since seeding date 

2 stack: More than 5 days since the seeding date 

5 stack: More than 8 days seince the seeding date 

Remove if the batch is frozen or discarded. Freezing form BPF-3, discard frm-42 

 

Summary cards: 

Slow/No Growth: count of all growth exception rows. 

Initial Batches: count where the Initial or Replate is "Initial". 

Replates: count where the Initial or Replate is "Replate". 

Quarantine Flag: count where Quarantine flag is "Yes". 

Filters and search: 

Search by client, batch, or stage. 

Quick filters from summary cards. 

Main table columns: 

Client ID 

Batch ID 

Initial or Replate 

Days Growing 

Quarantine 

Discard 

Calculations: 

Days Growing:  

current date minus growth/seeding/start date. 

Initial/Replate:  

derive from batch process stage or passage/replate workflow. 

If the batch has Isolation BPF-9 form then it would be “Initial” 

If the batch has Replating BPF-8 form then it would be ”Replate” 

NEED logic for when passaging occurs. A batch that has the passaging form could have a parent batch that was an initial or replate 

Quarantine flag:  

If batch is displayed in quarantine table 

Discard flag 

If batch is displayed in discard table 

2.3 Quarantine Dashboard 

Purpose: show batches currently in quarantine and related release timing. 

Displayed if batch has a sterility testing investigation form FRM-11.  

Removed if sterility testing FRM-11 passes or fails or if discarded FRM-42. 

Summary cards: 

In Quarantine: count of quarantined batches. 

Slow Growth Flag: count of quarantined batches also flagged for growth issues. 

Filters and search: 

Search by client, batch, reason, or release date. 

Quick filters from summary cards. 

Visual summaries: 

Quarantine by Reason. 

Release Timing. 

Main table columns: 

Cell Batch ID 

Client ID 

Sample Type 

Date Placed 

Reason 

Expected Release 

Initial/Replate 

Flask/Vials 

Slow Growth 

Days Needed 

Calculations: 

Date Placed: 

Date the sterility testing investigation FRM-11 started. 

Expected Release: 

Fourteen days from the date placed. 

Initial/Replate:  

derive from batch process stage or passage/replate workflow. 

If the batch has Isolation BPF-9 form then it would be “Initial” 

If the batch has Replating BPF-8 form then it would be ”Replate” 

NEED logic for when passaging occurs. A batch that has the passaging form could have a parent batch that was an initial or replate 

 

2.4 Discard Dashboard 

Purpose: show discarded flasks, vials, and related flags. 

Displayed if batch has FRM-42.  

Summary cards: 

Discards: count of all discard records. 

Flask Discards: count where discard type is Flask. 

Vial Discards: count where discard type is Vials. 

Quarantine Flag: count where discarded material was quarantined. 

Filters and search: 

Search by client, batch, type, or reason. 

Quick filters from summary cards. 

Visual summaries: 

Discard Type. 

Top Discard Reasons. 

Main table columns: 

Client ID 

Cell Batch ID 

Discard Type 

Reason for Discard 

Initial 

Quarantine 

Calculations: 

Discard type:  

Field on FRM-42. 

Reason for discard:  

Field on FRM-42 

Initial flag:  

If the batch is in initial dashboard. 

Quarantine flag:  

If batch is displayed in quarantine table 

3. Lab Operational Dashboard 

3.1 Lab Manufacturing / Schedule 

Purpose: show active and upcoming lab manufacturing tasks. 

Summary cards: 

Total Tasks: count of all tasks rows. 

Available Tasks: count where status is Available. 

In Process: count where status is In Process. 

Completed: count where status is Completed. 

Active Technicians: count of assigned technicians for the current day, excluding unassigned rows. 

Filters and search: 

Search by process, status, technician, client, or batch. 

Quick filters from summary cards. 

Visual summaries: 

Task Count by Process. 

Task Status Breakdown. 

Technician Workload. 

Time Blocks. 

Timeline schedule cards: 

Process 

Status 

Batch ID 

Technician, when assigned 

Current LIMS section 

Manufacturing Schedule table columns: 

Process 

Status 

Process Start Time 

Process End Time 

Technician 

Client ID 

Cell Batch ID 

Sample Type 

Calculations: 

Tasks: count of task records in selected scope. 

On this page how do we consider things “Available”? 

Any batches that are available in the Tasks Pages of the LIMS.  

3.2 Incubator Dashboard 

Purpose: show batches currently represented in incubator operations, plus a capacity visual by incubator and rack. 

Batch display and removed based on if: 

Entry rule: plate is in the confluence check process. 

Entry rule: batch had an Isolation, Replate, or Passage performed to it. 

Exit rule: discard of plate. 

Exit rule: freezing of plate or batch. 

Incubator table columns: 

Incubator 

Rack Space 

Client ID 

Batch ID 

Passage # 

Seeding Date 

Tissue Type 

Replate/Initial 

Last Confluency 

Days Incubator 

Last Feeding Date 

Last Feeding Type (Complete/ Partial) 

Flask Size 

Calculations: 

Replate/Initial: derive from batch process stage or passage workflow. 

Last Confluency: most recent confluence check result. 

Last Feeding Date and Type: most recent feeding event associated with the batch/plate. 

4. Reports 

4.1 Sample Intake Issues Report 

Purpose: show samples with intake condition, packaging, delay, temperature, or low-volume flags. 

Displayed if there are any warnings in the INTAKE form 

Filters: 

Search by client or batch ID. 

Time Range: Last 30 days, Last 7 days, This month, Last quarter, Custom range. 

Tissue Type: All tissue types, ADI, BM, NB - Cord Blood, NB - Cord Tissue. 

Issue Type: All issue types, Delayed sample, Temperature issue, Incorrect ice packs, Missing parafilm, Low volume. 

Clinic: All clinics, Clinic A, Clinic B, Clinic C. (NOT IMPLEMENTED IN LIMS YET) 

Main table columns: 

Client ID 

Cell Batch ID 

Clinic 

Issue Type 

Tissue Type 

Sample Delayed by How Many Days 

Temperature of Sample 

Correct Ice Packs Used 

Parafilm Used 

Low Volume 

Calculations: 

Issue Type: may be a multi-value derived field from intake checks. 

Sample Delayed by How Many Days: actual received date minus expected received date. 

Temperature issue: derive from accepted temperature range. 

Correct Ice Packs Used, Parafilm Used, Low Volume: derive from intake checklist. 

4.2 Client Lineage / Batch History Report 

Purpose: allow user to search by Client ID and see client summary, batches, processing metrics, intake information, current banking information, and quality events. 

Client lookup: 

Search one Client ID. 

Selected client drives all tables on the page. 

Client Summary table columns: 

Client ID 

Number of Tissue Samples 

Tissue Types 

Total Number of Batches 

Number of Batches Available 

Client Batches table: 

Includes table-specific filters in the table header. 

Client Batches filters: 

Time Frame: All time, Last 7 days, Last 30 days. 

Flask Size: dynamically derived from selected client's batch rows. 

Tissue Type: dynamically derived from selected client's batch rows. 

Client Batches table columns: 

Client Batch 

Tissue Type 

Flask Size 

Processing Date 

Freezing Date 

Vials Yielded 

Slow Growth 

Quarantine 

Discard 

Processing Information table columns: 

Client ID 

Flask Size 

Average Yield 

Average Time to Grow (Hr) 

Standard Dev 

Total Batches 

Intake Information table columns: 

Client ID 

Initial Intake Issues 

Number of Tissue Samples 

Tissue Type 

Current Banking Information table columns: 

Client ID 

Master Bank Doses 

Working Bank Doses 

Number of Doses per Passage 

Number of Batches Available 

Quality Events table columns: 

Client ID 

Batch ID 

Batch-Level Quality Events 

Shipping-Level Quality Events 

Export Report 

Quality Events actions: 

Export Report button per event to export a PDF for that quality event. 

Calculations: 

Number of Tissue Samples: count of tissue sample records for selected client. 

Total Number of Batches: count of all batches associated with selected client. 

Number of Batches Available: count of batches with available inventory/status. 

Average Yield: average vials yielded by flask size. 

Average Time to Grow (Hr): average grow time by flask size. 

Standard Dev: standard deviation of vials yielded by flask size. 

Total Batches: count of batches by flask size. 

Slow Growth, Quarantine, Discard: derive from batch-level exception/status workflows. 

Export Report: generate a PDF using selected Client ID, Batch ID, and quality event details. 

4.3 Lab Cleanroom Report 

Purpose: show cleanroom performance across technicians, tissue types, flask sizes, yield, growth time, and process event counts. 

Summary cards: 

Avg Vials Yielded. 

Avg Confluency. 

Avg Time to Grow. 

Std Dev Yield. 

Freezings. 

Passagings. 

Discards. 

Filters: 

Search. 

Time Range: All time, Last 7 days, Last 30 days. 

Tissue Type 

Flask Size: All flask sizes, 1-stack, 2-stack, 5-stack. 

Technician: All technicians, Technician A, Technician B, Technician C. 

Visual summaries: 

Yield by Flask Size. 

Yield by Technician. 

Discards by Tissue. 

Main table columns: 

Technician 

Average Vials Yielded 

Average Time to Grow 

Standard Deviation of Vials Yielded 

Number of Freezings 

Number of Passagings 

Number of Discards 

Average Isolation Process Time 

Average Replate Process Time 

Average Freezing Process Time 

Average Passage Process Time 

 

Calculations: 

Avg Vials Yielded: average vials yielded across filtered rows. 

Avg Confluency: average confluency percentage across filtered rows. 

Avg Time to Grow: average grow time in hours across filtered rows. 

Std Dev Yield: standard deviation of vials yielded. 

Freezings, Passagings, Discards: sum of event counts across filtered rows. 

Visual summaries: aggregate by flask size, tissue type, technician, process event type, or discard tissue. 