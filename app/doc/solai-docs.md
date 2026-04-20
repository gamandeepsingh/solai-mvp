# SOLAI Wallet — Documentation

## Overview

SOLAI is a non-custodial Solana browser wallet built as a Chrome Extension. It combines a clean, minimal UI with an AI-powered command interface, privacy-preserving stealth addresses, Ledger hardware wallet support, and programmable agent wallets — making on-chain actions as simple as typing a sentence, and enabling fully automated machine-to-machine payments.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Runtime | Chrome Extension (Manifest V3) |
| Frontend | React 18 + TypeScript |
| Styling | Tailwind CSS + Framer Motion |
| Blockchain | Solana (`@solana/web3.js`) |
| Key Derivation | BIP39 + BIP44 HD (`ed25519-hd-key`) |
| Cryptography | TweetNaCl, AES-256-GCM (Web Crypto API) |
| Hardware Wallet | Ledger via WebHID (`@ledgerhq/hw-transport-webhid`) |
| Swap | Jupiter Aggregator API |
| AI | OpenRouter API (model-agnostic) |
| Price Data | CoinGecko API |
| Storage | `chrome.storage.local` (encrypted) + `chrome.storage.session` (keys) |
| Build | Vite |

---

## Architecture

### MV3 Service Worker Statelessness

Chrome MV3 service workers can be killed and restarted at any time. All state that needs to survive (wallet sessions, pending sign requests, agent keypairs) lives in `chrome.storage.session` rather than in-memory, so it survives SW restarts automatically.

### Per-Install Encrypted Storage

Every value written to `chrome.storage.local` is AES-256-GCM encrypted with a random 256-bit key generated on first install. The key is unique per browser installation — the source code no longer contains a hardcoded key. Existing data is migrated transparently on first read.

### Session Keys

Decrypted keypairs are held only in `chrome.storage.session` with a 30-minute TTL. When the session expires or the user locks, keys are zeroed in memory and removed from session. The wallet auto-locks.

### HD Key Namespace

One mnemonic, three isolated address spaces:

| Index Range | Purpose |
| --- | --- |
| 0 | Main wallet |
| 1 – 999 | Stealth addresses |
| 1000+ | Agent wallets |

### Sign Approval Popup

All dApp signing requests (`signMessage`, `signTransaction`, `signAndSendTransaction`) open a dedicated confirmation popup. The extension never auto-signs for dApps. Agent wallets are the only exception — they sign automatically within guardrail limits enforced in the service worker.

---

## Features

### Core Wallet

- Create wallet (new seed) or import from 12-word recovery phrase
- **Ledger hardware wallet** — connect via USB, read public key from device, sign transactions and messages physically on the device. No seed phrase stored.
- Multi-wallet — add and switch between multiple accounts, each with its own seed
- View SOL and SPL token balances in real time
- Send / Receive SOL, USDC, USDT, and any SPL token
- QR code receive screen
- NFT grid viewer

### Send

- Single-address send with contact autocomplete and anomaly warning (>50% of balance)
- **Batch Send** — paste a list of `ADDRESS AMOUNT_SOL` entries (one per line), preview a table with validation errors, confirm once, send in sequence with per-tx result links
- **Transaction Drafts** — if the user closes mid-flow, the recipient and amount are saved to session storage; a "Resume draft?" banner appears on next open
- **Emoji Contacts** — contacts can have an emoji avatar ("Mom 👩", "Trading Bot 🤖") shown in autocomplete and the contacts list

### Privacy — Stealth Addresses

HD-derived one-time receive addresses at indices 1–999. Each is a completely independent Solana keypair on-chain — no link to the main wallet is detectable. Gaps between indices are randomized to prevent sequential scanning. Users generate labelled stealth addresses and sweep funds back ("Collect") with one tap and a password confirm.

### dApp Connectivity

- Exposes `window.solana` (Phantom-compatible) and Wallet Standard protocol
- dApps see SOLAI in their wallet selector alongside Phantom and Solflare
- First connection: shows origin approval popup
- Subsequent connections: silently returns public key (pre-approved, 90-day expiry)
- Signing: always opens a confirmation popup showing the dApp origin, request type, and message/transaction details
- Reject closes popup and sends rejection to the dApp immediately
- Connected Apps screen: view, last-used date, and revoke per-dApp access

### AI Commands

Natural language interface powered by OpenRouter. User types a command, AI parses intent and executes:

- `swap 0.5 SOL to USDC` → quotes Jupiter, shows estimated output, executes swap
- `send 1 SOL to mom` → resolves contact, sends transaction
- `buy SOL if it drops below $120` → creates a conditional order, checked every 5 min by SW alarm
- `send 10 USDC every week to Alice` → creates a scheduled recurring payment
- `show my balance` → returns live balances

### Agent Wallets (x402/MPP)

Programmable sub-wallets for AI agents and scripts. Each agent wallet is an HD-derived keypair (index 1000+) with its own SOL balance and configurable guardrails. Once funded and unlocked, agents pay autonomously — no popup, no user confirmation — within guardrail limits.

**Guardrails per agent:**

