import Config from "@/core/appConfig";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";
import { DarkTheme as _DarkTheme, DefaultTheme as _DefaultTheme } from "@react-navigation/native";
import { GlobalState } from "@/utils/stateMapper";
import { CustomizedColors, adaptLegacyColors } from "@/hooks/useColors";

export interface Theme {
  id: string;
  dark: boolean;
  colors: CustomizedColors;
}
import Color from "color";

// Material You Light Theme
export const materialYouLightTheme = {
  id: "material-you-light",
  dark: false,
  colors: {
    ...MD3LightTheme.colors,
    background: "transparent",
    text: MD3LightTheme.colors.onSurface,
    textSecondary: Color(MD3LightTheme.colors.onSurface).alpha(0.7).toString(),
    textHighlight: MD3LightTheme.colors.primary,
    primary: MD3LightTheme.colors.primary,
    pageBackground: MD3LightTheme.colors.background,
    shadow: MD3LightTheme.colors.shadow,
    appBar: MD3LightTheme.colors.primaryContainer,
    appBarText: MD3LightTheme.colors.onPrimaryContainer,
    musicBar: MD3LightTheme.colors.surfaceVariant,
    musicBarText: MD3LightTheme.colors.onSurfaceVariant,
    divider: MD3LightTheme.colors.outline,
    listActive: Color(MD3LightTheme.colors.primary).alpha(0.1).toString(),
    mask: Color(MD3LightTheme.colors.onSurface).alpha(0.2).toString(),
    backdrop: MD3LightTheme.colors.surface,
    tabBar: MD3LightTheme.colors.surfaceVariant,
    placeholder: MD3LightTheme.colors.outlineVariant,
    success: MD3LightTheme.colors.tertiary,
    danger: MD3LightTheme.colors.error,
    info: MD3LightTheme.colors.secondary,
    card: MD3LightTheme.colors.surface,
    notification: MD3LightTheme.colors.surfaceVariant,
    border: MD3LightTheme.colors.outline,
  },
};

// Material You Dark Theme
export const materialYouDarkTheme = {
  id: "material-you-dark",
  dark: true,
  colors: {
    ...MD3DarkTheme.colors,
    background: "transparent",
    text: MD3DarkTheme.colors.onSurface,
    textSecondary: Color(MD3DarkTheme.colors.onSurface).alpha(0.7).toString(),
    primary: MD3DarkTheme.colors.primary,
    pageBackground: MD3DarkTheme.colors.background,
    shadow: MD3DarkTheme.colors.shadow,
    appBar: MD3DarkTheme.colors.primaryContainer,
    appBarText: MD3DarkTheme.colors.onPrimaryContainer,
    musicBar: MD3DarkTheme.colors.surfaceVariant,
    musicBarText: MD3DarkTheme.colors.onSurfaceVariant,
    divider: MD3DarkTheme.colors.outline,
    listActive: Color(MD3DarkTheme.colors.primary).alpha(0.1).toString(),
    mask: Color(MD3DarkTheme.colors.onSurface).alpha(0.2).toString(),
    backdrop: MD3DarkTheme.colors.surface,
    tabBar: MD3DarkTheme.colors.surfaceVariant,
    placeholder: MD3DarkTheme.colors.outlineVariant,
    success: MD3DarkTheme.colors.tertiary,
    danger: MD3DarkTheme.colors.error,
    info: MD3DarkTheme.colors.secondary,
    card: MD3DarkTheme.colors.surface,
    notification: MD3DarkTheme.colors.surfaceVariant,
    border: MD3DarkTheme.colors.outline,
  },
};

// 保留原有主题配置
export const lightTheme = {
  id: "p-light",
  ..._DefaultTheme,
  colors: {
    ..._DefaultTheme.colors,
    background: "transparent",
    text: "#333333",
    textSecondary: Color("#333333").alpha(0.7).toString(),
    primary: "#f17d34",
    pageBackground: "#fafafa",
    shadow: "#000",
    appBar: "#f17d34",
    appBarText: "#fefefe",
    musicBar: "#f2f2f2",
    musicBarText: "#333333",
    divider: "rgba(0,0,0,0.1)",
    listActive: "rgba(0,0,0,0.1)",
    mask: "rgba(51,51,51,0.2)",
    backdrop: "#f0f0f0",
    tabBar: "#f0f0f0",
    placeholder: "#eaeaea",
    success: "#08A34C",
    danger: "#FC5F5F",
    info: "#0A95C8",
    card: "#e2e2e288",
    notification: "#f0f0f0",
    border: "rgba(0,0,0,0.1)",
  },
};

