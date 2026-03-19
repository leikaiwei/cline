import React from "react"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { localize } from "@/utils/localization"
import { updateSetting } from "./utils/settingsHandlers"

const TerminalOutputLineLimitSlider: React.FC = () => {
	const { terminalOutputLineLimit, preferredLanguage } = useExtensionState()

	const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(event.target.value, 10)
		updateSetting("terminalOutputLineLimit", value)
	}

	return (
		<div style={{ marginBottom: 15 }}>
			<label htmlFor="terminal-output-limit" style={{ fontWeight: "500", display: "block", marginBottom: 5 }}>
				{localize(preferredLanguage, "Terminal output limit", "终端输出上限")}
			</label>
			<div style={{ display: "flex", alignItems: "center" }}>
				<input
					id="terminal-output-limit"
					max="5000"
					min="100"
					onChange={handleSliderChange}
					step="100"
					style={{ flexGrow: 1, marginRight: "1rem" }}
					type="range"
					value={terminalOutputLineLimit ?? 500}
				/>
				<span>{terminalOutputLineLimit ?? 500}</span>
			</div>
			<p style={{ fontSize: "12px", color: "var(--vscode-descriptionForeground)", margin: "5px 0 0 0" }}>
				{localize(
					preferredLanguage,
					"Maximum number of lines to include in terminal output when executing commands. When exceeded, lines will be removed from the middle, saving tokens.",
					"执行命令时可保留的终端输出最大行数。超过后会从中间裁剪，以节省 token。",
				)}
			</p>
		</div>
	)
}

export default TerminalOutputLineLimitSlider
