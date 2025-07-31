# 🧪 Thunder Client - API Testing Examples

## 🔧 הגדרות בסיסיות
- **Base URL:** `http://localhost:3000`
- **Content-Type:** `application/json`

---

## 1️⃣ **Authentication Tests**

### 🔐 התחברות כמפקד
```http
POST /auth/login
Content-Type: application/json

{
  "userName": "commander_username",
  "password": "your_password"
}
```
**Expected:** `200 OK` + Cookie: `access_token`

### 🔐 התחברות כחייל
```http
POST /auth/login
Content-Type: application/json

{
  "userName": "soldier_username", 
  "password": "your_password"
}
```
**Expected:** `200 OK` + Cookie: `access_token`

### 🔍 בדיקת טוקן
```http
POST /auth/validate
Content-Type: application/json

{
  "token": "YOUR_JWT_TOKEN_HERE"
}
```
**Expected:** `200 OK` + פרטי משתמש

---

## 2️⃣ **Users Management (מפקדים בלבד)**

### 👥 צפייה בכל המשתמשים
```http
GET /users
```
**Expected (מפקד):** `200 OK` + רשימת משתמשים  
**Expected (חייל):** `403 Forbidden`

### ➕ יצירת משתמש חדש
```http
POST /users
Content-Type: application/json

{
  "userName": "new_soldier",
  "password": "123456",
  "role": "soldier"
}
```
**Expected (מפקד):** `201 Created` + פרטי משתמש  
**Expected (חייל):** `403 Forbidden`

### 👤 צפייה במשתמש ספציפי
```http
GET /users/1
```
**Expected:** `200 OK` + פרטי משתמש

### 🗑️ מחיקת משתמש
```http
DELETE /users/2
```
**Expected (מפקד):** `200 OK` + הודעת מחיקה  
**Expected (חייל):** `403 Forbidden`

---

## 3️⃣ **Shifts Management (מפקדים בלבד)**

### ⏰ יצירת משמרת חדשה
```http
POST /shifts
Content-Type: application/json

{
  "startTime": 800,
  "endTime": 1600,
  "location": "שער ראשי"
}
```
**Expected (מפקד):** `201 Created` + פרטי משמרת  
**Expected (חייל):** `403 Forbidden`

### 📋 צפייה בכל המשמרות
```http
GET /shifts
```
**Expected (מפקד):** `200 OK` + רשימת משמרות  
**Expected (חייל):** `403 Forbidden`

### 🔍 צפייה במשמרת ספציפית
```http
GET /shifts/1
```
**Expected (מפקד):** `200 OK` + פרטי משמרת  
**Expected (חייל):** `403 Forbidden`

---

## 4️⃣ **Assignments Management (מפקדים בלבד)**

### 📌 הקצאת חייל למשמרת
```http
POST /assignments/new
Content-Type: application/json

{
  "shift_id": 1,
  "solder_id": 3
}
```
**Expected (מפקד):** `201 Created` + פרטי הקצאה  
**Expected (חייל):** `403 Forbidden`

---

## 5️⃣ **Error Testing Scenarios**

### ❌ גישה ללא אימות
```http
GET /users
# (ללא cookie או header)
```
**Expected:** `401 Unauthorized`

### ❌ חייל מנסה ליצור משמרת
```http
POST /shifts
Content-Type: application/json
# (עם cookie של חייל)

{
  "startTime": 900,
  "endTime": 1700,
  "location": "מגדל שמירה"
}
```
**Expected:** `403 Forbidden`

### ❌ נתונים לא תקינים
```http
POST /assignments/new
Content-Type: application/json

{
  "shift_id": "not_a_number",
  "solder_id": "also_not_a_number"
}
```
**Expected:** `400 Bad Request` + שגיאות validation

### ❌ הקצאה עם IDs לא קיימים
```http
POST /assignments/new
Content-Type: application/json

{
  "shift_id": 999,
  "solder_id": 999
}
```
**Expected:** שגיאת DB או `404 Not Found`

---

## 6️⃣ **Test Flow Examples**

### 🎯 **Flow 1: מפקד יוצר משמרת ומקצה חייל**

1. **התחברות מפקד:**
```http
POST /auth/login
{
  "userName": "commander1",
  "password": "123456"
}
```

2. **יצירת משמרת:**
```http
POST /shifts
{
  "startTime": 600,
  "endTime": 1400,
  "location": "כניסה צפונית"
}
```

3. **צפייה במשתמשים (למצוא חייל):**
```http
GET /users
```

4. **הקצאת חייל למשמרת:**
```http
POST /assignments/new
{
  "shift_id": 1,
  "solder_id": 2
}
```

### 🎯 **Flow 2: חייל מנסה לגשת למידע מוגבל**

1. **התחברות חייל:**
```http
POST /auth/login
{
  "userName": "soldier1",
  "password": "123456"
}
```

2. **ניסיון צפייה בכל המשתמשים:**
```http
GET /users
# Expected: 403 Forbidden
```

3. **ניסיון יצירת משמרת:**
```http
POST /shifts
{
  "startTime": 800,
  "endTime": 1600,
  "location": "שער דרומי"
}
# Expected: 403 Forbidden
```

---

## 7️⃣ **Test Data Examples**

### 👨‍💼 **Commander Test User:**
```json
{
  "userName": "commander_david",
  "password": "commander123",
  "role": "commander"
}
```

### 🪖 **Soldier Test Users:**
```json
{
  "userName": "soldier_yossi",
  "password": "soldier123", 
  "role": "soldier"
}
```

```json
{
  "userName": "soldier_avi",
  "password": "soldier456",
  "role": "soldier"
}
```

### ⏰ **Sample Shifts:**
```json
{
  "startTime": 600,
  "endTime": 1400,
  "location": "שער ראשי"
}
```

```json
{
  "startTime": 1400,
  "endTime": 2200,
  "location": "מגדל שמירה"
}
```

```json
{
  "startTime": 2200,
  "endTime": 600,
  "location": "סיור היקפי"
}
```

---

## 🔍 **Response Status Codes**

| Code | Status | משמעות |
|------|--------|---------|
| `200` | OK | פעולה הצליחה |
| `201` | Created | נוצר בהצלחה |
| `400` | Bad Request | נתונים לא תקינים |
| `401` | Unauthorized | לא מחובר |
| `403` | Forbidden | אין הרשאה |
| `404` | Not Found | לא נמצא |
| `500` | Internal Server Error | שגיאת שרת |

---

## 📝 **Thunder Client Tips**

1. **Environment Variables:** צור משתנה `{{baseUrl}}` = `http://localhost:3000`
2. **Auto Cookies:** Thunder Client שומר cookies אוטומטיט אחרי login
3. **Collections:** ארגן את הבדיקות בקבוצות (Auth, Users, Shifts, etc.)
4. **Tests Tab:** השתמש ב-Tests tab לבדיקות אוטומטיות של response
5. **Save Responses:** שמור responses לבדיקה מאוחרת יותר

**מוכן לבדיקות?** 🚀