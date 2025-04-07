import { findByProps, findByStoreName } from '@vendetta/metro';
import { ReactNative } from '@vendetta/metro/common';
import Settings from './ui/pages/Settings';
const ImageResolver = findByProps('getAvatarDecorationURL', 'default');
const AvatarDecorationUtils = findByProps('isAnimatedAvatarDecoration');

const initVendettaPlugin = async () => {
    await Promise.all([
        initThemes(),
        injectFluxInterceptor(),
        patchSettings(),
        patchLogHook(),
        patchCommands(),
        patchJsx(),
        initVendettaObject(),
        initFetchI18nStrings(),
        initSettings(),
        initFixes(),
        patchErrorBoundary(),
        updatePlugins()
    ]).then(
        u => u.forEach(f => f && lib.unload.push(f))
    );

    window.bunny = lib;

    VdPluginManager.initPlugins()
        .then(u => lib.unload.push(u))
        .catch(() => alert("Failed to initialize Vendetta plugins"));

    initPlugins();
    updateFonts();
    logger.log("Vendetta Plugin is ready!");
};

export default initVendettaPlugin;
