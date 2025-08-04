import Theme, { Theme as ThemeType } from "@/core/theme";
import Color from "color";
import { useMemo } from "react";

type IColors = CustomizedColors;

export function adaptLegacyColors(colors: Partial<CustomizedColors>): CustomizedColors {
    const primary = colors.primary ?? '#6200EE';
    const text = colors.text ?? '#000000';
    const card = colors.card ?? '#FFFFFF';
    const background = colors.background ?? '#FFFFFF';
    
    return {
        primary,
        text,
        card,
        background,
        border: colors.border ?? '#E0E0E0',
        notification: colors.notification ?? card,
        textSecondary: colors.textSecondary ?? Color(text).alpha(0.7).toString(),
        pageBackground: colors.pageBackground ?? background,
        appBar: colors.appBar ?? primary,
        appBarText: colors.appBarText ?? text,
        musicBar: colors.musicBar ?? card,
        musicBarText: colors.musicBarText ?? text,
        divider: colors.divider ?? Color(text).alpha(0.1).toString(),
        textHighlight: colors.textHighlight ?? primary,
        shadow: colors.shadow ?? '#000000',
        listActive: colors.listActive ?? Color(primary).alpha(0.1).toString(),
        mask: colors.mask ?? Color(text).alpha(0.2).toString(),
        placeholder: colors.placeholder ?? Color(text).alpha(0.1).toString(),
        success: colors.success ?? '#08A34C',
        danger: colors.danger ?? '#FC5F5F',
        info: colors.info ?? '#0A95C8',
        backdrop: colors.backdrop ?? card,
        tabBar: colors.tabBar ?? card,
        surfaceVariant: colors.surfaceVariant ?? card,
        onSurfaceVariant: colors.onSurfaceVariant ?? text,
        outline: colors.outline ?? Color(text).alpha(0.3).toString(),
        outlineVariant: colors.outlineVariant ?? Color(text).alpha(0.1).toString(),
        tertiary: colors.tertiary ?? Color(primary).lighten(0.2).toString(),
        error: colors.error ?? '#FC5F5F',
        secondary: colors.secondary ?? Color(primary).lighten(0.1).toString(),
        onSurface: colors.onSurface ?? text,
        primaryContainer: colors.primaryContainer ?? Color(primary).alpha(0.1).toString(),
        onPrimaryContainer: colors.onPrimaryContainer ?? text
    };
}

export interface CustomizedColors {
    /** 主色调 */
    primary: string;
    /** 背景色 */
    background: string;
    /** 卡片背景色 */
    card: string;
    /** 文字颜色 */
    text: string;
    /** 边框颜色 */
    border: string;
    /** 通知背景色 */
    notification: string;
    /** 副标题文字颜色 */
    textSecondary: string;
    /** 页面背景 */
    pageBackground: string;
    /** 标题栏颜色 */
    appBar: string;
    /** 标题栏字体颜色 */
    appBarText: string;
    /** 音乐栏颜色 */
    musicBar: string;
    /** 音乐栏字体颜色 */
    musicBarText: string;
    /** 分割线 */
    divider: string;
    /** 高亮文本颜色 */
    textHighlight: string;
    /** 阴影 */
    shadow: string;
    /** 高亮颜色 */
    listActive: string;
    /** 遮罩层颜色 */
    mask: string;
    /** 输入框背景色 */
    placeholder: string;
    /** 成功状态颜色 */
    success: string;
    /** 危险状态颜色 */
    danger: string;
    /** 信息状态颜色 */
    info: string;
    /** 弹窗、浮层、菜单背景色 */
    backdrop: string;
    /** paneltabbar 背景色 */
    tabBar: string;
    /** Material You 特定属性 */
    surfaceVariant: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    tertiary: string;
    error: string;
    secondary: string;
    onSurface: string;
    primaryContainer: string;
    onPrimaryContainer: string;
}

export default function useColors() {
    const theme = Theme.useTheme();
    const colors = theme.colors;

    const cColors: CustomizedColors = useMemo(() => {
        const defaultColors = {
            textHighlight: colors.primary,
            listActive: Color(colors.primary).alpha(0.1).toString(),
            mask: Color(colors.text).alpha(0.2).toString(),
            backdrop: colors.card,
            tabBar: colors.card,
            placeholder: Color(colors.text).alpha(0.1).toString(),
            success: "#08A34C",
            danger: "#FC5F5F",
            info: "#0A95C8",
            textSecondary: Color(colors.text).alpha(0.7).toString(),
            pageBackground: colors.background,
            appBar: colors.primary,
            appBarText: colors.text,
            musicBar: colors.card,
            musicBarText: colors.text,
            divider: Color(colors.text).alpha(0.1).toString(),
            shadow: "#000000",
            surfaceVariant: colors.card,
            onSurfaceVariant: colors.text,
            outline: Color(colors.text).alpha(0.3).toString(),
            outlineVariant: Color(colors.text).alpha(0.1).toString(),
            tertiary: Color(colors.primary).lighten(0.2).toString(),
            error: "#FC5F5F",
            secondary: Color(colors.primary).lighten(0.1).toString(),
            onSurface: colors.text,
            primaryContainer: Color(colors.primary).alpha(0.1).toString(),
            onPrimaryContainer: colors.text
        };

        return {
            ...defaultColors,
            ...colors
        };
    }, [colors]);

    return cColors;
}
