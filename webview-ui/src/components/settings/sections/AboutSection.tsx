import { VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { localize } from "@/utils/localization"
import Section from "../Section"

interface AboutSectionProps {
	version: string
	renderSectionHeader: (tabId: string) => JSX.Element | null
}
const AboutSection = ({ version, renderSectionHeader }: AboutSectionProps) => {
	const { preferredLanguage } = useExtensionState()

	return (
		<div>
			{renderSectionHeader("about")}
			<Section>
				<div className="flex px-4 flex-col gap-2">
					<h2 className="text-lg font-semibold">Cline v{version}</h2>
					<p>
						{localize(
							preferredLanguage,
							"An AI assistant that can use your CLI and Editor. Cline can handle complex software development tasks step-by-step with tools that let him create & edit files, explore large projects, use the browser, and execute terminal commands (after you grant permission).",
							"一个可以使用 CLI 与编辑器的 AI 助手。Cline 能借助创建/编辑文件、探索大型项目、使用浏览器以及执行终端命令等工具，逐步完成复杂的软件开发任务（在你授权后执行命令）。",
						)}
					</p>

					<h3 className="text-md font-semibold">{localize(preferredLanguage, "Community & Support", "社区与支持")}</h3>
					<p>
						<VSCodeLink href="https://x.com/cline">X</VSCodeLink>
						{" • "}
						<VSCodeLink href="https://discord.gg/cline">Discord</VSCodeLink>
						{" • "}
						<VSCodeLink href="https://www.reddit.com/r/cline/"> r/cline</VSCodeLink>
					</p>

					<h3 className="text-md font-semibold">{localize(preferredLanguage, "Development", "开发资源")}</h3>
					<p>
						<VSCodeLink href="https://github.com/cline/cline">GitHub</VSCodeLink>
						{" • "}
						<VSCodeLink href="https://github.com/cline/cline/issues"> Issues</VSCodeLink>
						{" • "}
						<VSCodeLink href="https://github.com/cline/cline/discussions/categories/feature-requests?discussions_q=is%3Aopen+category%3A%22Feature+Requests%22+sort%3Atop">
							{" "}
							{localize(preferredLanguage, "Feature Requests", "功能请求")}
						</VSCodeLink>
					</p>

					<h3 className="text-md font-semibold">{localize(preferredLanguage, "Resources", "资源")}</h3>
					<p>
						<VSCodeLink href="https://docs.cline.bot/">{localize(preferredLanguage, "Documentation", "文档")}</VSCodeLink>
						{" • "}
						<VSCodeLink href="https://cline.bot/">https://cline.bot</VSCodeLink>
					</p>
				</div>
			</Section>
		</div>
	)
}

export default AboutSection
