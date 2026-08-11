import type { AIChatModelCard } from '../types/aiModel';

// SayGM is a Bittensor inference subnet gateway. It serves frontier OpenAI
// models over the OpenAI chat.completions wire.
const saygmChatModels: AIChatModelCard[] = [
  {
    abilities: {
      functionCall: true,
      reasoning: true,
    },
    contextWindowTokens: 1_050_000,
    description:
      'GPT-5.6 Sol is OpenAI’s flagship and most capable model, the top choice in the GPT family for coding and agentic work.',
    displayName: 'GPT-5.6 Sol',
    enabled: true,
    family: 'gpt',
    generation: 'gpt-5.6',
    id: 'gpt-5.6-sol',
    maxOutput: 128_000,
    settings: {
      extendParams: ['gpt5_6ReasoningEffort', 'textVerbosity'],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
    },
    contextWindowTokens: 1_050_000,
    description: 'GPT-5.6 Luna is optimized for fast, high-volume workloads.',
    displayName: 'GPT-5.6 Luna',
    enabled: true,
    family: 'gpt',
    generation: 'gpt-5.6',
    id: 'gpt-5.6-luna',
    maxOutput: 128_000,
    settings: {
      extendParams: ['gpt5_6ReasoningEffort', 'textVerbosity'],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
    },
    contextWindowTokens: 1_050_000,
    description: 'GPT-5.6 Terra is a balanced model for everyday professional work.',
    displayName: 'GPT-5.6 Terra',
    enabled: true,
    family: 'gpt',
    generation: 'gpt-5.6',
    id: 'gpt-5.6-terra',
    maxOutput: 128_000,
    settings: {
      extendParams: ['gpt5_6ReasoningEffort', 'textVerbosity'],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
    },
    contextWindowTokens: 1_000_000,
    description:
      'GPT-5.5 is OpenAI’s previous-generation frontier model for complex professional work.',
    displayName: 'GPT-5.5',
    enabled: true,
    family: 'gpt',
    generation: 'gpt-5.5',
    id: 'gpt-5.5',
    maxOutput: 128_000,
    settings: {
      extendParams: ['gpt5_2ReasoningEffort', 'textVerbosity'],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
    },
    contextWindowTokens: 1_000_000,
    description:
      'GPT-5.4 is the frontier model for complex professional work with highest reasoning capability.',
    displayName: 'GPT-5.4',
    enabled: true,
    family: 'gpt',
    generation: 'gpt-5.4',
    id: 'gpt-5.4',
    maxOutput: 128_000,
    settings: {
      extendParams: ['gpt5_2ReasoningEffort', 'textVerbosity'],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
    },
    contextWindowTokens: 1_000_000,
    description:
      'GPT-5.4 mini is OpenAI’s strongest mini model for coding, computer use, and subagents.',
    displayName: 'GPT-5.4 mini',
    enabled: true,
    family: 'gpt',
    generation: 'gpt-5.4',
    id: 'gpt-5.4-mini',
    maxOutput: 128_000,
    settings: {
      extendParams: ['gpt5_2ReasoningEffort', 'textVerbosity'],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
    },
    contextWindowTokens: 1_000_000,
    description: 'GPT-5.4 nano is a compact GPT-5.4-class model for simple high-volume tasks.',
    displayName: 'GPT-5.4 nano',
    enabled: true,
    family: 'gpt',
    generation: 'gpt-5.4',
    id: 'gpt-5.4-nano',
    maxOutput: 128_000,
    settings: {
      extendParams: ['gpt5_2ReasoningEffort', 'textVerbosity'],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
    },
    contextWindowTokens: 1_000_000,
    description:
      'o3 is a powerful all-round model that sets a new bar for math, science, programming, and visual reasoning.',
    displayName: 'o3',
    enabled: true,
    family: 'o-series',
    generation: 'o3',
    id: 'o3',
    maxOutput: 100_000,
    settings: {
      extendParams: ['reasoningEffort'],
    },
    type: 'chat',
  },
  {
    abilities: {
      functionCall: true,
      reasoning: true,
    },
    contextWindowTokens: 1_000_000,
    description:
      'o4-mini is the latest small o-series model, optimized for fast, effective reasoning with high efficiency in coding and vision tasks.',
    displayName: 'o4-mini',
    enabled: true,
    family: 'o-series',
    generation: 'o4',
    id: 'o4-mini',
    maxOutput: 100_000,
    settings: {
      extendParams: ['reasoningEffort'],
    },
    type: 'chat',
  },
];

export const allModels = [...saygmChatModels];

export default allModels;
