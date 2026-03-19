import { VSCodeButton, VSCodeLink } from "@vscode/webview-ui-toolkit/react"
import { useClineSignIn } from "@/context/ClineAuthContext"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { localize } from "@/utils/localization"
import ClineLogoVariable from "../../assets/ClineLogoVariable"

// export const AccountWelcomeView = () => (
// 	<div className="flex flex-col items-center pr-3 gap-2.5">
// 		<ClineLogoWhite className="size-16 mb-4" />
export const AccountWelcomeView = () => {
	const { environment, preferredLanguage } = useExtensionState()
	const { isLoginLoading, handleSignIn } = useClineSignIn()

	return (
		<div className="flex flex-col items-center gap-2.5">
			<ClineLogoVariable className="size-16 mb-4" environment={environment} />

			<p>
				{localize(
					preferredLanguage,
					"Sign up for an account to get access to the latest models, billing dashboard to view usage and credits, and more upcoming features.",
					"注册账户即可使用最新模型、查看用量和额度的计费面板，以及后续更多新功能。",
				)}
			</p>

			<VSCodeButton className="w-full mb-4" disabled={isLoginLoading} onClick={handleSignIn}>
				{localize(preferredLanguage, "Sign up with Cline", "使用 Cline 注册")}
				{isLoginLoading && (
					<span className="ml-1 animate-spin">
						<span className="codicon codicon-refresh"></span>
					</span>
				)}
			</VSCodeButton>

			<p className="text-(--vscode-descriptionForeground) text-xs text-center m-0">
				{localize(preferredLanguage, "By continuing, you agree to the", "继续即表示你同意")} <VSCodeLink href="https://cline.bot/tos">{localize(preferredLanguage, "Terms of Service", "服务条款")}</VSCodeLink> {localize(preferredLanguage, "and", "和")}
				<VSCodeLink href="https://cline.bot/privacy">{localize(preferredLanguage, "Privacy Policy.", "隐私政策。")}</VSCodeLink>
			</p>
		</div>
	)
}
