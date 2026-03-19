import { Button } from "@/components/ui/button"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { localize } from "@/utils/localization"
import { getEnvironmentColor } from "@/utils/environmentColors"
import type { Environment } from "../../../../src/shared/config-types"

const ENV_DISPLAY_NAMES: Record<Environment, string> = {
	production: "Production",
	staging: "Staging",
	local: "Local",
	selfHosted: "Self-hosted",
}

type ViewHeaderProps = {
	title: string
	onDone: () => void
	showEnvironmentSuffix?: boolean
	environment?: Environment
}

const ViewHeader = ({ title, onDone, showEnvironmentSuffix, environment }: ViewHeaderProps) => {
	const { preferredLanguage } = useExtensionState()
	const showSubtext = showEnvironmentSuffix && environment && environment !== "production"
	const capitalizedEnv = environment ? ENV_DISPLAY_NAMES[environment] : ""
	const titleColor = getEnvironmentColor(environment)
	const environmentLabel = localize(preferredLanguage, `${capitalizedEnv} environment`, `${capitalizedEnv} 环境`)
	const doneLabel = localize(preferredLanguage, "Done", "完成")

	return (
		<div className="flex justify-between items-center py-2.5 px-5 mb-[17px]">
			<div className="relative">
				<h3 className="m-0 text-lg font-normal" style={{ color: titleColor }}>
					{title}
				</h3>
				{showSubtext && (
					<span className="absolute left-0 top-8 -translate-y-1 text-xs text-description whitespace-nowrap">
						{environmentLabel}
					</span>
				)}
			</div>
			<Button size="header" onClick={onDone}>
				{doneLabel}
			</Button>
		</div>
	)
}

export default ViewHeader
