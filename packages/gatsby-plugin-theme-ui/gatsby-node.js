exports.createPages = ({ actions, store }) => {
  const component = require.resolve('./src/editor')

  const dev = process.env.NODE_ENV !== 'production'
  const state = store.getState()

  if (dev) {
    actions.createPage({
      path: '/___theme',
      component,
    })
  }
}
