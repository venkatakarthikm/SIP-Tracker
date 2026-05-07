# SIP Tracker and Portfolio Valuation System

A robust backend fintech solution for managing **Systematic Investment Plans (SIPs)**, mutual funds, and investor portfolios. [cite_start]This system ensures data integrity through a normalized relational database and provides secure REST APIs for financial operations[cite: 5, 6].

---

##  Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** JavaScript
- [cite_start]**Database:** Relational (Normalized to 3NF) [cite: 54, 62]
- [cite_start]**API Documentation:** Postman [cite: 86]

---

## 🚀 Features

- [cite_start]**Investor Management:** Secure registration, login, and profile tracking[cite: 12, 40].
- [cite_start]**Mutual Fund Management:** CRUD operations for funds and real-time NAV updates[cite: 17, 21].
- [cite_start]**SIP Engine:** Register SIPs with custom amounts and execution dates[cite: 22, 26].
- [cite_start]**Transaction Tracking:** Automated installment processing and comprehensive history logs[cite: 28, 32].
- [cite_start]**Portfolio Analytics:** Real-time calculation of holdings and total net worth[cite: 33, 37].

---

## 📊 Database Schema

[cite_start]The system implements a normalized relational schema to maintain referential integrity[cite: 53, 62].

- **Investors:** Personal details and authentication data.
- **Funds:** Mutual fund information, AMC details, and latest NAV.
- **SIPs:** Registration links between investors and funds.
- **Transactions:** Records of units allotted, price paid, and transaction dates.
- **Token Blacklist:** Security layer for managing logged-out JWT sessions.

---

## 🔌 API Endpoints

### Investor Services
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/investors/register` | [cite_start]Register new investor [cite: 40] |
| `POST` | `/api/investors/login` | Authenticate investor |
| `GET` | `/api/investors/:id` | [cite_start]Get investor profile [cite: 41] |
| `GET` | `/api/investors/holdings/:id` | [cite_start]Get detailed fund holdings [cite: 42] |
| `GET` | `/api/investors/:id/networth` | [cite_start]Get total portfolio value [cite: 43] |

### Fund Services
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/funds` | [cite_start]Add a new mutual fund [cite: 45] |
| `GET` | `/api/funds` | [cite_start]List all available funds [cite: 46] |
| `PUT` | `/api/funds/:id/nav` | [cite_start]Update fund NAV [cite: 47] |

### SIP Services
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/sips` | [cite_start]Register a new SIP [cite: 49] |
| `POST` | `/api/sips/:id/process` | [cite_start]Execute a SIP installment [cite: 51] |
| `GET` | `/api/sips/transactions/:id` | [cite_start]Fetch SIP transaction history [cite: 52] |

---

## 🛡️ Data Integrity & Transactions

[cite_start]The system uses ACID-compliant database transactions for critical operations like **SIP Processing**[cite: 63, 65]. 
This ensures that updating unit balances and creating transaction records happen as a single, atomic operation:
- [cite_start]**BEGIN TRANSACTION** [cite: 66]
- [cite_start]**COMMIT** on success [cite: 67]
- [cite_start]**ROLLBACK** on any failure to prevent data corruption [cite: 68]

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [<repository-url>](https://github.com/venkatakarthikm/SIP-Tracker)
