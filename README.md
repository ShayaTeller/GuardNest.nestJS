🛡️ מערכת ניהול שמירות צבאיות
פרויקט NestJS למערכת ניהול משמרות במסגרת צבאית עם מערכת הגנה ובקרת גישה.
🎯 מטרת הפרויקט
מערכת המאפשרת:

למפקדים: יצירת משמרות והקצאת חיילים
לחיילים: צפייה במשמרות שלהם בלבד
אבטחה: בקרת גישה לפי תפקיד עם JWT


💻 טכנולוגיות בשימוש
טכנולוgiהתיאורגרסהNestJSFramework לשרת Node.js11.xTypeORMORM למסד נתונים0.3.xPostgreSQLמסד נתונים יחסי (Neon Cloud)-JWTאסימוני אימות@nestjs/jwtPassportמערכת אימותpassport-jwtbcryptהצפנת סיסמאות6.xclass-validatorוולידציה של נתונים0.14.xCookie Parserניהול cookies1.4.x

📁 מבנה הפרויקט
src/
├── main.ts                    # נקודת כניסה
├── app.module.ts              # מודול ראשי
├── app.controller.ts          # בקר בסיסי
├── app.service.ts             # שירות בסיסי
│
├── auth/                      # מודול אימות
│   ├── guards/               # שומרי הגישה
│   │   ├── jwt.guard.ts      # בדיקת JWT
│   │   ├── roles.guard.ts    # בדיקת הרשאות
│   │   └── jwt.strategy.ts   # אסטרטגיית JWT
│   ├── decorators/           # דקורטורים מותאמים
│   │   └── roles.decorator.ts
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── dto/authDto.ts
│
├── users/                     # מודול משתמשים
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── user.entity.ts
│   ├── hashPassword.ts
│   └── dto/usersDto.ts
│
├── shifts/                    # מודול משמרות
│   ├── shifts.module.ts
│   ├── shifts.controller.ts
│   ├── shifts.service.ts
│   ├── shift.entity.ts
│   └── dto/shift.dto.ts
│
└── assignments/               # מודול הקצאות
    ├── assignments.module.ts
    ├── assignments.controller.ts
    ├── assignments.service.ts
    ├── assignment.entity.ts
    └── dto/assignment.dto.ts

📊 פירוט קבצים ופונקציות
🔐 Auth Module
auth.controller.ts
RouteMethodפונקציהמקבלמחזיר/auth/loginPOSTuserAuth()auteLoginDtoJWT בcookie + הצלחה/auth/validatePOSTvalidateToken(){token: string}פרטי משתמש
auth.service.ts
פונקציהפרמטריםמחזירתיאורbringHashCodeFromDB()auteLoginDtostringשליפת hash סיסמהcomparePasswords()dto, hashbooleanהשוואת סיסמאותgeneratToken()auteLoginDto{token, user}יצירת JWTvalidateToken()token: stringpayloadוולידציית טוקן
Guards & Strategy
פונקציהפרמטריםמחזירתיאורJwtGuard.canActivate()ExecutionContextbooleanבדיקת JWT מcookieRolesGuard.canActivate()ExecutionContextbooleanבדיקת הרשאות תפקידJwtStrategy.validate()payload: anyuser objectפענוח JWT לפרטי משתמש

👥 Users Module
users.controller.ts
RouteMethodפונקציהמקבלמחזירהגנה/usersGETgetAllUsers()-User[]מפקדים בלבד/usersPOSTcreateNewUser()CreateUserDtoUserמפקדים בלבד/users/:idGETgetUserById()idUser-/users/:idDELETEdeleteUserById()idהודעהמפקדים בלבד
users.service.ts
פונקציהפרמטריםמחזירתיאורfindAllUsers()-User[]כל המשתמשיםcreateUser()CreateUserDtoUserיצירת משתמש חדשfindUserById()id: numberUserמשתמש לפי IDdeleteUser()id: numberהודעהמחיקת משתמש
user.entity.ts - מבנה הטבלה
typescript- id: number (PK, Auto)
- userName: string
- role: string ('commander' | 'soldier')
- passwordHash: string
- createdAt: Date

