# SOLAI Wallet — Documentation

![License](https://img.shields.io/badge/license-MIT-green) ![Version](https://img.shields.io/badge/version-1.0.9-blue) ![Platform](https://img.shields.io/badge/platform-Chrome%20Extension-yellow)

Non-custodial Solana wallet built as a Chrome Extension. Autonomous agent wallets, ECDH stealth addresses, AI-powered commands, and full dApp connectivity.

---

## What makes SOLAI different

**Agent Wallets** — programmable sub-wallets that auto-sign payments without a confirmation popup. Set spend limits per token, trusted origins, cooldowns, and auto-refill rules. Four APIs: SOL, SPL tokens, swap-then-pay, and spending allowances.

**ECDH Stealth Addresses** — true Umbra-style privacy on Solana. Generate a single shareable meta-address; every sender derives a unique one-time address via X25519 ECDH. No address reuse, no on-chain link to your wallet.

---

## Core Features

### Wallet Core
- Create or import from a 12-word seed phrase
- Multi-wallet support — switch between accounts instantly
- Ledger hardware wallet — connect via USB, sign on device
- SOL and SPL token balances (USDC, USDT, JUP, BONK, and more)
- Send / receive / swap all tokens
- Transaction history — up to 1,000 records, grouped by month, per-network

### Agent Wallets

HD-derived sub-wallets (index 1000+) isolated from your main wallet. Guardrails enforced in the service worker — no bypass possible.

| API | Description |
|-----|-------------|
| `window.solaiAgent.pay()` | Send SOL without confirmation |
| `window.solaiAgent.payToken()` | Send USDC, USDT, or any SPL token |
| `window.solaiAgent.swapAndPay()` | Swap via Jupiter then send in one call |
| `window.solaiAgent.requestAllowance()` | Request a one-time spending limit from the user |

**Guardrails per agent:**
- Daily SOL budget + per-token daily / per-tx limits (USDC, USDT)
- Per-transaction SOL limit
- Origin allowlist (hostname-exact)
- Cooldown between payments
- Allowed token whitelist
- Kill-switch (disable instantly)
- Auto-refill — top up from main wallet when balance drops below threshold

**Templates:** Custom, DCA Bot, Gaming, Subscription, Tip Jar, Gas Wallet

**Analytics per agent:** 7-day spend chart, top recipients, token breakdown, active allowances with revoke

### ECDH Stealth Addresses (Umbra-style)
- **Meta-address** — one shareable public key (`solai:stealth:v1:...`) derived from your seed at a dedicated BIP44 path using Curve25519 (X25519)
- **Sender flow** — paste a meta-address → SOLAI derives a unique one-time Ed25519 address via ECDH (different every send) and broadcasts an ephemeral pubkey announcement via Solana Memo
- **Recipient scanning** — background scan every 30 min; your viewing key decodes announcements and discovers incoming stealth payments automatically
- **Collect** — ECDH-derived addresses sweep to main wallet without re-entering a password (uses session key)
- **HD privacy addresses** — simpler option: manually generate unlinkable HD-derived addresses and share them per-contact

### AI Commands

Natural language via OpenRouter (bring your own key):
- "swap 0.5 SOL to USDC", "send $5 to Alice", "buy SOL if price drops 10%"
- Scheduled recurring payments — assign to main wallet or any agent wallet
- Conditional orders (price-triggered swaps via Jupiter) — assignable to an agent
- Streaming responses with markdown rendering

### Send
- **Stealth Send** — paste a `solai:stealth:v1:...` meta-address, SOLAI computes the one-time address automatically
- **Privacy Send** — toggle to route to a contact's saved privacy address
- **Batch Send** — paste `ADDRESS AMOUNT` pairs, preview all, send in one flow
- **Transaction Drafts** — auto-saved, resume on next open
- **Contact Autocomplete** — search by name or partial address

### dApp Connectivity
- Phantom-compatible provider (`window.solana`) + Wallet Standard
- Sign Message / Transaction / Sign & Send — always shows a confirmation popup
- Connect approval with 90-day per-origin memory
- Revoke access per dApp from Connected Apps

### Power User
- `Cmd/Ctrl+K` command palette — navigate anywhere without the mouse
- `Cmd/Ctrl+L` lock wallet
- Export contacts, agents, privacy labels, and scheduled jobs as JSON
- Spending heatmap (13-week GitHub-style calendar)
- Token watchlist — track prices independent of your balance
- Devnet faucet — one-click 1 SOL on devnet

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

## Stealth Address Protocol

ECDH-based stealth addresses adapted for Solana — no new dependencies, uses `tweetnacl` (already bundled).

```
RECIPIENT generates a meta-address:
  wallet seed → BIP44 m/44'/501'/9999'/0' → X25519 keypair
  meta-address = "solai:stealth:v1:<base58(xPub)>"

SENDER (given meta-address):
  1. ephemeral = nacl.box.keyPair()               // fresh X25519 keypair per send
  2. S = nacl.scalarMult(ephemeral.priv, xPub)    // ECDH shared secret
  3. seed = SHA256(S ++ ephemeral.pub)             // deterministic stealth seed
  4. stealthKp = nacl.sign.keyPair.fromSeed(seed) // one-time Ed25519 address
  5. Send SOL/tokens to stealthKp.publicKey
  6. Send dust + Memo("SOLAI_STEALTH:<ephemeral.pub>") to recipient's main address

RECIPIENT scans (every 30 min, no password needed):
  For each announcement ephemeral pub R:
    S = nacl.scalarMult(xPriv, R)                 // same ECDH
    seed = SHA256(S ++ R)
    stealthKp = nacl.sign.keyPair.fromSeed(seed)
    if balance(stealthKp.publicKey) > 0 → discovered!
```

**Privacy guarantee:** The stealth address has no on-chain link to the recipient's main wallet. Each send produces a different one-time address even to the same recipient.

---

## Agent Wallet API

```js
// SOL payment — no popup
const { signature } = await window.solaiAgent.pay({
  agentId: 'your-agent-uuid',
  recipient: 'DestinationAddress...',
  amountSol: 0.001,
})

// SPL token payment (USDC, USDT, etc.)
const { signature } = await window.solaiAgent.payToken({
  agentId: 'your-agent-uuid',
  recipient: 'DestinationAddress...',
  token: 'USDC',
  amount: 5.00,
})

// Swap then pay in one call
const { signature } = await window.solaiAgent.swapAndPay({
  agentId: 'your-agent-uuid',
  recipient: 'DestinationAddress...',
  fromToken: 'USDC',
  toToken: 'SOL',
  toAmount: 0.05,
})

// Request spending allowance (shows approval popup once)
const { approved, allowanceId, remaining } = await window.solaiAgent.requestAllowance({
  agentId: 'your-agent-uuid',
  token: 'USDC',
  maxAmount: 50,
  expireDays: 30,
  label: 'Monthly subscription',
})
```

**x402 micropayment pattern:**
```js
let res = await fetch('/api/resource')
if (res.status === 402) {
  const { recipient, amountSol, agentId } = await res.json()
  const { signature } = await window.solaiAgent.pay({ agentId, recipient, amountSol })
  res = await fetch('/api/resource', { headers: { 'X-Payment': signature } })
}
```

All guardrails are enforced in the service worker before any key is used. A violation returns an error — no signing occurs.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + K` | Command palette |
| `Cmd/Ctrl + L` | Lock wallet |

---

## Security

**Non-custodial** — private keys never leave your device. Stealth viewing keys are cached in `chrome.storage.session` (30-min TTL, cleared on lock). 

**Security measures:**
- Per-install random AES-256 storage key — not in bundle
- All `chrome.storage.local` values AES-256-GCM encrypted
- Keypairs zeroed in memory on lock
- Ledger vendor ID verified before opening transport
- 10-attempt lockout with 5-minute cooldown
- Every dApp sign request requires explicit popup confirmation
- Per-tx + daily budget + kill-switch enforced in SW before key is used
- Hostname-exact matching for origin verification
- 30-min TTL with expiry check on every SW read
- Explicit field whitelists for cross-context messages
- `frame-ancestors 'none'` in extension CSP
- Auto-expire stale approved dApps after 90 days of inactivity
- Cryptographically secure request IDs (`crypto.randomUUID()`)

---

## Networks

- **Mainnet** (`api.mainnet-beta.solana.com`) — real funds
- **Devnet** (`api.devnet.solana.com`) — testing, with one-click faucet
- Custom RPC URL supported in Settings — point to Triton One, Helius, QuickNode, etc.

Transaction history is fully network-scoped — mainnet and devnet records are stored with a `network` tag and never mixed in the UI.

---

## Installation

**Chrome Web Store:** [SOLAI Wallet](https://chromewebstore.google.com/detail/solai-wallet/lfclbffajamcijjdpaomclldjpdgopej)

**Manual Build:**
1. Clone the repository: `git clone https://github.com/gamandeepsingh/solai-mvp`
2. Navigate to extension folder: `cd extension`
3. Install dependencies: `npm install`
4. Build: `npm run build`
5. Open `chrome://extensions` → Enable Developer mode → Load unpacked → Select `dist/` folder

Works on Chrome, Brave, Arc, and any Chromium-based browser.

---

## FAQ

**Q: Is SOLAI really non-custodial?**  
A: Yes. Your private keys never leave your device. SOLAI is a browser extension — all cryptography happens locally. We can't access your funds.

**Q: How do stealth addresses work?**  
A: Each stealth send creates a unique one-time address using ECDH (Elliptic Curve Diffie-Hellman). The recipient's wallet scans and discovers payments automatically. No address reuse means better privacy than traditional addresses.

**Q: Can I use SOLAI with Ledger?**  
A: Yes. Connect via USB, and SOLAI will read your public key and request signatures on the device for every transaction.

**Q: What's an agent wallet?**  
A: A programmable sub-wallet with spending limits and auto-signing. Perfect for subscriptions, gaming, or API-based payments. You control all guardrails.

**Q: How much does SOLAI cost?**  
A: SOLAI is free to use. You only pay Solana network fees for transactions.

**Q: Is my seed phrase stored anywhere?**  
A: No. After import, your seed is encrypted locally and never transmitted. Session keys (for signing) are stored temporarily with a 30-min auto-lock.

**Q: Can I export my data?**  
A: Yes. Export contacts, agent configs, and labels as JSON from Settings. Private keys are never exported — you control your security.

---

## Support & Community

- **Bug Reports:** Found a vulnerability? See [SECURITY.md](https://github.com/gamandeepsingh/solai-mvp/blob/main/SECURITY.md)
- **GitHub:** [Open source on GitHub](https://github.com/gamandeepsingh/solai-mvp)
- **Twitter:** [@solai_wallet](https://twitter.com/solai_wallet)

---

## License

Copyright (c) 2025 Gamandeep. Released under the [MIT License](https://github.com/gamandeepsingh/solai-mvp/blob/main/LICENSE).

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
