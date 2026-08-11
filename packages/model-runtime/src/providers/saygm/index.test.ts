// @vitest-environment node
import { ModelProvider } from 'model-bank';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { testProvider } from '../../providerTestUtils';
import { LobeSayGM, params } from './index';

testProvider({
  Runtime: LobeSayGM,
  chatDebugEnv: 'DEBUG_SAYGM_CHAT_COMPLETION',
  chatModel: 'gpt-5.4',
  defaultBaseURL: 'https://api.saygm.com/v1',
  provider: ModelProvider.SayGM,
  test: {
    skipAPICall: true,
  },
});

describe('LobeSayGM - custom features', () => {
  let instance: InstanceType<typeof LobeSayGM>;

  beforeEach(() => {
    instance = new LobeSayGM({ apiKey: 'test' });
    vi.spyOn(instance['client'].chat.completions, 'create').mockResolvedValue(
      new ReadableStream() as any,
    );
  });

  describe('params configuration', () => {
    it('should export params object with correct baseURL', () => {
      expect(params.baseURL).toBe('https://api.saygm.com/v1');
    });

    it('should export params with correct provider', () => {
      expect(params.provider).toBe(ModelProvider.SayGM);
    });

    it('should have models function', () => {
      expect(typeof params.models).toBe('function');
    });

    it('should disable chat debug by default', () => {
      delete process.env.DEBUG_SAYGM_CHAT_COMPLETION;
      expect(params.debug.chatCompletion()).toBe(false);
    });

    it('should enable chat debug when env is set to 1', () => {
      process.env.DEBUG_SAYGM_CHAT_COMPLETION = '1';
      expect(params.debug.chatCompletion()).toBe(true);
      delete process.env.DEBUG_SAYGM_CHAT_COMPLETION;
    });
  });

  describe('handlePayload', () => {
    it('should strip Lobe-internal fields and force chat.completions', async () => {
      await instance.chat({
        enabledSearch: true,
        messages: [{ content: 'Hello', role: 'user' }],
        model: 'gpt-5.6-sol',
        reasoning_effort: 'high',
        stream: true,
      });

      const calledPayload = (instance['client'].chat.completions.create as any).mock.calls[0][0];
      expect(calledPayload.model).toBe('gpt-5.6-sol');
      expect(calledPayload.reasoning_effort).toBe('high');
      expect(calledPayload.enabledSearch).toBeUndefined();
      expect(calledPayload.apiMode).toBeUndefined();
      expect(calledPayload.stream).toBe(true);
    });

    it('should map reasoning to reasoning_content in non-streaming responses', () => {
      const mockCompletion = {
        choices: [
          {
            index: 0,
            message: {
              content: 'Test content',
              role: 'assistant',
              reasoning: 'Test reasoning',
            },
          },
        ],
      };

      const stream = params.chatCompletion!.handleTransformResponseToStream!(mockCompletion as any);
      expect(stream).toBeDefined();
    });
  });

  describe('models function', () => {
    it('should fetch and process models', async () => {
      const mockClient = {
        models: {
          list: vi.fn().mockResolvedValue({
            data: [{ id: 'gpt-5.4' }, { id: 'gpt-5.6-sol' }],
          }),
        },
      } as any;

      const models = await params.models!({ client: mockClient });

      expect(mockClient.models.list).toHaveBeenCalledTimes(1);
      expect(models).toBeDefined();
      expect(Array.isArray(models)).toBe(true);
    });

    it('should handle empty models list', async () => {
      const mockClient = {
        models: {
          list: vi.fn().mockResolvedValue({ data: [] }),
        },
      } as any;

      const models = await params.models!({ client: mockClient });

      expect(models).toEqual([]);
    });
  });
});
