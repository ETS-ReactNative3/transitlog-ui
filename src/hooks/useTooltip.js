import {helpText as translateHelpText} from "../helpers/text";
import {useObserver} from "mobx-react-lite";
import {languageState} from "../stores/UIStore";

/**
 * Returns a tooltipProps object with one property; title.
 * Translates the helpText argument with to the languages/help files.
 */

export const useTooltip = (helpText) => {
  return useObserver(() => {
    const selectedLanguage = languageState.language;
    const translatedText = translateHelpText(helpText, selectedLanguage);

    return {
      title: translatedText,
    };
  });
};

export const applyTooltip = (helpText) => {
  const translatedText = translateHelpText(helpText);

  return {
    title: translatedText,
  };
};
