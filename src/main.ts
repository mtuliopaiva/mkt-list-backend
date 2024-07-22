import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as webpack from 'webpack';
import * as webpackDevMiddleware from 'webpack-dev-middleware';
import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpackConfig from '../webpack.config';
import * as dotenv from 'dotenv'

dotenv.config()


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
      }),
    );
    app.use(webpackHotMiddleware(compiler));
  }

  const config = new DocumentBuilder()
    .setTitle('API - Market List')
    .setDescription('API documentation for the application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(3000);
}
bootstrap();
