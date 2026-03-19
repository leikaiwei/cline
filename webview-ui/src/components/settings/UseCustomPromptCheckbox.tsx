import { VSCodeCheckbox } from "@vscode/webview-ui-toolkit/react"
import React, { useCallback, useEffect, useState } from "react"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { localize } from "@/utils/localization"
import { updateSetting } from "./utils/settingsHandlers"

interface CustomPromptCheckboxProps {
	providerId: string
}

/**
 * 控制是否启用紧凑提示词。
 */
const UseCustomPromptCheckbox: React.FC<CustomPromptCheckboxProps> = ({ providerId }) => {
	const { customPrompt, preferredLanguage } = useExtensionState()
	const [isCompactPromptEnabled, setIsCompactPromptEnabled] = useState<boolean>(customPrompt === "compact")

	useEffect(() => {
		setIsCompactPromptEnabled(customPrompt === "compact")
	}, [customPrompt])

	const toggleCompactPrompt = useCallback((isChecked: boolean) => {
		setIsCompactPromptEnabled(isChecked)
		updateSetting("customPrompt", isChecked ? "compact" : "")
	}, [])

	return (
		<div id={providerId}>
			<VSCodeCheckbox checked={isCompactPromptEnabled} onChange={() => toggleCompactPrompt(!isCompactPromptEnabled)}>
				{localize(preferredLanguage, "Use compact prompt", "使用压缩提示词（全局生效）")}
			</VSCodeCheckbox>
			<div className="text-xs text-description">
				{localize(preferredLanguage, "A system prompt optimized for smaller context window (e.g. 8k or less).", "针对较小上下文窗口优化的系统提示词（例如 8k 及以下）。")}
				<div className="text-error flex align-middle">
					<i className="codicon codicon-x" />
					{localize(preferredLanguage, "Does not support Mcp and Focus Chain", "不支持 MCP 和 Focus Chain")}
				</div>
			</div>
		</div>
	)
}

export default UseCustomPromptCheckbox
