# SOLAI Wallet — Project Brief

## Overview

SOLAI is a non-custodial Solana browser wallet built as a Chrome Extension. It combines a clean, minimal UI with an AI-powered command interface and programmable agent wallets — making on-chain actions as simple as typing a sentence, and enabling fully automated machine-to-machine payments.

---

## Problem

Crypto wallets are built for power users. They expect you to understand gas fees, addresses, slippage, and transaction types. SOLAI removes that friction by wrapping everything in natural language and smart defaults and goes a step further by letting AI agents pay on your behalf, within strict programmatic guardrails you define.

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
| Swap | Jupiter Aggregator API |
| AI | OpenRouter API (model-agnostic) |
| Storage | `chrome.storage.local` (encrypted) + `chrome.storage.session` (keys) |
| Build | Vite |

---

## Architecture

### Key Design Decisions

**MV3 Service Worker statelessness** — Chrome MV3 service workers can be killed and restarted at any time. All state that needs to survive (wallet sessions, pending sign requests, agent keypairs) lives in `chrome.storage.session` rather than in-memory, so it survives SW restarts automatically.

**Encrypted local storage** — Every value written to `chrome.storage.local` is AES-256-GCM encrypted with a key derived from a device-specific fingerprint. Raw keys never touch disk.

**Session keys** — Decrypted keypairs are held only in `chrome.storage.session` with a 30-minute TTL. When the session expires or the user locks, keys are wiped. The wallet auto-locks.

**HD key namespace** — One mnemonic, three address spaces:

| Index range | Purpose |
| --- | --- |
| 0 | Main wallet |
| 1 – 999 | Stealth addresses |
| 1000+ | Agent wallets |

**Sign approval popup** — All dApp signing requests (signMessage, signTransaction, signAndSendTransaction) open a dedicated popup. The extension never auto-signs for dApps. Agent wallets are the only exception — they sign automatically within guardrail limits.

---

## Features

### Core Wallet

- Create wallet (new seed) or import from 12-word recovery phrase
- Multi-wallet — add and switch between multiple accounts, each with its own seed
- View SOL and SPL token balances in real time
- Send / Receive SOL, USDC, USDT, and custom SPL tokens
- QR code receive screen
- Transaction history (on-chain + locally logged)
- NFT viewer

### Privacy — Stealth Addresses

HD-derived one-time receive addresses derived from the same seed at indices 1–999. Each address is a completely independent Solana keypair on-chain — no link to the main wallet. Users can generate labelled stealth addresses and sweep funds back ("Collect") with one tap and a password confirm.

### dApp Connectivity

- Exposes `window.solana` (Phantom-compatible) and Wallet Standard protocol
- dApps see SOLAI in their wallet selector alongside Phantom and Solflare
- First connection: shows origin approval popup
- Subsequent connections: silently returns public key (pre-approved)
- Signing: always opens a confirmation popup showing the dApp origin, request type, and message/transaction details
- Reject closes popup and sends rejection to the dApp immediately
- Connected Apps screen: view and revoke per-dApp access

### AI Commands

Natural language interface powered by OpenRouter. User types a command, AI parses intent and executes:

- `"swap 0.5 SOL to USDC"` → quotes Jupiter, shows estimated output, executes swap
- `"send 1 SOL to mom"` → resolves contact, sends transaction
- `"buy SOL if it drops below $120"` → creates a conditional order, checked every 5 min by service worker alarm
- `"send 10 USDC every week to Alice"` → creates a scheduled recurring payment
- `"show my balance"` → returns live balances

### Agent Wallets (x402/MPP)

Programmable sub-wallets for AI agents and scripts. Each agent wallet is an HD-derived keypair (index 1000+) with its own SOL balance and configurable guardrails. Once funded and unlocked, agents can pay autonomously — no popup, no user confirmation — within the limits set.

**Guardrails per agent:**

- Daily budget (SOL) — resets at midnight UTC
- Per-transaction limit (SOL)
- Allowed origins — whitelist of URLs that can trigger payments (empty = any)
- Cooldown — minimum seconds between payments
- Kill-switch — disable an agent instantly without deleting it

**API exposed to web pages:**

`window.solaiAgent.pay({
  agentId: 'uuid',
  recipient: 'SolAddress...',
  amountSol: 0.001
})
// → { signature: 'txSig...' } or { error: 'reason' }`

**x402 compatibility:** The `pay()` primitive maps directly to the HTTP 402 micropayment flow. A resource server returns 402 with payment details → client calls `pay()` → retries the request with the signature as proof of payment.

---

## Screens

| Screen | Purpose |
| --- | --- |
| Onboarding | Create or import wallet |
| Home | Balance, token list, AI input bar |
| Send | Token transfer with contact autocomplete |
| Receive | Main address QR + Stealth address tab |
| Swap | Jupiter-powered token swap |
| History | Transaction log |
| Contacts | Address book |
| Explore | Token prices + trending |
| AI Chat | Full AI conversation interface |
| Orders | Active conditional orders |
| NFTs | NFT grid viewer |
| Agent Wallets | Create, fund, monitor, and control agent wallets |
| Connected Apps | Manage dApp permissions |
| Settings | Network, theme, password, API key, reset |
| Lock Screen | Unlock with password + forgot password flow |
| dApp Approval | Connect request popup |
| Sign Approval | Sign/send transaction popup |

---

## Security Model

| Threat | Mitigation |
| --- | --- |
| Keylogger / memory scrape | Keys only in `chrome.storage.session`, expire in 30 min, never in DOM |
| Storage compromise | All local storage AES-256-GCM encrypted |
| Brute force | 10-attempt lockout, 5-minute cooldown |
| Malicious dApp auto-sign | Every dApp sign request requires explicit popup confirmation |
| Rogue agent overspend | Per-tx limits + daily budget + kill-switch enforced in service worker before any key is used |
| Session fixation | Session TTL — `expiresAt` checked on every read in SW |

---

## Networks

- **Mainnet** (`api.mainnet-beta.solana.com`) — real funds
- **Devnet** (`api.devnet.solana.com`) — testing
- Custom RPC URL supported (Settings) — point to Triton One, Helius, QuickNode, etc.

Transaction history is network-scoped — mainnet txns only show on mainnet, devnet txns on devnet.

---

## Distribution

- **Chrome Web Store:** [SOLAI Wallet](https://chromewebstore.google.com/detail/solai-wallet/lfclbffajamcijjdpaomclldjpdgopej)
- **GitHub:** [open source](https://github.com/gamandeepsingh/solai), [MIT licensed](https://github.com/gamandeepsingh/solai/blob/main/LICENSE)
- Load unpacked from `dist/` for local development

---

## Potential Roadmap

- Hardware wallet support (Ledger)
- Multi-sig agent wallets
- x402 HTTP interceptor (auto-handle 402 responses without dApp changes)
- Dynamic.xyz integration for agent wallet auth
- Triton One dedicated RPC auto-provisioning
- Push notifications for received funds (already partially implemented via SW alarms)
- Mobile companion app