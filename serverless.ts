import { AWS } from "@serverless/typescript"

import HandlerUtil from "@/Utils/HandlerUtil"

const serverlessConfiguration: AWS = {
  service: "alexa-skills",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-alexa-skills"
  ],
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
  functions: {
    ...HandlerUtil.getHandlerFunctionConfig({
      skillName: "OnePieceMangaSpoiler",
      skillId: "amzn1.ask.skill.da25faec-9e5d-42f0-a29d-67f897d1ac43"
    })
  },
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
    }
  }
}

module.exports = serverlessConfiguration
