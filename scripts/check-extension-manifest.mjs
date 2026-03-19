#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const packageJsonPath = path.resolve("package.json")
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"))
const version = packageJson.version

// 只做打包前必需校验，尽早拦住明显不合法的扩展版本号。
const semverLikePattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/
const fourPartNumericMatch = version.match(/^(\d+\.\d+\.\d+)\.(\d+)$/)

if (!semverLikePattern.test(version) && !fourPartNumericMatch) {
	throw new Error(
		`Invalid extension version \"${version}\". VS Code extension manifest requires a SemVer-compatible version like \"1.3.74\".`,
	)
}

if (fourPartNumericMatch) {
	console.log(
		`扩展清单校验通过: version=${version}，打包时会临时转换为 ${fourPartNumericMatch[1]}-${fourPartNumericMatch[2]}`,
	)
} else {
	console.log(`扩展清单校验通过: version=${version}`)
}
