import { ModelProvider } from 'model-bank';

import type { OpenAICompatibleFactoryOptions } from '../../core/openaiCompatibleFactory';
import {
  createOpenAICompatibleRuntime,
  transformResponseToStream,
} from '../../core/openaiCompatibleFactory';
import { MODEL_LIST_CONFIGS, processModelList } from '../../utils/modelParse';

export interface SayGMModelCard {
  id: string;
}

/**
 * SayGM is an OpenAI-compatible gateway. Live-verified (2026-08-07): every
 * OpenAI-chat model serves `/v1/chat/completions`, while the Responses wire
 * 404s for the gpt-5.x family. Strip the factory's `apiMode` (set by its
 * built-in gpt-5.x Responses rules) so requests always go to chat.completions.
 */
export const params = {
  baseURL: 'https://api.saygm.com/v1',
  chatCompletion: {
    handlePayload: (payload) => {
      // Remove internal apiMode parameter to prevent routing to the Responses
      // wire, which SayGM does not serve for these models.
      const { apiMode: _apiMode, enabledSearch, reasoning, thinking, ...rest } = payload as any;

      return {
        ...rest,
        stream: payload.stream ?? true,
      } as any;
    },
    handleTransformResponseToStream: (data) => {
      const choices = data.choices || [];
      for (const choice of choices) {
        if (choice.message && 'reasoning' in choice.message) {
          (choice.message as any).reasoning_content = (choice.message as any).reasoning;
        }
      }
      return transformResponseToStream(data);
    },
  },
  debug: {
    chatCompletion: () => process.env.DEBUG_SAYGM_CHAT_COMPLETION === '1',
  },
  models: async ({ client }) => {
    const modelsPage = (await client.models.list()) as any;
    const modelList: SayGMModelCard[] = Array.isArray(modelsPage?.data)
      ? modelsPage.data
      : Array.isArray(modelsPage)
        ? modelsPage
        : [];

    return processModelList(modelList, MODEL_LIST_CONFIGS.saygm, 'saygm');
  },
  provider: ModelProvider.SayGM,
} satisfies OpenAICompatibleFactoryOptions;

export const LobeSayGM = createOpenAICompatibleRuntime(params);
