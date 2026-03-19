import { NewTaskRequest } from "@shared/proto/cline/task"
import React from "react"
import { TaskServiceClient } from "@/services/grpc-client"
import { useExtensionState } from "@/context/ExtensionStateContext"
import { localize } from "@/utils/localization"
import QuickWinCard from "./QuickWinCard"
import { QuickWinTask, quickWinTasks } from "./quickWinTasks"

export const SuggestedTasks: React.FC<{ shouldShowQuickWins: boolean }> = ({ shouldShowQuickWins }) => {
	const { preferredLanguage } = useExtensionState()

	const handleExecuteQuickWin = async (prompt: string) => {
		await TaskServiceClient.newTask(NewTaskRequest.create({ text: prompt, images: [] }))
	}

	if (shouldShowQuickWins) {
		return (
			<div className="px-4 pt-1 pb-3 select-none">
				{" "}
				<h2 className="text-sm font-medium mb-2.5 text-center text-gray">
					{localize(preferredLanguage, "Quick ", "快速")}
					<span className="text-white">[Wins]</span>
					{localize(preferredLanguage, " with Cline", " 灵感")}
				</h2>
				<div className="flex flex-col space-y-1">
					{" "}
					{quickWinTasks.map((task: QuickWinTask) => (
						<QuickWinCard key={task.id} onExecute={() => handleExecuteQuickWin(task.prompt)} task={task} />
					))}
				</div>
			</div>
		)
	}
}
