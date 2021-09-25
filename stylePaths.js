const path = require('path');
module.exports = {
  stylePaths: [
    path.resolve(__dirname, 'src'),
    path.resolve(__dirname, 'node_modules/patternfly'),
    path.resolve(__dirname, 'node_modules/@patternfly/patternfly'),
    path.resolve(__dirname, 'node_modules/@patternfly/react-styles/css'),
    path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/styles/base.css'),
    path.resolve(__dirname, 'node_modules/@patternfly/react-core/dist/esm/@patternfly/patternfly'),
    path.resolve(__dirname, 'node_modules/@patternfly/react-core/node_modules/@patternfly/react-styles/css'),
    path.resolve(__dirname, 'node_modules/@patternfly/react-table/node_modules/@patternfly/react-styles/css'),    
    path.resolve(__dirname, 'node_modules/@patternfly/react-inline-edit-extension/node_modules/@patternfly/react-styles/css'),
    path.resolve(__dirname, 'node_modules/@data-driven-forms/pf4-component-mapper'),
    path.resolve(__dirname, 'node_modules/antd'),
    path.resolve(__dirname, 'node_modules/react-big-scheduler')
  ]
}
