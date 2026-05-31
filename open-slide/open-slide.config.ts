import type { OpenSlideConfig } from '@open-slide/core';

const openSlideConfig: OpenSlideConfig = {
  // @ts-ignore — base path support pending upstream (open-slide#173)
  base: process.env.OPEN_SLIDE_BASE || '/',
};

export default openSlideConfig;
