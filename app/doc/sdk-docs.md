# SOLAI SDK — Documentation

![Status](https://img.shields.io/badge/status-private%20beta-ABFF7A) ![Chain](https://img.shields.io/badge/chain-Solana-blue) ![Custody](https://img.shields.io/badge/custody-non--custodial-green)

A non-custodial DeFi SDK on Solana. Create AI agents that handle swaps and payments on a user's behalf — bounded by guardrails the user sets, with Umbra-based stealth addresses for private payments.

> **Preview documentation.** The SDK is in private beta and the API surface described here may change before public release. [Join the early-access list](/#early-access) to get the docs and your private npm tag when your batch opens.

---

## Why an SDK

Autonomous agents are useful exactly when they can act without asking. That is also what makes them dangerous: an agent with unlimited authority is a hot wallet with extra steps.

SOLAI splits the difference. An agent gets real signing capability, but only inside a **policy the user writes and signs**. Spending limits, token allowlists, protocol allowlists. Anything outside the policy is refused at the SDK boundary — before a transaction is built, before a fee is paid, before anything reaches the chain.

Three properties hold throughout:

- **Non-custodial** — keys never leave the user's device and never touch your servers or ours.
- **Bounded** — the policy is the agent's entire authority, and it is revocable.
- **Private** — payments can route through fresh stealth addresses so a user's main wallet is never exposed on-chain.

---

## Installation

```bash
npm i @solai/sdk
```

```bash
pnpm add @solai/sdk
```

The SDK is written in TypeScript and ships its own types. It targets Node 18+ and modern browsers.

---

## Quickstart

```ts
import { Solai } from "@solai/sdk";

const solai = new Solai({ wallet, cluster: "mainnet-beta" });

// The user signs this policy. It is the agent's entire authority.
const agent = await solai.agents.create({
  name: "treasury-bot",
  policy: {
    dailyLimit: "500 USDC",
    perTxLimit: "100 USDC",
    tokens:    ["SOL", "USDC", "JUP"],
    protocols: ["jupiter", "kamino"],
    revocable: true,
  },
});

// Swap — the route is found for you, the policy is checked first.
await agent.swap({ from: "USDC", to: "SOL", amount: 50 });

// Pay privately — a fresh stealth address, every time.
await agent.pay({
  to: "alice.sol",
  amount: 12,
  token: "USDC",
  stealth: true,
});
```

---

## Initialization

`Solai` is the entry point. It needs a wallet adapter to request signatures from and a cluster to talk to.

```ts
const solai = new Solai({
  wallet,                    // any Solana wallet adapter
  cluster: "mainnet-beta",   // "mainnet-beta" | "devnet" | "testnet"
  rpcUrl,                    // optional — your own RPC endpoint
});
```

| Option | Type | Description |
| --- | --- | --- |
| `wallet` | `WalletAdapter` | The user's wallet. Signing requests are routed here. |
| `cluster` | `Cluster` | Which Solana cluster to target. Defaults to `mainnet-beta`. |
| `rpcUrl` | `string` | Custom RPC endpoint. Falls back to a public endpoint. |

---

## Guardrails

The policy is the core of the SDK. It is signed by the user at agent-creation time and enforced on every call.

### Policy fields

| Field | Type | Description |
| --- | --- | --- |
| `dailyLimit` | `string` | Total value the agent may move in a rolling 24 hours. |
| `perTxLimit` | `string` | Ceiling on any single transaction the agent builds. |
| `tokens` | `string[]` | Mints the agent may hold, send, or swap. Everything else is refused. |
| `protocols` | `string[]` | Venues the agent may route through — `jupiter`, `kamino`, or your own program. |
| `expiresAt` | `Date` | Hard expiry. After this the policy stops authorising anything. |
| `revocable` | `boolean` | Whether the user can tear the agent's authority down instantly. |

### How enforcement works

Every agent method runs the same three steps before it signs anything:

1. **Resolve** the intent into a concrete transaction — amounts, route, destination.
2. **Check** that transaction against the policy: value against the limits, every mint against `tokens`, every program against `protocols`, and the clock against `expiresAt`.
3. **Sign and send** only if all checks pass. Otherwise throw a `PolicyViolationError` and build nothing.

Because the check happens before the transaction is built, a refused call costs no fee and leaves no on-chain trace.

```ts
try {
  await agent.send({ to: "…", amount: 900, token: "USDC" });
} catch (err) {
  if (err instanceof PolicyViolationError) {
    console.log(err.reason);  // "exceeds dailyLimit (500 USDC)"
    console.log(err.field);   // "dailyLimit"
  }
}
```

### Worked examples

| Request | Verdict |
| --- | --- |
| `swap 50 USDC → SOL via Jupiter` | Allowed — within limits, both mints allowlisted, Jupiter allowlisted |
| `pay 12 USDC to alice.sol` | Allowed |
| `send 900 USDC` | Refused — exceeds `dailyLimit` (500 USDC) |
| `swap SOL → BONK` | Refused — `BONK` is not in `tokens` |

### Revoking

```ts
await agent.revoke();
```

Revocation is immediate and unilateral. A revoked agent's policy authorises nothing; subsequent calls throw regardless of their contents.

---

## Agents

### Creating

```ts
const agent = await solai.agents.create({ name, policy });
```

### Listing and loading

```ts
const agents = await solai.agents.list();
const agent  = await solai.agents.get(agentId);
```

### Updating a policy

Tightening a policy takes effect immediately. Loosening one requires a fresh signature from the user, because it grants authority they have not yet approved.

```ts
await agent.updatePolicy({ dailyLimit: "250 USDC" });  // tighten — immediate
await agent.updatePolicy({ dailyLimit: "900 USDC" });  // loosen — prompts the user
```

---

## Actions

### Swap

Routes across Solana DEXs and executes at the best available rate.

```ts
await agent.swap({
  from: "USDC",
  to: "SOL",
  amount: 50,
  slippageBps: 50,   // optional, defaults to 50 (0.5%)
});
```

### Pay

A one-off transfer to a wallet address or a resolvable handle.

```ts
await agent.pay({
  to: "alice.sol",
  amount: 12,
  token: "USDC",
  stealth: true,     // derive a fresh one-time address
});
```

### Schedule

Recurring transfers on a cadence. The agent executes them without re-prompting, still inside the policy.

```ts
await agent.schedule({
  to: "alice.sol",
  amount: 5,
  token: "USDC",
  cadence: "daily",
  startsAt: new Date(),
});
```

### Conditional orders

Execute when a price condition is met.

```ts
await agent.when({
  asset: "SOL",
  condition: { type: "priceDrop", percent: 10 },
  then: { action: "swap", from: "USDC", to: "SOL", amount: 100 },
});
```

---

## Stealth payments

SOLAI uses Umbra-style stealth addresses so a payment can be received without linking to the recipient's main wallet.

### How it works

1. **Publish a meta-address.** The recipient generates one shareable meta-address, once.
2. **Derive.** The sender derives a unique one-time address from that meta-address via X25519 ECDH. Only the recipient can compute the matching private key.
3. **Send.** Funds land at the one-time address. Nothing on-chain links it to the recipient's main wallet.
4. **Scan and sweep.** The recipient scans for incoming stealth payments and sweeps them whenever they choose.

```ts
// Recipient — once
const meta = await solai.stealth.createMetaAddress();

// Sender
await agent.pay({ to: meta, amount: 12, token: "USDC", stealth: true });

// Recipient — discover and collect
const payments = await solai.stealth.scan();
await solai.stealth.sweep(payments);
```

Every payment produces a fresh address. There is no address reuse, so no observer can aggregate a recipient's payment history from the chain.

---

## x402 micropayments

The SDK implements the x402 protocol, which carries payment over the HTTP `402 Payment Required` status. It suits machine-scale payments — per-request API billing, metered inference, pay-per-call services — where a human confirmation step would be absurd.

```ts
const response = await agent.x402.fetch("https://api.example.com/inference", {
  maxAmount: "0.01 USDC",
});
```

The `maxAmount` ceiling is checked against the policy like any other spend, and the per-request amounts still count toward `dailyLimit`.

---

## Error handling

| Error | Meaning |
| --- | --- |
| `PolicyViolationError` | The request fell outside the agent's policy. Carries `reason` and `field`. |
| `AgentRevokedError` | The agent's authority has been revoked. |
| `PolicyExpiredError` | The policy is past its `expiresAt`. |
| `InsufficientFundsError` | The wallet cannot cover the transaction plus fees. |
| `RouteNotFoundError` | No route exists within the allowlisted protocols and slippage. |

---

## Security model

- **Keys stay with the user.** The SDK holds no private keys and transmits none. Signing is delegated to the user's wallet adapter.
- **Policies are signed.** An agent's authority derives from a user signature, not from a config file you control.
- **Checks precede construction.** Guardrails are enforced before a transaction is built, so a violation costs nothing and leaves no trace.
- **Revocation is unilateral.** A user can end an agent's authority at any moment without your cooperation.
- **Least privilege by default.** A new agent authorises nothing until a policy is attached.

---

## FAQ

**Is it really non-custodial?**
Yes. Keys stay on the user's device and never reach your servers or ours. An agent acts under a policy the user signed, not under a key we hold.

**What happens if an agent exceeds its policy?**
The call is refused before a transaction is built. Nothing reaches the chain and no fee is paid.

**Which chains are supported?**
Solana at launch. The policy model and agent interface are chain-agnostic by design; additional chains follow the public release.

**Do I need to run a backend?**
No. The SDK runs client-side against the user's wallet. A backend is only needed if you want to orchestrate agents server-side, which requires a separate delegated-signing setup.

**When does the beta open?**
We onboard in batches from the early-access list. [Join it](/#early-access) and we'll send your private npm tag and the docs when your batch opens.

---

## Support

- **Early access:** [Join the list](/#early-access)
- **Wallet documentation:** [SOLAI Wallet docs](/doc/wallet)
- **GitHub:** [Open source on GitHub](https://github.com/gamandeepsingh/solai-mvp)
- **X:** [@solaiwallet](https://x.com/solaiwallet)

---

## License

Copyright (c) 2025 Gamandeep. Released under the [MIT License](https://github.com/gamandeepsingh/solai-mvp/blob/main/LICENSE).
