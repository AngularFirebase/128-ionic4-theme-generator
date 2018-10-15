import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import * as Color from 'color';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private storage: Storage
  ) {
    storage.get('theme').then(cssText => {
      this.setGlobalCSS(cssText);
    });
  }

  // Override all global variables with a new theme
  setTheme(theme) {
    const cssText = CSSTextGenerator(theme);
    this.setGlobalCSS(cssText);
    this.storage.set('theme', cssText);
  }

  // Define a single CSS variable
  setVariable(name, value) {
    this.document.documentElement.style.setProperty(name, value);
  }

  private setGlobalCSS(css: string) {
    this.document.documentElement.style.cssText = css;
  }

  get storedTheme() {
    return this.storage.get('theme');
  }
}

const defaults = {
  primary: '#3880ff',
  secondary: '#0cd1e8',
  tertiary: '#7044ff',
  success: '#10dc60',
  warning: '#ffce00',
  danger: '#f04141',
  dark: '#222428',
  medium: '#989aa2',
  light: '#f4f5f8'
};

function CSSTextGenerator(colors) {
  colors = { ...defaults, ...colors };

  const {
    primary,
    secondary,
    tertiary,
    success,
    warning,
    danger,
    dark,
    medium,
    light
  } = colors;

  const shadeRatio = 0.1;
  const tintRatio = 0.1;

  return `
    --ion-color-base: ${light};
    --ion-color-contrast: ${dark};
    --ion-background-color: ${light};
    --ion-text-color: ${dark};
    --ion-toolbar-background-color: ${contrast(light, 0.1)};
    --ion-toolbar-text-color: ${contrast(dark, 0.1)};
    --ion-item-background-color: ${contrast(light, 0.3)};
    --ion-item-text-color: ${contrast(dark, 0.3)};

    --ion-color-primary: ${primary};
    --ion-color-primary-rgb: ${hex2rgb(primary)};
    --ion-color-primary-contrast: ${contrast(primary)};
    --ion-color-primary-contrast-rgb: ${hex2rgb(contrast(primary))};
    --ion-color-primary-shade:  ${Color(primary).darken(shadeRatio)};
    --ion-color-primary-tint:  ${Color(primary).lighten(tintRatio)};

    --ion-color-secondary: ${secondary};
    --ion-color-secondary-rgb: ${hex2rgb(secondary)};
    --ion-color-secondary-contrast: ${contrast(secondary)};
    --ion-color-secondary-contrast-rgb: ${hex2rgb(contrast(secondary))};
    --ion-color-secondary-shade:  ${Color(secondary).darken(shadeRatio)};
    --ion-color-secondary-tint: ${Color(secondary).lighten(tintRatio)};

    --ion-color-tertiary:  ${tertiary};
    --ion-color-tertiary-rgb: ${hex2rgb(tertiary)};
    --ion-color-tertiary-contrast: ${contrast(tertiary)};
    --ion-color-tertiary-contrast-rgb:  ${hex2rgb(contrast(tertiary))};
    --ion-color-tertiary-shade: ${Color(tertiary).darken(shadeRatio)};
    --ion-color-tertiary-tint:  ${Color(tertiary).lighten(tintRatio)};

    --ion-color-success: ${success};
    --ion-color-success-rgb:  ${hex2rgb(success)};
    --ion-color-success-contrast: ${contrast(success)};
    --ion-color-success-contrast-rgb:  ${hex2rgb(contrast(success))};
    --ion-color-success-shade: ${Color(success).darken(shadeRatio)};
    --ion-color-success-tint: ${Color(success).lighten(tintRatio)};

    --ion-color-warning: ${warning};
    --ion-color-warning-rgb: ${hex2rgb(warning)};
    --ion-color-warning-contrast: ${contrast(warning)};
    --ion-color-warning-contrast-rgb:  ${hex2rgb(contrast(warning))};
    --ion-color-warning-shade: ${Color(warning).darken(shadeRatio)};
    --ion-color-warning-tint: ${Color(warning).lighten(tintRatio)};

    --ion-color-danger: ${danger};
    --ion-color-danger-rgb: ${hex2rgb(danger)};
    --ion-color-danger-contrast: ${contrast(danger)};
    --ion-color-danger-contrast-rgb:  ${hex2rgb(contrast(danger))};
    --ion-color-danger-shade: ${Color(danger).darken(shadeRatio)};
    --ion-color-danger-tint: ${Color(danger).lighten(tintRatio)};

    --ion-color-dark: ${dark};
    --ion-color-dark-rgb: ${hex2rgb(dark)};
    --ion-color-dark-contrast: ${contrast(dark)};
    --ion-color-dark-contrast-rgb:  ${hex2rgb(contrast(dark))};
    --ion-color-dark-shade: ${Color(dark).darken(shadeRatio)};
    --ion-color-dark-tint: ${Color(dark).lighten(tintRatio)};

    --ion-color-medium: ${medium};
    --ion-color-medium-rgb:  ${hex2rgb(medium)};
    --ion-color-medium-contrast: ${contrast(medium)};
    --ion-color-medium-contrast-rgb: ${hex2rgb(contrast(medium))};
    --ion-color-medium-shade: ${Color(medium).darken(shadeRatio)};
    --ion-color-medium-tint: ${Color(medium).lighten(tintRatio)};

    --ion-color-light: ${light};
    --ion-color-light-rgb: ${hex2rgb(light)};
    --ion-color-light-contrast: $${contrast(light)};
    --ion-color-light-contrast-rgb: ${hex2rgb(contrast(light))};
    --ion-color-light-shade: ${Color(light).darken(shadeRatio)};
    --ion-color-light-tint: ${Color(light).lighten(tintRatio)};`;
}

function contrast(color, ratio = 0.8) {
  color = Color(color);
  return color.isDark() ? color.lighten(ratio) : color.darken(ratio);
}

// hex2rgb, modified from 
// https://gist.github.com/ecasilla/f8297086161a5cd94bf3
// to return comma separated string or null for invalid color
//
function hex2rgb (hex){
  if(/^#/.test(hex)){
    hex = hex.slice(1);
  }
  if(hex.length !== 3 && hex.length !== 6 )
    return null;
  
  var digit = hex.split("");
  
  if(digit.length === 3){
    digit = [ digit[0],digit[0],digit[1],digit[1],digit[2],digit[2] ]
  }
  var r = parseInt( [digit[0],digit[1] ].join(""), 16 );
  var g = parseInt( [digit[2],digit[3] ].join(""), 16 );
  var b = parseInt( [digit[4],digit[5] ].join(""), 16 );

  if ( r ===NaN || g===NaN || b===NaN)
    return null;
  
  return "" + r + "," + g + "," + b;
}
