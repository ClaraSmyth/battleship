module.exports = function (api) {
  api.env('test');
  
  const presets = [['@babel/preset-env', {targets: {node: 'current'}}]];

  return {
    presets
  };
}