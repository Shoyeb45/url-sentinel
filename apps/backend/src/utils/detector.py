import re
from typing import Optional, Tuple
from schema.httpLogsModels import LogEntry

RULES = {
    "SQLi": [
        r"(union\s+select)",
        r"(select\s+\*.*from)",
        r"(--|#|\/\*)",
        r"(drop\s+table|create\s+table)",
        r"(\bor\b\s+\d+\s*=\s*\d+)",
    ],
    "XSS": [
        r"(<script.*?>)",
        r"(javascript:)",
        r"(<img.*?onerror=)",
        r"(<svg.*?onload=)",
    ],
    "Directory Traversal": [
        r"(\.\./)",
        r"(%2e%2e/)",
        r"(etc/passwd)",
    ],
    "Web-shell Upload": [
        r"(\.php\?cmd=)",
        r"(/uploads/.*\.php)",
        r"(shell\.php)",
        r"(eval\()",
    ],
}

def check_attack(uri: str, user_agent: str) -> Tuple[Optional[str], float]:
    full_input = (uri + " " + user_agent).lower()
    
    for attack_type, patterns in RULES.items():
        for pattern in patterns:
            if re.search(pattern, full_input, re.IGNORECASE):
                return attack_type, 1.0
    return None, 0.0

def detect_attacks(logs: list[LogEntry]) -> list[dict]:
    results = []
    for log in logs:
        attack_type, confidence = check_attack(log.uri, log.user_agent)
        result = log.dict()
        result["attack_type"] = attack_type
        result["confidence"] = confidence
        results.append(result)
    return results