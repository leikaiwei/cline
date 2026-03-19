import { StringArrayRequest } from "@shared/proto/cline/common"
import { TrashIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { cn } from "@/lib/utils"
import { TaskServiceClient } from "@/services/grpc-client"
import { formatSize } from "@/utils/format"
import { localize } from "@/utils/localization"

const DeleteTaskButton: React.FC<{
	taskId?: string
	taskSize?: number
	className?: string
}> = ({ taskId, className, taskSize }) => {
	const { preferredLanguage } = useExtensionState()

	return (
		<Tooltip>
			<TooltipContent>
				{localize(preferredLanguage, "Delete Task", "删除任务")}{" "}
				{localize(preferredLanguage, `(size: ${taskSize ? formatSize(taskSize) : "--"})`, `（大小：${taskSize ? formatSize(taskSize) : "--"}）`)}
			</TooltipContent>
			<TooltipTrigger className={cn("flex items-center", className)}>
				<Button
					aria-label={localize(preferredLanguage, "Delete Task", "删除任务")}
					disabled={!taskId}
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						taskId && TaskServiceClient.deleteTasksWithIds(StringArrayRequest.create({ value: [taskId] }))
					}}
					size="xs"
					variant="icon">
					<TrashIcon />
				</Button>
			</TooltipTrigger>
		</Tooltip>
	)
}
DeleteTaskButton.displayName = "DeleteTaskButton"

export default DeleteTaskButton
