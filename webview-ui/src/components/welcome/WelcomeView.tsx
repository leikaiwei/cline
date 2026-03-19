import { BooleanRequest, EmptyRequest } from "@shared/proto/cline/common"
import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { memo, useEffect, useState } from "react"
import ClineLogoWhite from "@/assets/ClineLogoWhite"
import ApiOptions from "@/components/settings/ApiOptions"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { AccountServiceClient, StateServiceClient } from "@/services/grpc-client"
import { localize } from "@/utils/localization"
import { validateApiConfiguration } from "@/utils/validate"

const WelcomeView = memo(() => {
	const { apiConfiguration, mode, preferredLanguage } = useExtensionState()
	const [apiErrorMessage, setApiErrorMessage] = useState<string | undefined>(undefined)
	const [showApiOptions, setShowApiOptions] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const disableLetsGoButton = apiErrorMessage != null

	const handleLogin = () => {
		setIsLoading(true)
		AccountServiceClient.accountLoginClicked(EmptyRequest.create())
			.catch((err) => console.error("Failed to get login URL:", err))
			.finally(() => {
				setIsLoading(false)
			})
	}

	const handleSubmit = async () => {
		try {
			await StateServiceClient.setWelcomeViewCompleted(BooleanRequest.create({ value: true }))
		} catch (error) {
			console.error("Failed to update API configuration or complete welcome view:", error)
		}
	}

	useEffect(() => {
		setApiErrorMessage(validateApiConfiguration(mode, apiConfiguration))
	}, [apiConfiguration, mode])

	return (
		<div className="fixed inset-0 p-0 flex flex-col">
			<div className="h-full px-5 overflow-auto flex flex-col gap-2.5">
				<h2 className="text-lg font-semibold">{localize(preferredLanguage, "Hi, I'm Cline", "你好，我是 Cline")}</h2>
				<div className="flex justify-center my-5">
					<ClineLogoWhite className="size-16" />
				</div>
				<p>
					{localize(preferredLanguage, "I can do all kinds of tasks thanks to breakthroughs in ", "得益于 ")}
					<VSCodeLink className="inline" href="https://www.anthropic.com/claude/sonnet">
						Claude 4.6 Sonnet's
					</VSCodeLink>
					{localize(
						preferredLanguage,
						" agentic coding capabilities and access to tools that let me create & edit files, explore complex projects, use a browser, and execute terminal commands ",
						" 的代理式编码能力，以及创建/编辑文件、探索复杂项目、使用浏览器、执行终端命令等工具能力 ",
					)}
					<i>{localize(preferredLanguage, "(with your permission, of course)", "（当然，需要你的授权）")}</i>
					{localize(preferredLanguage, ". I can even use MCP to create new tools and extend my own capabilities.", "。我还可以借助 MCP 创建新工具，扩展自己的能力。")}
				</p>

				<p className="text-(--vscode-descriptionForeground)">
					{localize(
						preferredLanguage,
						"Sign up for an account to get started for free, or use an API key that provides access to models like Claude Sonnet.",
						"注册账户即可免费开始使用，或使用可访问 Claude Sonnet 等模型的 API Key。",
					)}
				</p>

				<VSCodeButton appearance="primary" className="w-full mt-1" disabled={isLoading} onClick={handleLogin}>
					{localize(preferredLanguage, "Get Started for Free", "免费开始使用")}
					{isLoading && (
						<span className="ml-1 animate-spin">
							<span className="codicon codicon-refresh" />
						</span>
					)}
				</VSCodeButton>

				{!showApiOptions && (
					<VSCodeButton
						appearance="secondary"
						className="mt-2.5 w-full"
						onClick={() => setShowApiOptions(!showApiOptions)}>
						{localize(preferredLanguage, "Use your own API key", "使用自己的 API Key")}
					</VSCodeButton>
				)}

				<div className="mt-4.5">
					{showApiOptions && (
						<div>
							<ApiOptions currentMode={mode} showModelOptions={false} />
							<VSCodeButton className="mt-0.75" disabled={disableLetsGoButton} onClick={handleSubmit}>
								{localize(preferredLanguage, "Let's go!", "开始吧！")}
							</VSCodeButton>
						</div>
					)}
				</div>
			</div>
		</div>
	)
})

export default WelcomeView
