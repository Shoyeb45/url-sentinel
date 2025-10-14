import csv
import random
from datetime import datetime, timedelta
import ipaddress

# ----------------------------
# Attack payloads (for demo)
# ----------------------------
ATTACKS = {
    "SQLi": [
        "/search?q=1' OR '1'='1",
        "/user?id=1 UNION SELECT password FROM users--",
        "/page?id=1; DROP TABLE logs--",
        "/api?filter=1' AND (SELECT 1)=1--",
    ],
    "XSS": [
        "/search?q=<script>alert(1)</script>",
        "/profile?name=<img src=x onerror=alert(1)>",
        "/redirect?url=javascript:alert(document.cookie)",
        "/post?id=1&comment=<svg onload=alert(1)>",
    ],
    "Directory Traversal": [
        "/static/../../../etc/passwd",
        "/download?file=../../../../windows/win.ini",
        "/assets/%2e%2e/%2e%2e/etc/hosts",
        "/view?path=..\\..\\..\\boot.ini",
    ],
    "Web-shell Upload": [
        "/uploads/shell.php?cmd=id",
        "/images/backdoor.php",
        "/tmp/evil.php?exec=whoami",
        "/files/webshell.php",
    ]
}

# ----------------------------
# Benign URIs (normal traffic)
# ----------------------------
BENIGN_URIS = [
    "/",
    "/about",
    "/contact",
    "/search?q=fastapi",
    "/user/profile",
    "/api/status",
    "/static/style.css",
    "/images/logo.png",
    "/blog/123",
    "/login",
    "/logout",
    "/api/data",
    "/dashboard",
    "/settings",
    "/help"
]

HOSTS = ["example.com", "api.example.com", "shop.example.com"]
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    "curl/7.68.0",
    "python-requests/2.28.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)"
]
METHODS = ["GET", "POST", "PUT"]
STATUSES = [200, 201, 301, 400, 401, 403, 404, 500]

# ----------------------------
# Generate random IP
# ----------------------------
def random_ip():
    return str(ipaddress.IPv4Address(random.randint(0x1000000, 0xE0000000)))

# ----------------------------
# Generate timestamp (last 7 days)
# ----------------------------
def random_timestamp():
    now = datetime.utcnow()
    past = now - timedelta(days=7)
    random_time = past + timedelta(seconds=random.randint(0, 7*24*3600))
    return random_time.strftime("%Y-%m-%dT%H:%M:%SZ")

# ----------------------------
# Main generator
# ----------------------------
def generate_logs(filename="http_logs.csv", total_rows=1000, attack_ratio=0.03):
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerow(["timestamp", "src_ip", "host", "uri", "method", "status", "user_agent"])
        
        num_attacks = int(total_rows * attack_ratio)
        attack_types = list(ATTACKS.keys())
        
        for i in range(total_rows):
            if i < num_attacks:
                # Inject attack
                attack_type = random.choice(attack_types)
                uri = random.choice(ATTACKS[attack_type])
                status = random.choice([200, 400, 403, 500])  # attacks might return 200 or error
            else:
                # Benign traffic
                uri = random.choice(BENIGN_URIS)
                status = random.choice([200, 201, 301, 404])
            
            row = [
                random_timestamp(),
                random_ip(),
                random.choice(HOSTS),
                uri,
                random.choice(METHODS),
                status,
                random.choice(USER_AGENTS)
            ]
            writer.writerow(row)
    
    print(f"✅ Generated {filename} with {total_rows} rows ({num_attacks} attacks)")

if __name__ == "__main__":
    generate_logs("http_logs.csv", total_rows=1000, attack_ratio=0.03)