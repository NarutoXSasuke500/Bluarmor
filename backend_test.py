#!/usr/bin/env python3
"""
Backend API Testing for Bluarmor Website
Tests all backend endpoints to verify functionality
"""

import requests
import json
import sys
from datetime import datetime

# Get backend URL from frontend .env file
BACKEND_URL = "https://bluearmor-design.preview.emergentagent.com/api"

def test_get_products():
    """Test GET /api/products endpoint"""
    print("\n=== Testing GET /api/products ===")
    try:
        response = requests.get(f"{BACKEND_URL}/products", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            products = response.json()
            print(f"Number of products returned: {len(products)}")
            
            # Check if we have the expected 3 products
            if len(products) == 3:
                product_names = [p['name'] for p in products]
                expected_names = ['BLU3 E', 'BLU5 Pro', 'BLU7 Ultra']
                
                print(f"Product names: {product_names}")
                
                # Check if all expected products are present
                missing_products = [name for name in expected_names if name not in product_names]
                if not missing_products:
                    print("✅ All expected products found")
                    return True, "All 3 expected products (BLU3 E, BLU5 Pro, BLU7 Ultra) returned successfully"
                else:
                    print(f"❌ Missing products: {missing_products}")
                    return False, f"Missing expected products: {missing_products}"
            else:
                print(f"❌ Expected 3 products, got {len(products)}")
                return False, f"Expected 3 products, got {len(products)}"
        else:
            print(f"❌ HTTP Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False, f"HTTP {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False, f"Request failed: {e}"

def test_get_faq():
    """Test GET /api/support/faq endpoint"""
    print("\n=== Testing GET /api/support/faq ===")
    try:
        response = requests.get(f"{BACKEND_URL}/support/faq", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            faqs = response.json()
            print(f"Number of FAQ items returned: {len(faqs)}")
            
            # Check if we have the expected 4 FAQ items
            if len(faqs) == 4:
                print("✅ All 4 FAQ items found")
                # Print first FAQ for verification
                if faqs:
                    print(f"Sample FAQ: {faqs[0]['question']}")
                return True, "All 4 FAQ items returned successfully"
            else:
                print(f"❌ Expected 4 FAQ items, got {len(faqs)}")
                return False, f"Expected 4 FAQ items, got {len(faqs)}"
        else:
            print(f"❌ HTTP Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False, f"HTTP {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False, f"Request failed: {e}"

def test_post_contact():
    """Test POST /api/contact endpoint"""
    print("\n=== Testing POST /api/contact ===")
    
    contact_data = {
        "name": "John Rider",
        "email": "john.rider@example.com",
        "message": "I'm interested in the BLU7 Ultra for my motorcycle touring needs."
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/contact",
            json=contact_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Contact inquiry created with ID: {result.get('id')}")
            print(f"Name: {result.get('name')}")
            print(f"Email: {result.get('email')}")
            return True, "Contact inquiry submitted successfully"
        else:
            print(f"❌ HTTP Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False, f"HTTP {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False, f"Request failed: {e}"

def test_post_support_ticket():
    """Test POST /api/support/ticket endpoint"""
    print("\n=== Testing POST /api/support/ticket ===")
    
    ticket_data = {
        "name": "Sarah Biker",
        "email": "sarah.biker@example.com",
        "issue_type": "technical",
        "description": "My BLU5 Pro is not connecting to the mesh network properly. The LED stays red."
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/support/ticket",
            json=ticket_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Support ticket created with ID: {result.get('id')}")
            print(f"Issue Type: {result.get('issue_type')}")
            print(f"Status: {result.get('status')}")
            return True, "Support ticket created successfully"
        else:
            print(f"❌ HTTP Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False, f"HTTP {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False, f"Request failed: {e}"

def test_post_newsletter_subscribe():
    """Test POST /api/newsletter/subscribe endpoint"""
    print("\n=== Testing POST /api/newsletter/subscribe ===")
    
    # Test 1: New subscription
    subscription_data = {
        "email": f"rider.{datetime.now().strftime('%Y%m%d%H%M%S')}@bluarmor.com"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/newsletter/subscribe",
            json=subscription_data,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            print(f"✅ Newsletter subscription created with ID: {result.get('id')}")
            print(f"Email: {result.get('email')}")
            
            # Test 2: Duplicate subscription (should return 400)
            print("\n--- Testing duplicate subscription ---")
            duplicate_response = requests.post(
                f"{BACKEND_URL}/newsletter/subscribe",
                json=subscription_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            print(f"Duplicate Status Code: {duplicate_response.status_code}")
            
            if duplicate_response.status_code == 400:
                print("✅ Duplicate subscription correctly rejected")
                return True, "Newsletter subscription works correctly, including duplicate prevention"
            else:
                print(f"❌ Expected 400 for duplicate, got {duplicate_response.status_code}")
                return False, f"Duplicate subscription should return 400, got {duplicate_response.status_code}"
                
        else:
            print(f"❌ HTTP Error: {response.status_code}")
            print(f"Response: {response.text}")
            return False, f"HTTP {response.status_code}: {response.text}"
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return False, f"Request failed: {e}"

def run_all_tests():
    """Run all backend API tests"""
    print("🚀 Starting Bluarmor Backend API Tests")
    print(f"Backend URL: {BACKEND_URL}")
    
    tests = [
        ("GET /api/products", test_get_products),
        ("GET /api/support/faq", test_get_faq),
        ("POST /api/contact", test_post_contact),
        ("POST /api/support/ticket", test_post_support_ticket),
        ("POST /api/newsletter/subscribe", test_post_newsletter_subscribe)
    ]
    
    results = {}
    
    for test_name, test_func in tests:
        try:
            success, message = test_func()
            results[test_name] = {
                "success": success,
                "message": message
            }
        except Exception as e:
            results[test_name] = {
                "success": False,
                "message": f"Test execution failed: {e}"
            }
    
    # Print summary
    print("\n" + "="*60)
    print("📊 TEST RESULTS SUMMARY")
    print("="*60)
    
    passed = 0
    failed = 0
    
    for test_name, result in results.items():
        status = "✅ PASS" if result["success"] else "❌ FAIL"
        print(f"{status} {test_name}")
        if not result["success"]:
            print(f"    Error: {result['message']}")
        
        if result["success"]:
            passed += 1
        else:
            failed += 1
    
    print(f"\nTotal: {passed + failed} tests")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    
    return results

if __name__ == "__main__":
    results = run_all_tests()
    
    # Exit with error code if any tests failed
    failed_tests = [name for name, result in results.items() if not result["success"]]
    if failed_tests:
        sys.exit(1)
    else:
        sys.exit(0)