export const darkTheme = {
  id: "p-dark",
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    background: "transparent",
    text: "#fcfcfc",
    textSecondary: Color("#fcfcfc").alpha(0.7).toString(),
    primary: "#3FA3B5",
    pageBackground: "#202020",
    shadow: "#999",
    appBar: "#262626",
    appBarText: "#fcfcfc",
    musicBar: "#262626",
    musicBarText: "#fcfcfc",
    divider: "rgba(255,255,255,0.1)",
    listActive: "rgba(255,255,255,0.1)",
    mask: "rgba(33,33,33,0.8)",
    backdrop: "#303030",
    tabBar: "#303030",
    placeholder: "#424242",
    success: "#08A34C",
    danger: "#FC5F5F",
    info: "#0A95C8",
    card: "#33333388",
    notification: "#303030",
    border: "rgba(255,255,255,0.1)",
  },
};

interface IBackgroundInfo {
  url?: string;
  blur?: number;
  opacity?: number;
}

const themeStore = new GlobalState(darkTheme);
const backgroundStore = new GlobalState<IBackgroundInfo | null>(null);

function setup() {
  const currentTheme = Config.getConfig("theme.selectedTheme") ?? "p-dark";

  if (currentTheme === "p-dark") {
    themeStore.setValue(darkTheme);
  } else if (currentTheme === "p-light") {
    themeStore.setValue(lightTheme);
  } else if (currentTheme === "material-you-light") {
    themeStore.setValue(materialYouLightTheme);
  } else if (currentTheme === "material-you-dark") {
    themeStore.setValue(materialYouDarkTheme);
  } else {
    themeStore.setValue({
      id: currentTheme,
      dark: true,
      colors: {
        ...darkTheme.colors,
        ...adaptLegacyColors(Config.getConfig("theme.colors") as Partial<CustomizedColors>)
      } as CustomizedColors,
    });
  }

  const bgUrl = Config.getConfig("theme.background");
  const bgBlur = Config.getConfig("theme.backgroundBlur");
  const bgOpacity = Config.getConfig("theme.backgroundOpacity");

  backgroundStore.setValue({
    url: bgUrl,
    blur: bgBlur ?? 20,
    opacity: bgOpacity ?? 0.6,
  });
}

function setTheme(
  themeName: string,
  extra?: {
    colors?: Partial<CustomizedColors>;
    background?: IBackgroundInfo;
  },
) {
  if (themeName === "p-light") {
    themeStore.setValue(lightTheme);
  } else if (themeName === "p-dark") {
    themeStore.setValue(darkTheme);
  } else if (themeName === "material-you-light") {
    themeStore.setValue(materialYouLightTheme);
  } else if (themeName === "material-you-dark") {
    themeStore.setValue(materialYouDarkTheme);
  } else {
    themeStore.setValue({
      id: themeName,
      dark: true,
      colors: {
        ...darkTheme.colors,
        ...adaptLegacyColors(extra?.colors ?? {}),
      } as CustomizedColors,
    });
  }

  Config.setConfig("theme.selectedTheme", themeName);
  Config.setConfig("theme.colors", adaptLegacyColors(themeStore.getValue().colors));

  if (extra?.background) {
    const currentBg = backgroundStore.getValue();
    let newBg: IBackgroundInfo = {
      blur: 20,
      opacity: 0.6,
      ...(currentBg ?? {}),
      url: undefined,
    };
    if (typeof extra.background.blur === "number") {
      newBg.blur = extra.background.blur;
    }
    if (typeof extra.background.opacity === "number") {
      newBg.opacity = extra.background.opacity;
    }
    if (extra.background.url) {
      newBg.url = extra.background.url;
    }

    Config.setConfig("theme.background", newBg.url);
    Config.setConfig("theme.backgroundBlur", newBg.blur);
    Config.setConfig("theme.backgroundOpacity", newBg.opacity);

    backgroundStore.setValue(newBg);
  }
}

// 保留原有setColors和setBackground函数
function setColors(colors: Partial<CustomizedColors>) {
  const currentTheme = themeStore.getValue();
  themeStore.setValue({
    ...currentTheme,
    colors: {
      ...currentTheme.colors,
      ...adaptLegacyColors(colors),
    } as CustomizedColors,
  });
  Config.setConfig("theme.colors", adaptLegacyColors(themeStore.getValue().colors));
}

function setBackground(background: IBackgroundInfo) {
  backgroundStore.setValue(background);
  Config.setConfig("theme.background", background.url);
  Config.setConfig("theme.backgroundBlur", background.blur);
  Config.setConfig("theme.backgroundOpacity", background.opacity);
}

const configableColorKey: Array<keyof CustomizedColors> = [
  "primary",
  "text",
  "appBar",
  "appBarText",
  "musicBar",
  "musicBarText",
  "pageBackground",
  "backdrop",
  "card",
  "placeholder",
  "tabBar",
  "notification",
];

const Theme = {
  setup,
  setTheme,
  setBackground,
  setColors,
  useTheme: themeStore.useValue,
  getTheme: themeStore.getValue,
  useBackground: backgroundStore.useValue,
  configableColorKey,
};

export default Theme;
