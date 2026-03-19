import { VSCodeCheckbox, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { localize } from "@/utils/localization"
import PreferredLanguageSetting from "../PreferredLanguageSetting"
import Section from "../Section"
import { updateSetting } from "../utils/settingsHandlers"

interface GeneralSettingsSectionProps {
	renderSectionHeader: (tabId: string) => JSX.Element | null
}

const GeneralSettingsSection = ({ renderSectionHeader }: GeneralSettingsSectionProps) => {
	const { telemetrySetting, remoteConfigSettings, preferredLanguage } = useExtensionState()

	return (
		<div>
			{renderSectionHeader("general")}
			<Section>
				<PreferredLanguageSetting />

				<div className="mb-[5px]">
					<Tooltip>
						<TooltipContent hidden={remoteConfigSettings?.telemetrySetting === undefined}>
							{localize(preferredLanguage, "This setting is managed by your organization's remote configuration", "此设置由组织的远程配置统一管理")}
						</TooltipContent>
						<TooltipTrigger asChild>
							<div className="flex items-center gap-2 mb-[5px]">
								<VSCodeCheckbox
									checked={telemetrySetting !== "disabled"}
									disabled={remoteConfigSettings?.telemetrySetting === "disabled"}
									onChange={(e: any) => {
										const checked = e.target.checked === true
										updateSetting("telemetrySetting", checked ? "enabled" : "disabled")
									}}>
									{localize(preferredLanguage, "Allow error and usage reporting", "允许发送错误与使用情况报告")}
								</VSCodeCheckbox>
								{!!remoteConfigSettings?.telemetrySetting && (
									<i className="codicon codicon-lock text-description text-sm" />
								)}
							</div>
						</TooltipTrigger>
					</Tooltip>

					<p className="text-sm mt-[5px] text-description">
						{localize(
							preferredLanguage,
							"Help improve Cline by sending usage data and error reports. No code, prompts, or personal information are ever sent. See our ",
							"发送使用数据与错误报告，帮助改进 Cline。不会上传代码、提示词或个人信息。详情请查看 ",
						)}
						<VSCodeLink
							className="text-inherit"
							href="https://docs.cline.bot/more-info/telemetry"
							style={{ fontSize: "inherit", textDecoration: "underline" }}>
							{localize(preferredLanguage, "telemetry overview", "遥测说明")}
						</VSCodeLink>{" "}
						{localize(preferredLanguage, "and", "与")}{" "}
						<VSCodeLink
							className="text-inherit"
							href="https://cline.bot/privacy"
							style={{ fontSize: "inherit", textDecoration: "underline" }}>
							{localize(preferredLanguage, "privacy policy", "隐私政策")}
						</VSCodeLink>{" "}
						{localize(preferredLanguage, "for more details.", "了解更多。")}
					</p>
				</div>
			</Section>
		</div>
	)
}

export default GeneralSettingsSection
