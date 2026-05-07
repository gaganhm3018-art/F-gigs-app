# IKYA Gig Workers App

Manual-first mobile income tracking for freelancers and gig workers.

## Features implemented
- Fast payout logging (platform, amount, date, status, frequency).
- Platform suggestion chips based on previous logs.
- Amount auto-fill suggestion based on platform historical average (editable).
- Monthly totals with pending vs received breakdown.
- Annual projection using a lightweight ML-style **weighted moving average** of weekly received income.
- CSV export generator for tax planning workflows.

## Core model choice for projection
For tax planning without bank/API integrations, this app uses a **Weighted Moving Average (WMA)** over recent weekly payouts. It is robust for sparse manual data and easy to explain to users.

Projected annual income = weighted weekly average × 52.


## PostgreSQL database
A production-ready PostgreSQL schema is available in `database/schema.sql`. It maps the mobile app income fields to relational tables, seeds common gig platforms, and includes reporting views plus an annual prediction function. Apply it with:

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

## Files
- `src/src/services/services/analytics.ts` – summary + projection model.
- `src/src/services/services/autofill.ts` – platform and amount suggestions.
- `src/src/services/services/csv.ts` – CSV export serializer.
- `src/src/services/screens/AddIncomeScreen.tsx` – low-friction entry form.
- `src/src/services/screens/DashboardScreen.tsx` – metrics overview.
- `database/schema.sql` – PostgreSQL schema, seed platforms, reporting views, and prediction helper.
