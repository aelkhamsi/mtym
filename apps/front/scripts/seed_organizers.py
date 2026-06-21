#!/usr/bin/env python3
"""
Seed the Payload `organizers` collection with the pre-existing organizers
that used to live in app/(frontend)/(static)/organizing-team/data.ts.

Each organizer is created through Payload's REST API as an upload, so the
image file is written by Payload into the collection's staticDir
(apps/front/public/images/payload/organizer-photos) and the matching DB row
is created with all the right upload metadata.

Usage:
    1. Start the front app so the API + DB schema exist:  pnpm --filter front dev
    2. Make sure a Payload admin user exists (create one in /admin if not).
    3. Run:
        pip install requests
        PAYLOAD_EMAIL=you@example.com PAYLOAD_PASSWORD=secret \
          python apps/front/scripts/seed_organizers.py

Environment variables (all optional except credentials):
    PAYLOAD_URL       Base URL of the app (default: http://localhost:3000)
    PAYLOAD_EMAIL     Admin email used to log in
    PAYLOAD_PASSWORD  Admin password

The script is idempotent: an organizer whose image filename already exists in
the collection is skipped, so it is safe to run multiple times.
"""

import json
import os
import sys
from pathlib import Path

try:
    import requests
except ImportError:
    sys.exit("Missing dependency. Run: pip install requests")

# --- Configuration ----------------------------------------------------------

BASE_URL = os.environ.get("PAYLOAD_URL", "http://localhost:3000").rstrip("/")
EMAIL = os.environ.get("PAYLOAD_EMAIL")
PASSWORD = os.environ.get("PAYLOAD_PASSWORD")

# Folder where the source images already live (also the collection staticDir).
IMAGES_DIR = (
    Path(__file__).resolve().parent.parent
    / "public" / "images" / "payload" / "organizer-photos"
)

# Ported 1:1 from data.ts. category matches the select options in
# collections/Organizers.ts: organizing-committee | web-development | design-and-branding
ORGANIZERS = [
    # --- Organizing committee ---
    ("Bilal Bahchani", "bilal_bahchani.webp", "organizing-committee", "https://www.linkedin.com/in/bilal-bahchani-933325326/"),
    ("Omar Bennouna", "omar_bennouna.webp", "organizing-committee", "https://www.linkedin.com/in/omar-bennouna-a6b64b197/"),
    ("Ilyass Bouazza", "ilyass_bouazza.webp", "organizing-committee", "https://www.linkedin.com/in/ilyass-bouazza-98030b290/"),
    ("Hiba El Kasimi", "hiba_el_kasimi.webp", "organizing-committee", "https://www.linkedin.com/in/hiba-el-kasimi/"),
    ("Chaimaa Loutfi", "chaimaa_loutfi.webp", "organizing-committee", "https://www.linkedin.com/in/chaimaa-loutfi-93bba821a/"),
    ("Malak Khaldouni", "malak_khaldouni.webp", "organizing-committee", "https://www.linkedin.com/in/malak-khaldouni-383472253/"),
    ("Mohammed-Taha En-nahili", "mohammed_taha_en_nahili.webp", "organizing-committee", "https://www.linkedin.com/in/mohammed-taha-en-nahili-655322303/"),
    ("Mouad Zemzoumi", "mouad_zemzoumi.webp", "organizing-committee", "https://www.linkedin.com/in/mouad-zemzoumi-a21a9128a/"),
    ("Ali Noufli", "ali_noufli.webp", "organizing-committee", ""),
    ("Amine Hbar", "amine_hbar.webp", "organizing-committee", "https://www.linkedin.com/in/amine-hbar-0748a2246/"),
    ("FatimaZahra Moudakir", "fatima_zahra_moudakir.webp", "organizing-committee", "https://www.linkedin.com/in/fatima-zahra-moudakir-615527246/"),
    ("Achraf El Khamsi", "achraf_el_khamsi.webp", "organizing-committee", "https://www.linkedin.com/in/achrafelkhamsi/"),
    ("Omar Fathallah", "omar_fathallah.webp", "organizing-committee", "https://www.linkedin.com/in/omar-fathallah-/"),
    ("Souhail El Bakkar", "souhail_el_bakkare.webp", "organizing-committee", "https://www.linkedin.com/in/souhail-elbakkar-9aab2a284/"),
    ("Wassel Ben Yahia", "wassel_benyahya.webp", "organizing-committee", "https://www.linkedin.com/in/wassel-ben-yahia-2b14aa244/"),
    ("Abdelkayoum Kaddouri", "abdelkayoum_kaddouri.webp", "organizing-committee", "https://www.linkedin.com/in/abdelkayoum-kaddouri-1213ab321/"),
    ("Islam Bouikiri", "islam_bouikiri.webp", "organizing-committee", "https://www.linkedin.com/in/islam-bouikiri-630814281/?originalSubdomain=ma"),
    ("Ismail Bouhaj", "ismail_bouhaj.webp", "organizing-committee", "https://www.linkedin.com/in/ismail-bouhaj-240745235/"),
    ("Nour El Houda El Bouz", "nour_el_houda_el_bouz.webp", "organizing-committee", "https://www.linkedin.com/in/el-bouz-nour-el-houda-631425308/"),
    ("Rania Daya", "rania_daya.webp", "organizing-committee", "https://www.linkedin.com/in/rania-daya-09b758296/"),
    ("Manal Saoui", "manal_saoui.webp", "organizing-committee", "https://www.linkedin.com/in/manal-saoui/"),
    ("Mohammed Younes El Gueddari", "mohammed_younes_gueddari.webp", "organizing-committee", "https://www.linkedin.com/in/mohammed-younes-gueddari-4299b6147/?originalSubdomain=fr"),
    # --- Web development (separate image to avoid a filename clash with the committee entry) ---
    ("Achraf El Khamsi", "achraf_el_khamsi_web.webp", "web-development", "https://www.linkedin.com/in/achrafelkhamsi/"),
    # --- Design & branding ---
    ("Ayoub Bennouna", "ayoub_bennouna.webp", "design-and-branding", "https://www.ayoubbennouna.com/"),
]

