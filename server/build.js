import webpack from 'webpack';
import config from '../webpack.config.prod';

webpack(config).run((err, stats) => {
  if (err){
    console.log(err);
    return 1;
  }
});
