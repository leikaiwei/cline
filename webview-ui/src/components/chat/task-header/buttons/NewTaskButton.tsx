import { XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { cn } from "@/lib/utils"
import { localize } from "@/utils/localization"

const NewTaskButton: React.FC<{
	onClick: () => void
	className?: string
}> = ({ className, onClick }) => {
	const { preferredLanguage } = useExtensionState()

	return (
		<Tooltip>
			<TooltipContent side="left">{localize(preferredLanguage, "Start a New Task", "开始新任务")}</TooltipContent>
			<TooltipTrigger className={cn("flex items-center", className)}>
				<Button
					aria-label={localize(preferredLanguage, "New Task", "新建任务")}
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						onClick()
					}}
					size="icon"
					variant="icon">
					<XIcon />
				</Button>
			</TooltipTrigger>
		</Tooltip>
	)
}

export default NewTaskButton
