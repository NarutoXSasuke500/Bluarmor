from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Bluarmor API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# =============================================================================
# MODELS
# =============================================================================

class Product(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    tagline: str
    price: str
    features: List[str]
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ProductCreate(BaseModel):
    name: str
    tagline: str
    price: str
    features: List[str]

class ContactInquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: Optional[str] = None
    product_interest: Optional[str] = None
    message: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class ContactInquiryCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    product_interest: Optional[str] = None
    message: str

class SupportTicket(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    device_id: Optional[str] = None
    issue_type: str
    description: str
    status: str = "open"
    created_at: datetime = Field(default_factory=datetime.utcnow)

class SupportTicketCreate(BaseModel):
    name: str
    email: EmailStr
    device_id: Optional[str] = None
    issue_type: str
    description: str

class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)

class NewsletterSubscribe(BaseModel):
    email: EmailStr

class FAQItem(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    question: str
    answer: str
    order: int = 0

# =============================================================================
# ROUTES
# =============================================================================

@api_router.get("/")
async def root():
    return {"message": "Bluarmor API v1.0"}

# -----------------------------------------------------------------------------
# Products
# -----------------------------------------------------------------------------

@api_router.get("/products", response_model=List[Product])
async def get_products():
    """Get all products"""
    products = await db.products.find().to_list(100)
    return [Product(**product) for product in products]

@api_router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a single product by ID"""
    product = await db.products.find_one({"id": product_id})
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return Product(**product)

@api_router.post("/products", response_model=Product)
async def create_product(product_data: ProductCreate):
    """Create a new product (admin use)"""
    product = Product(**product_data.dict())
    await db.products.insert_one(product.dict())
    return product

# -----------------------------------------------------------------------------
# Contact Inquiries
# -----------------------------------------------------------------------------

@api_router.post("/contact", response_model=ContactInquiry)
async def create_contact_inquiry(inquiry_data: ContactInquiryCreate):
    """Submit a contact inquiry"""
    inquiry = ContactInquiry(**inquiry_data.dict())
    await db.contact_inquiries.insert_one(inquiry.dict())
    logger.info(f"New contact inquiry from {inquiry.email}")
    return inquiry

@api_router.get("/contact", response_model=List[ContactInquiry])
async def get_contact_inquiries():
    """Get all contact inquiries (admin use)"""
    inquiries = await db.contact_inquiries.find().sort("created_at", -1).to_list(100)
    return [ContactInquiry(**inquiry) for inquiry in inquiries]

# -----------------------------------------------------------------------------
# Support Tickets
# -----------------------------------------------------------------------------

@api_router.post("/support/ticket", response_model=SupportTicket)
async def create_support_ticket(ticket_data: SupportTicketCreate):
    """Create a support ticket"""
    ticket = SupportTicket(**ticket_data.dict())
    await db.support_tickets.insert_one(ticket.dict())
    logger.info(f"New support ticket from {ticket.email}: {ticket.issue_type}")
    return ticket

@api_router.get("/support/tickets", response_model=List[SupportTicket])
async def get_support_tickets():
    """Get all support tickets (admin use)"""
    tickets = await db.support_tickets.find().sort("created_at", -1).to_list(100)
    return [SupportTicket(**ticket) for ticket in tickets]

@api_router.get("/support/faq", response_model=List[FAQItem])
async def get_faq_items():
    """Get all FAQ items"""
    faqs = await db.faq_items.find().sort("order", 1).to_list(100)
    return [FAQItem(**faq) for faq in faqs]

# -----------------------------------------------------------------------------
# Newsletter
# -----------------------------------------------------------------------------

@api_router.post("/newsletter/subscribe", response_model=NewsletterSubscription)
async def subscribe_newsletter(subscription_data: NewsletterSubscribe):
    """Subscribe to newsletter"""
    # Check if already subscribed
    existing = await db.newsletter_subscriptions.find_one({"email": subscription_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already subscribed")
    
    subscription = NewsletterSubscription(**subscription_data.dict())
    await db.newsletter_subscriptions.insert_one(subscription.dict())
    logger.info(f"New newsletter subscription: {subscription.email}")
    return subscription

@api_router.get("/newsletter/subscriptions", response_model=List[NewsletterSubscription])
async def get_newsletter_subscriptions():
    """Get all newsletter subscriptions (admin use)"""
    subscriptions = await db.newsletter_subscriptions.find().sort("subscribed_at", -1).to_list(1000)
    return [NewsletterSubscription(**sub) for sub in subscriptions]

# =============================================================================
# SEED DATA
# =============================================================================

@api_router.post("/seed")
async def seed_database():
    """Seed the database with initial data"""
    
    # Check if already seeded
    existing_products = await db.products.count_documents({})
    if existing_products > 0:
        return {"message": "Database already seeded"}
    
    # Seed products
    products = [
        {
            "id": "blu3-e",
            "name": "BLU3 E",
            "tagline": "Entry-level excellence",
            "price": "₹12,999",
            "features": ["Mesh Network", "Voice Commands", "12hr Battery"],
            "created_at": datetime.utcnow()
        },
        {
            "id": "blu5-pro",
            "name": "BLU5 Pro",
            "tagline": "Professional grade",
            "price": "₹18,999",
            "features": ["6-Device Connect", "HD Audio", "OTA Updates"],
            "created_at": datetime.utcnow()
        },
        {
            "id": "blu7-ultra",
            "name": "BLU7 Ultra",
            "tagline": "Ultimate performance",
            "price": "₹24,999",
            "features": ["Full eRideGrid", "Premium Audio", "All Features"],
            "created_at": datetime.utcnow()
        }
    ]
    await db.products.insert_many(products)
    
    # Seed FAQ items
    faq_items = [
        {
            "id": str(uuid.uuid4()),
            "question": "How do I update my device firmware?",
            "answer": "Open the Bluarmor app, connect your device, and navigate to Settings > Firmware. Updates are automatic when available.",
            "order": 1
        },
        {
            "id": str(uuid.uuid4()),
            "question": "What is the warranty period?",
            "answer": "All Bluarmor devices come with a 2-year comprehensive warranty covering manufacturing defects and component failures.",
            "order": 2
        },
        {
            "id": str(uuid.uuid4()),
            "question": "How many devices can connect in a mesh?",
            "answer": "The eRideGrid mesh network supports unlimited riders. Each node strengthens the network.",
            "order": 3
        },
        {
            "id": str(uuid.uuid4()),
            "question": "Is the system waterproof?",
            "answer": "All devices are rated IP67 — fully protected against dust and water immersion up to 1 meter for 30 minutes.",
            "order": 4
        }
    ]
    await db.faq_items.insert_many(faq_items)
    
    logger.info("Database seeded successfully")
    return {"message": "Database seeded successfully", "products": len(products), "faq_items": len(faq_items)}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