⏰ Shifts Module
shifts.controller.ts
RouteMethodפונקציהמקבלמחזירהגנה/shiftsPOSTcreateShift()creatShiftDtoShiftמפקדים בלבד/shiftsGETgetAllShifts()-Shift[]מפקדים בלבד/shifts/:idGETgetUserById()idShiftמפקדים בלבד
shifts.service.ts
פונקציהפרמטריםמחזירתיאורaddShift()creatShiftDtoShiftיצירת משמרת חדשהgetAllShifts()-Shift[]כל המשמרותgetShiftById()id: numberShiftמשמרת לפי ID
shift.entity.ts - מבנה הטבלה
typescript- id: number (PK, Auto)
- startTime: number
- endTime: number
- location: string

📋 Assignments Module
assignments.controller.ts
RouteMethodפונקציהמקבלמחזירהגנה/assignments/newPOSTPostnewAssingment()CreateAssignDtoAssignmentמפקדים בלבד
assignments.service.ts
פונקציהפרמטריםמחזירתיאורcreateNewAssing()dto, commanderIdAssignmentהקצאת חייל למשמרת
assignment.entity.ts - מבנה הטבלה
typescript- assignmentId: number (PK, Auto)
- shift_id: number (FK → Shifts)
- solder_id: number (FK → Users)
- assignedAt: Date
- assignedBy: number (FK → Users - המפקד)

🔄 דוגמת זרימה: "מפקד מקצה חייל למשמרת"
mermaidsequenceDiagram
    participant C as Client/Browser
    participant AC as AssignmentsController
    participant G as Guards
    participant AS as AssignmentsService
    participant DB as PostgreSQL

    C->>+AC: POST /assignments/new {shift_id: 1, solder_id: 5}
    AC->>+G: JwtAuthGuard + RolesGuard
    G->>G: בדיקת JWT + role = 'commander'
    G-->>-AC: ✅ מפקד מאושר
    
    AC->>+AS: createNewAssing(dto, req.user.userId)
    AS->>+DB: INSERT INTO assignments
    Note right of DB: shift_id: 1<br/>solder_id: 5<br/>assignedBy: 2 (מהטוקן)
    DB-->>-AS: Assignment נוצר
    AS-->>-AC: Assignment object
    AC-->>-C: 201 Created + Assignment details

🗄️ מבנה מסד הנתונים
sql-- Users Table
users (
  id SERIAL PRIMARY KEY,
  userName VARCHAR,
  role VARCHAR ('commander'|'soldier'),
  passwordHash VARCHAR,
  createdAt TIMESTAMP
)

-- Shifts Table  
shifts (
  id SERIAL PRIMARY KEY,
  startTime INTEGER,
  endTime INTEGER,
  location VARCHAR
)

-- Assignments Table (Many-to-Many)
assignments (
  assignmentId SERIAL PRIMARY KEY,
  shift_id INTEGER REFERENCES shifts(id),
  solder_id INTEGER REFERENCES users(id),
  assignedBy INTEGER REFERENCES users(id),
  assignedAt TIMESTAMP DEFAULT NOW()
)

🚀 הרצת הפרויקט
bash# התקנת תלויות
npm install

# הרצה במצב פיתוח
npm run start:dev

# השרת יעלה על: http://localhost:3000

🔒 מערכת האבטחה
JWT Token Structure:
json{
  "username": "דוד כהן",
  "id": 1,
  "role": "commander",
  "iat": 1234567890,
  "exp": 1234654290
}
רמות הרשאה:

Commander: גישה מלאה - יצירת משמרות, הקצאות, ניהול משתמשים
Soldier: צפייה במידע אישי בלבד (לא מימוש עדיין)
