#!/usr/bin/env node
/**
 * Unused Files Scanner
 * Scans public assets and identifies potentially unused files
 * Outputs: scripts/unused-files-report.json
 */

const fs = require('fs')
const path = require('path')

const PUBLIC_DIR = path.join(process.cwd(), 'public')
const COMPONENT_DIRS = [
  path.join(process.cwd(), 'components'),
  path.join(process.cwd(), 'app'),
]
const EXCLUDE_DIRS = ['node_modules', '.next', 'archive', 'mnt', 'dist', 'build']

function getAllFiles(dir, fileList = [], baseDir = dir) {
  if (!fs.existsSync(dir)) return fileList

  const files = fs.readdirSync(dir)
  files.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      const relativePath = path.relative(baseDir, filePath)
      if (!EXCLUDE_DIRS.some(exclude => relativePath.includes(exclude))) {
        getAllFiles(filePath, fileList, baseDir)
      }
    } else {
      fileList.push(filePath)
    }
  })
  return fileList
}

function searchForReference(fileName, searchDirs) {
  const references = []
  const searchPatterns = [
    new RegExp(fileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
    new RegExp(fileName.replace(/\.[^.]+$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'),
  ]

  searchDirs.forEach(dir => {
    if (!fs.existsSync(dir)) return

    const files = getAllFiles(dir, [], dir)
    files.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf8')
        searchPatterns.forEach(pattern => {
          if (pattern.test(content)) {
            references.push({
              file: path.relative(process.cwd(), file),
              pattern: pattern.toString(),
            })
          }
        })
      } catch (e) {
        // Skip binary files or files that can't be read
      }
    })
  })

  return references
}

function getFileSize(filePath) {
  try {
    const stat = fs.statSync(filePath)
    return stat.size
  } catch {
    return 0
  }
}

function formatFileSize(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}

function main() {
  console.log('🔍 Scanning for unused files...\n')

  if (!fs.existsSync(PUBLIC_DIR)) {
    console.log('❌ Public directory not found')
    return
  }

  const publicFiles = getAllFiles(PUBLIC_DIR, [], PUBLIC_DIR)
  console.log(`Found ${publicFiles.length} files in public directory\n`)

  const unusedFiles = []
  const largeFiles = []

  publicFiles.forEach(filePath => {
    const fileName = path.basename(filePath)
    const relativePath = path.relative(PUBLIC_DIR, filePath)
    const size = getFileSize(filePath)

    // Check for references in components and app directories
    const references = searchForReference(fileName, COMPONENT_DIRS)

    if (references.length === 0) {
      unusedFiles.push({
        path: relativePath,
        fullPath: filePath,
        size: size,
        sizeFormatted: formatFileSize(size),
      })
    }

    // Flag large files (>5MB)
    if (size > 5 * 1024 * 1024) {
      largeFiles.push({
        path: relativePath,
        fullPath: filePath,
        size: size,
        sizeFormatted: formatFileSize(size),
      })
    }
  })

  const report = {
    timestamp: new Date().toISOString(),
    total_files_scanned: publicFiles.length,
    unused_files_count: unusedFiles.length,
    unused_files: unusedFiles.slice(0, 100), // Top 100
    large_files_count: largeFiles.length,
    large_files: largeFiles,
    recommendations: [
      'Review unused files and consider archiving or removing them',
      'Large files (>5MB) should be moved to external storage or Git LFS',
      'Verify files are truly unused before deletion',
    ],
  }

  const outputPath = path.join(__dirname, 'unused-files-report.json')
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2))

  console.log('✅ Scan complete!')
  console.log(`📁 Total files scanned: ${publicFiles.length}`)
  console.log(`🚫 Potentially unused files: ${unusedFiles.length}`)
  console.log(`📦 Large files (>5MB): ${largeFiles.length}`)
  console.log(`📝 Report saved to: ${outputPath}\n`)

  return report
}

if (require.main === module) {
  main()
}

module.exports = { main, searchForReference }

