import type { CodeLine } from "@/app/components/ui/CodeBlock";

/** Hero: the whole pitch in twelve lines — create an agent, bound it, use it. */
export const HERO_SNIPPET: CodeLine[] = [
  [
    { t: "const ", c: "kw" },
    { t: "agent", c: "plain" },
    { t: " = ", c: "plain" },
    { t: "await ", c: "kw" },
    { t: "solai", c: "plain" },
    { t: ".agents.", c: "prop" },
    { t: "create", c: "fn" },
    { t: "({", c: "plain" },
  ],
  [
    { t: "  name: ", c: "prop" },
    { t: '"treasury-bot"', c: "str" },
    { t: ",", c: "plain" },
  ],
  [
    { t: "  policy: ", c: "prop" },
    { t: "{", c: "plain" },
  ],
  [
    { t: "    dailyLimit: ", c: "prop" },
    { t: '"500 USDC"', c: "str" },
    { t: ",", c: "plain" },
  ],
  [
    { t: "    tokens:     [", c: "prop" },
    { t: '"SOL", "USDC", "JUP"', c: "str" },
    { t: "],", c: "plain" },
  ],
  [
    { t: "    protocols:  [", c: "prop" },
    { t: '"jupiter", "kamino"', c: "str" },
    { t: "],", c: "plain" },
  ],
  [{ t: "  },", c: "plain" }],
  [{ t: "});", c: "plain" }],
  [],
  [
    { t: "await ", c: "kw" },
    { t: "agent.", c: "plain" },
    { t: "swap", c: "fn" },
    { t: "({ from: ", c: "prop" },
    { t: '"USDC"', c: "str" },
    { t: ", to: ", c: "prop" },
    { t: '"SOL"', c: "str" },
    { t: ", amount: ", c: "prop" },
    { t: "50", c: "num" },
    { t: " });", c: "plain" },
  ],
  [{ t: "// routed via Jupiter · within policy", c: "com" }],
];

export const HERO_SNIPPET_RAW = `const agent = await solai.agents.create({
  name: "treasury-bot",
  policy: {
    dailyLimit: "500 USDC",
    tokens:     ["SOL", "USDC", "JUP"],
    protocols:  ["jupiter", "kamino"],
  },
});

await agent.swap({ from: "USDC", to: "SOL", amount: 50 });
// routed via Jupiter · within policy`;

/** /sdk quickstart: install → init → policy → act → private payment. */
export const QUICKSTART_SNIPPET: CodeLine[] = [
  [
    { t: "import ", c: "kw" },
    { t: "{ Solai } ", c: "plain" },
    { t: "from ", c: "kw" },
    { t: '"@solai/sdk"', c: "str" },
    { t: ";", c: "plain" },
  ],
  [],
  [
    { t: "const ", c: "kw" },
    { t: "solai", c: "plain" },
    { t: " = ", c: "plain" },
    { t: "new ", c: "kw" },
    { t: "Solai", c: "fn" },
    { t: "({ wallet, cluster: ", c: "prop" },
    { t: '"mainnet-beta"', c: "str" },
    { t: " });", c: "plain" },
  ],
  [],
  [{ t: "// The user signs this policy. It is the agent's entire authority.", c: "com" }],
  [
    { t: "const ", c: "kw" },
    { t: "agent", c: "plain" },
    { t: " = ", c: "plain" },
    { t: "await ", c: "kw" },
    { t: "solai", c: "plain" },
    { t: ".agents.", c: "prop" },
    { t: "create", c: "fn" },
    { t: "({", c: "plain" },
  ],
  [
    { t: "  name: ", c: "prop" },
    { t: '"treasury-bot"', c: "str" },
    { t: ",", c: "plain" },
  ],
  [
    { t: "  policy: ", c: "prop" },
    { t: "{", c: "plain" },
  ],
  [
    { t: "    dailyLimit: ", c: "prop" },
    { t: '"500 USDC"', c: "str" },
    { t: ", perTxLimit: ", c: "prop" },
    { t: '"100 USDC"', c: "str" },
    { t: ",", c: "plain" },
  ],
  [
    { t: "    tokens:    [", c: "prop" },
    { t: '"SOL", "USDC", "JUP"', c: "str" },
    { t: "],", c: "plain" },
  ],
  [
    { t: "    protocols: [", c: "prop" },
    { t: '"jupiter", "kamino"', c: "str" },
    { t: "],", c: "plain" },
  ],
  [
    { t: "    revocable: ", c: "prop" },
    { t: "true", c: "kw" },
    { t: ",", c: "plain" },
  ],
  [{ t: "  },", c: "plain" }],
  [{ t: "});", c: "plain" }],
  [],
  [{ t: "// Swap — the route is found for you, the policy is checked first.", c: "com" }],
  [
    { t: "await ", c: "kw" },
    { t: "agent.", c: "plain" },
    { t: "swap", c: "fn" },
    { t: "({ from: ", c: "prop" },
    { t: '"USDC"', c: "str" },
    { t: ", to: ", c: "prop" },
    { t: '"SOL"', c: "str" },
    { t: ", amount: ", c: "prop" },
    { t: "50", c: "num" },
    { t: " });", c: "plain" },
  ],
  [],
  [{ t: "// Pay privately — a fresh stealth address, every time.", c: "com" }],
  [
    { t: "await ", c: "kw" },
    { t: "agent.", c: "plain" },
    { t: "pay", c: "fn" },
    { t: "({", c: "plain" },
  ],
  [
    { t: "  to: ", c: "prop" },
    { t: '"alice.sol"', c: "str" },
    { t: ", amount: ", c: "prop" },
    { t: "12", c: "num" },
    { t: ", token: ", c: "prop" },
    { t: '"USDC"', c: "str" },
    { t: ",", c: "plain" },
  ],
  [
    { t: "  stealth: ", c: "prop" },
    { t: "true", c: "kw" },
    { t: ",", c: "plain" },
  ],
  [{ t: "});", c: "plain" }],
];

export const QUICKSTART_RAW = `npm i @solai/sdk`;
