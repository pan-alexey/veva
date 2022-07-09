import webpack from 'webpack';
import CliTable from 'cli-table';

const isJS = (val:string) => /\.js$/.test(val)
const isCSS = (val:string)  => /\.css$/.test(val)


export const buildTable = (assets: Array<{
  name: any;
  size: any;
}>, type: string) => {
  const table = new CliTable({
    head: ['', 'Size', 'File'],
    colAligns: [ 'middle', 'right', 'left'],
    colWidths: [5, 15, 50]
  });

  assets.forEach(file => {
    table.push([type, formatSize(file.size), file.name])
  });
  
  return table.toString()
}


export const renderAssets = (stats: webpack.Stats) => {
  const json = stats.toJson({
    hash: false,
    modules: false,
    chunks: false
  })

  const assets = json.assets
    ? json.assets
    : json.children.reduce((acc, child) => acc.concat(child.assets), []);

  const jsMap = new Map()
  const cssMap = new Map()

  assets.forEach((asset:webpack.StatsAsset) => {
    const name = asset.name.split('?')[0];
    const size = asset.size

    if (isJS(name)){
      jsMap.set(name, size);
    }

    if (isCSS(name)) {
      cssMap.set(name, size);
    }
  });

  if (cssMap.size) {
    const cssAssets = [...cssMap]
    .map(([name, size]) => ({ name, size }))
    .sort((a, b) =>  b.size - a.size)
    console.log(buildTable(cssAssets, 'css'));
  }

  if (jsMap.size) {
    const jsAssets = [...jsMap]
    .map(([name, size]) => ({ name, size }))
    .sort((a, b) =>  b.size - a.size)
    console.log(buildTable(jsAssets, 'js'));
  }

}

export const formatSize = (size: number) => {
  return (size / 1024).toFixed(2) + ' KiB'
}
