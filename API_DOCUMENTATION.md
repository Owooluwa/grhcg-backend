# GRHCG Church Website API Documentation

Base URL: `http://localhost:5000/api`
Production URL: (Will be your Render deployment URL)

---

## 📮 CONTACTS API

### Create Contact / Submit Prayer Request
- **POST** `/contacts`
- **Access:** Public
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "08012345678",
  "subject": "Prayer Request",
  "message": "Please pray for my family",
  "type": "Prayer Request"
}