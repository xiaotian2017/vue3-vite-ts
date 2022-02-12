import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import * as ElIcons from '@element-plus/icons';
import { App } from 'vue';

export default {
  install(app: App) {
    app.use(ElementPlus, {
      locale: zhCn,
    });

    let iconName: keyof typeof ElIcons;
    for (iconName in ElIcons) {
      if (Object.prototype.hasOwnProperty.call(ElIcons, iconName)) {
        app.component(iconName, ElIcons[iconName]);
      }
    }
  },
};
