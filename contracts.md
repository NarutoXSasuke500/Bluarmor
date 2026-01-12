# Bluarmor Website - API Contracts

## Overview
Backend APIs for the Bluarmor website. Primary functions:
- Product catalog management
- Contact/inquiry form submissions
- Support ticket creation
- Newsletter subscriptions

## Data Models

### Product
```json
{
  "id": "string",
  "name": "string",
  "tagline": "string",
  "price": "string",
  "features": ["string"],
  "created_at": "datetime"
}
```

### ContactInquiry
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string (optional)",
  "product_interest": "string (optional)",
  "message": "string",
  "created_at": "datetime"
}
```

### SupportTicket
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "device_id": "string (optional)",
  "issue_type": "string",
  "description": "string",
  "status": "open | in_progress | resolved",
  "created_at": "datetime"
}
```

### NewsletterSubscription
```json
{
  "id": "string",
  "email": "string",
  "subscribed_at": "datetime"
}
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get single product

### Contact
- `POST /api/contact` - Submit contact inquiry

### Support
- `POST /api/support/ticket` - Create support ticket
- `GET /api/support/faq` - Get FAQ items

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

## Frontend Integration

### Replace Mock Data
1. `src/data/mock.js` - Keep static content (hero, manifesto, etc.)
2. Products - Fetch from `/api/products`
3. Contact form - POST to `/api/contact`
4. Support ticket - POST to `/api/support/ticket`
5. Newsletter - POST to `/api/newsletter/subscribe`

### API Service
Create `src/services/api.js` for centralized API calls.
