#!/usr/bin/env node
import { spawnSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"

const packageJsonPath = path.resolve("package.json")
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
const originalVersion = packageJson.version
const args = process.argv.slice(2)
const localVscePath = path.resolve("node_modules", ".bin", process.platform === "win32" ? "vsce.cmd" : "vsce")
const hasLocalVsce = fs.existsSync(localVscePath)

function getVsceSpawnConfig() {
	if (hasLocalVsce) {
		if (process.platform === "win32") {
			// Windows 下 .cmd 需要交给 cmd.exe 执行，直接 spawnSync 会报 EINVAL。
			return {
				command: process.env.comspec || "cmd.exe",
				args: ["/d", "/s", "/c", localVscePath, ...args],
			}
		}

		return {
			command: localVscePath,
			args,
		}
	}

	return {
		command: "npx",
		args: ["@vscode/vsce", ...args],
	}
}

const semverLikePattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/
const fourPartNumericPattern = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/

function getVsceCompatibleVersion(version) {
	if (semverLikePattern.test(version)) {
		return version
	}

	const match = version.match(fourPartNumericPattern)
	if (match) {
		const [, major, minor, patch, build] = match
		// VS Code 扩展版本不支持四段数字，改成 semver 预发布格式。
		return `${major}.${minor}.${patch}-${build}`
	}

	throw new Error(
		`不支持的扩展版本号 \"${version}\"。请使用 1.2.3 或 1.2.3-rc.1 这类 SemVer 版本。`,
	)
}

const vsceVersion = getVsceCompatibleVersion(originalVersion)
const shouldRewriteVersion = vsceVersion !== originalVersion
const { command: vsceCommand, args: vsceArgs } = getVsceSpawnConfig()

try {
	if (shouldRewriteVersion) {
		packageJson.version = vsceVersion
		fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, "\t")}\n`)
		console.log(`已临时转换扩展版本: ${originalVersion} -> ${vsceVersion}`)
	}

	const result = spawnSync(vsceCommand, vsceArgs, {
		stdio: "inherit",
		env: process.env,
	})

	if (result.error) {
		throw result.error
	}

	process.exitCode = result.status ?? 0
} finally {
	if (shouldRewriteVersion) {
		packageJson.version = originalVersion
		fs.writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, "\t")}\n`)
		console.log(`已恢复 package.json 版本: ${originalVersion}`)
	}
}
