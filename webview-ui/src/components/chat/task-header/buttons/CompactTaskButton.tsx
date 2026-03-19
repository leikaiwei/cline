import { FoldVerticalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

const CompactTaskButton: React.FC<{
	className?: string
	onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}> = ({ onClick, className }) => {
	return (
		<Tooltip>
			<TooltipContent side="left">Compact Task</TooltipContent>
			<TooltipTrigger asChild>
				<Button
					aria-label="Compact Task"
					className={cn("flex items-center [&_svg]:size-3", className)}
					onClick={(e) => {
						e.preventDefault()
						e.stopPropagation()
						onClick(e)
					}}
					size="icon"
					variant="icon">
					<FoldVerticalIcon />
				</Button>
			</TooltipTrigger>
		</Tooltip>
	)
}

export default CompactTaskButton
