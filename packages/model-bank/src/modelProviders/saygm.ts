import type { ModelProviderCard } from '../types';

const SayGM: ModelProviderCard = {
  chatModels: [],
  checkModel: 'gpt-5.4',
  description:
    'SayGM is a Bittensor inference subnet that serves frontier OpenAI models at open, gateway-priced rates through an OpenAI-compatible API.',
  id: 'saygm',
  modelsUrl: 'https://saygm.com',
  name: 'SayGM',
  settings: {
    disableBrowserRequest: true,
    proxyUrl: {
      placeholder: 'https://api.saygm.com/v1',
    },
    sdkType: 'openai',
    showModelFetcher: false,
  },
  url: 'https://saygm.com',
};

export default SayGM;