# --- API helpers ------------------------------------------------------------


def login(session: requests.Session) -> str:
    if not EMAIL or not PASSWORD:
        sys.exit("Set PAYLOAD_EMAIL and PAYLOAD_PASSWORD environment variables.")
    resp = session.post(
        f"{BASE_URL}/api/users/login",
        json={"email": EMAIL, "password": PASSWORD},
        timeout=30,
    )
    if resp.status_code != 200:
        sys.exit(f"Login failed ({resp.status_code}): {resp.text}")
    token = resp.json().get("token")
    if not token:
        sys.exit("Login succeeded but no token was returned.")
    return token


def already_exists(session: requests.Session, filename: str) -> bool:
    resp = session.get(
        f"{BASE_URL}/api/organizers",
        params={"where[filename][equals]": filename, "depth": 0, "limit": 1},
        timeout=30,
    )
    return resp.status_code == 200 and resp.json().get("totalDocs", 0) > 0


def create_organizer(session, token, name, filename, category, portfolio):
    image_path = IMAGES_DIR / filename
    if not image_path.exists():
        print(f"  ! SKIP {name}: image not found at {image_path}")
        return False

    payload = {
        "name": name,
        "category": category,
        "portfolioSrc": portfolio,
        "alt": name,
    }
    # Read the bytes, then remove the stale on-disk file. We already know no DB
    # row references this filename (already_exists() returned False), so the
    # file is an orphan; removing it lets Payload write back the clean filename
    # instead of appending a "-1" suffix on the collision.
    image_bytes = image_path.read_bytes()
    image_path.unlink()
    resp = session.post(
        f"{BASE_URL}/api/organizers",
        headers={"Authorization": f"JWT {token}"},
        files={"file": (filename, image_bytes, "image/webp")},
        data={"_payload": json.dumps(payload)},
        timeout=60,
    )
    if resp.status_code in (200, 201):
        print(f"  + created {name} ({category})")
        return True
    print(f"  ! FAILED {name}: {resp.status_code} {resp.text}")
    return False


def main():
    if not IMAGES_DIR.exists():
        sys.exit(f"Images directory not found: {IMAGES_DIR}")

    session = requests.Session()
    token = login(session)
    print(f"Logged in to {BASE_URL} as {EMAIL}")

    created = skipped = failed = 0
    for name, filename, category, portfolio in ORGANIZERS:
        if already_exists(session, filename):
            print(f"  = skip {name}: already in DB ({filename})")
            skipped += 1
            continue
        if create_organizer(session, token, name, filename, category, portfolio):
            created += 1
        else:
            failed += 1

    print(f"\nDone. created={created} skipped={skipped} failed={failed}")
    if failed:
        sys.exit(1)


if __name__ == "__main__":
    main()
