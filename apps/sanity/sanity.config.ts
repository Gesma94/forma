import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemes';

export default defineConfig({
  name: 'default',
  title: 'forma',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID ?? '',
  dataset: process.env.SANITY_STUDIO_PROJECT_DATASET ?? '',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes
  }
});
