# PostgreSQL Database

This folder contains the PostgreSQL schema for the IKYA gig worker mobile app.

## Apply the schema

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

## What it includes

- `users` for app profiles/onboarding state.
- `platforms` for gig marketplaces such as Uber, DoorDash, Fiverr, and Upwork.
- `earnings_records` mapped to the mobile app income fields: platform, amount, date, status, payment frequency, and recorded-at time.
- `prediction_factors` for annual income forecast preferences.
- Reporting views for monthly summaries, annual summaries, and overdue pending payments.
- `predict_annual_income(user_id)` for a database-side annual income estimate.

The schema intentionally avoids the empty sample `INSERT` statements from the draft SQL because they would fail when executed. Seed platform rows are included instead.
