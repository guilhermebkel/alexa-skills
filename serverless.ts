import { AWS } from "@serverless/typescript"

import ServerlessUtil from "@/Utils/ServerlessUtil"

const serverlessConfiguration: AWS = {
	service: "alexa-skills",
	frameworkVersion: "3",
	plugins: ["serverless-esbuild", "serverless-offline", "serverless-alexa-skills"],
	provider: {
		name: "aws",
		runtime: "nodejs14.x",
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
			NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000"
		}
	},
	functions: ServerlessUtil.functions,
	package: {
		individually: true
	},
	custom: {
		esbuild: {
			bundle: true,
			minify: false,
			sourcemap: true,
			exclude: ["aws-sdk"],
			target: "node14",
			define: { "require.resolve": undefined },
			platform: "node",
			concurrency: 10
		},
		...ServerlessUtil.custom
	}
}

module.exports = serverlessConfiguration
