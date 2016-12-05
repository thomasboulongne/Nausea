import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

module.exports = {

	context: path.resolve(__dirname, '..'),
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
		'./src/main.js'
	],

	output: {
		path: __dirname,
		filename: "bundle.js",
		publicPath: "/"
	},
	resolve: {
    	root: path.resolve( __dirname, '..', 'src' ),
		extensions: [
			"",
			".vue",
			".js",
			".json",
		]
	},

	devTool: 'source-map',

	module: {
		preLoaders: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'eslint'
			}
		],
		loaders: [
			{
				test: /\.vue$/,
				exclude: /node_modules/,
				loaders: [
					"vue"
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: [
					"babel"
				]
			},
			{
				test: /\.json$/,
				exclude: /node_modules/,
				loaders: [
					"json",
				],
			},
			{
				test: /\.css$/,
				loader: 'style!css!'
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: ['style', 'css', 'sass']
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				loaders: [
					"html",
				]
			},
            {
               test: /node_modules/,
               loader: 'ify'
             },
             {
               test: /\.(glsl|frag|vert)$/,
               exclude: /node_modules/,
               loader: 'raw!glslify'
             }
		],
	},

	plugins: (
	[
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: 'body',
			filename: 'index.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			'__DEV__': JSON.stringify(true),
			'__PROD__': JSON.stringify(false)
		}),
		new webpack.ProvidePlugin({
			'Vue': 'vue',
			'THREE': 'three',
			'TweenMax': 'gsap/src/minified/TweenMax.min.js'
		}),
		new CopyWebpackPlugin(
			[
				{ from: 'static' }
			],
			{ ignore: ['.DS_Store', '.keep'] }
		)
	])
}