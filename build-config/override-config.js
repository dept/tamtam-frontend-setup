const overrideConfig = {
  source: {
    videos: {
      path: 'example-override',
    },
    images: {
      files: [
        '*.{jpg,jpeg,png,gif,svg,json,xml,ico,cur,webp}',
        '**/*.{jpg,jpeg,png,gif,svg,json,xml,ico,cur,webp}',
      ],
    },
  },
}

module.exports = overrideConfig
