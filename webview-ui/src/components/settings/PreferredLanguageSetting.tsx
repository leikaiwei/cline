import { DEFAULT_LANGUAGE_DISPLAY, languageOptions } from "@shared/Languages"
import { VSCodeDropdown, VSCodeOption } from "@vscode/webview-ui-toolkit/react"
import React from "react"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { localize } from "@/utils/localization"
import { updateSetting } from "./utils/settingsHandlers"

const PreferredLanguageSetting: React.FC = () => {
	const { preferredLanguage } = useExtensionState()
	const settingLabel = localize(preferredLanguage, "Preferred Language", "偏好语言")
	const settingDescription = localize(
		preferredLanguage,
		"The language that Cline should use for communication.",
		"Cline 对话与界面标签优先使用的语言。",
	)

	const handleLanguageChange = (newLanguage: string) => {
		updateSetting("preferredLanguage", newLanguage)
	}

	return (
		<div style={{}}>
			<label className="block mb-1 text-base font-medium" htmlFor="preferred-language-dropdown">
				{settingLabel}
			</label>
			<VSCodeDropdown
				currentValue={preferredLanguage || DEFAULT_LANGUAGE_DISPLAY}
				id="preferred-language-dropdown"
				onChange={(e: any) => {
					handleLanguageChange(e.target.value)
				}}
				style={{ width: "100%" }}>
				{languageOptions.map((option) => (
					<VSCodeOption key={option.key} value={option.display}>
						{option.display}
					</VSCodeOption>
				))}
			</VSCodeDropdown>
			<p className="text-sm text-description mt-1">{settingDescription}</p>
		</div>
	)
}

export default React.memo(PreferredLanguageSetting)