- Daily budget (SOL) — resets at midnight UTC
- Per-transaction limit (SOL)
- Allowed origins — hostname-exact allowlist (empty = any)
- Cooldown — minimum seconds between payments
- Kill-switch — disable instantly without deleting

**API exposed to web pages:**

```js
window.solaiAgent.pay({
  agentId: 'uuid',
  recipient: 'SolAddress...',
  amountSol: 0.001
})
// → { signature: 'txSig...' } or { error: 'reason' }
```

**x402 compatibility:** The `pay()` primitive maps directly to the HTTP 402 micropayment flow. A resource server returns 402 with payment details → client calls `pay()` → retries the request with the signature as proof.

### Token Watchlist

- Track up to 10 Solana tokens by price, independent of wallet balance
- Shows current price + 24h % change sourced from CoinGecko
- Add/remove from a curated list: SOL, USDC, USDT, JUP, BONK, JTO, RAY, ORCA, HNT, PYTH
- Token logos and live prices shown in the add sheet

### History & Analytics

- Full transaction history — no 7-day limit, stores up to 1,000 records
- Grouped by month (e.g. "April 2026", "March 2026") with record count per group
- Per-network filtering — mainnet and devnet histories are kept strictly separate
- **Spending Heatmap** — GitHub-style 13-week activity calendar with month labels, day-of-week axis, and four intensity levels
- **Transaction Breakdown** — horizontal fill bar (sends / receives / swaps) with total SOL sent

### Notifications

- Push notifications (via Chrome `notifications` API) when SOL or any SPL token arrives
- Checks every 60 seconds via a background service worker alarm
- Toggle on/off in Settings → Notifications
- Clicking a notification opens the extension popup

### Power User Features

- **Keyboard Shortcuts** — `Cmd/Ctrl+K` opens the command palette, `Cmd/Ctrl+L` locks the wallet
- **Command Palette** — searchable list of all screens and actions; arrow-key navigation, Enter to go
- **Export Settings** — download contacts, stealth address labels, agent wallet configs (no private keys), and scheduled jobs as a dated JSON file
- **In-App Changelog** — bottom sheet showing what's new appears automatically on first open after each version update; dismissed state saved to sync storage
- **Devnet Faucet** — one-click 1 SOL request on devnet directly from the Receive screen; 24-hour rate limit enforced locally

---

## Screens

| Screen | Purpose |
| --- | --- |
| Onboarding | Create wallet, import seed, or connect Ledger |
| Home | Balance card, token list, AI input bar |
| Send | Single transfer with contact autocomplete and draft restore |
| Batch Send | Multi-recipient send from a plain-text list |
| Receive | Main address QR + Stealth addresses tab + devnet faucet |
| Swap | Jupiter-powered token swap |
| History | Transaction log grouped by month, heatmap, type breakdown |
| Contacts | Address book with emoji, search, and send shortcut |
| Explore | Token prices + trending |
| Watchlist | Track token prices independently of balance |
| AI Chat | Full AI conversation interface |
| Orders | Active conditional orders |
| NFTs | NFT grid viewer |
| Agent Wallets | Create, fund, monitor, edit guardrails, kill-switch |
| Connected Apps | Manage dApp permissions + last-used dates |
| Settings | Network, theme, notifications, password, API key, export, reset |
| Lock Screen | Unlock with password + forgot password recovery flow |
| dApp Approval | Connect request popup |
| Sign Approval | Sign/send transaction popup (software + Ledger paths) |

---

## Security Model

| Threat | Mitigation |
| --- | --- |
| Source code key extraction | Per-install random AES-256 storage key — not in bundle |
| Storage compromise | All `chrome.storage.local` values AES-256-GCM encrypted |
| Memory forensics | Keypairs zeroed in memory on lock (`secretKey.fill(0)`) |
| BadUSB / malicious HID device | Ledger vendor ID `0x2c97` verified before opening transport |
| Brute force | 10-attempt lockout, 5-minute cooldown |
| Malicious dApp auto-sign | Every dApp sign request requires explicit popup confirmation |
| Rogue agent overspend | Per-tx + daily budget + kill-switch enforced in SW before key is used |
| Origin spoofing in agent allowlist | Hostname-exact matching (`new URL().hostname`) — prefix match removed |
| Session fixation | 30-min TTL, `expiresAt` checked on every SW read |
| Prototype pollution | All cross-context message results use explicit field whitelists |
| Clickjacking on popup | `frame-ancestors 'none'` in extension CSP |
| Stale approved dApps | Origins auto-expire after 90 days of inactivity |
| Weak request IDs | `crypto.randomUUID()` everywhere — `Math.random()` removed |

---

## Networks

- **Mainnet** (`api.mainnet-beta.solana.com`) — real funds
- **Devnet** (`api.devnet.solana.com`) — testing, with one-click faucet
- Custom RPC URL supported in Settings → point to Triton One, Helius, QuickNode, etc.

Transaction history is fully network-scoped — mainnet and devnet records are stored with a `network` tag and never mixed in the UI.

---

## Distribution

- **Chrome Web Store:** [Install SOLAI Wallet](https://chromewebstore.google.com/detail/solai-wallet/lfclbffajamcijjdpaomclldjpdgopej)
- **GitHub:** Open source, MIT licensed
- Load unpacked from `dist/` for local development
