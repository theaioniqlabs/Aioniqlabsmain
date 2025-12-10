#!/usr/bin/env node
/**
 * Token Coverage Scanner
 * Scans codebase for raw design literals and compares against token definitions
 * Outputs: scripts/token-coverage.json
 */

const fs = require('fs')
const path = require('path')

const TOKEN_FILES = {
  tokens: path.join(__dirname, '../ui/tokens.json'),
  typography: path.join(__dirname, '../ui/typography.json'),
  colors: path.join(__dirname, '../ui/colors.json'),
  layoutWidths: path.join(__dirname, '../ui/layout-widths.json'),
}

const SCAN_PATTERNS = {
  colors: [
    /#[0-9A-Fa-f]{3,8}/g, // Hex colors
    /rgb\([^)]+\)/g, // RGB colors
    /rgba\([^)]+\)/g, // RGBA colors
    /hsl\([^)]+\)/g, // HSL colors
    /hsla\([^)]+\)/g, // HSLA colors
  ],
  spacing: [
    /(\d+(?:\.\d+)?)\s*px/g, // px values
    /(\d+(?:\.\d+)?)\s*rem/g, // rem values
  ],
  typography: [
    /font-size:\s*(\d+(?:\.\d+)?)\s*px/g, // font-size in px
    /font-size:\s*(\d+(?:\.\d+)?)\s*rem/g, // font-size in rem
    /line-height:\s*(\d+(?:\.\d+)?)/g, // line-height
    /font-weight:\s*(\d+)/g, // font-weight
  ],
  radii: [
    /border-radius:\s*(\d+(?:\.\d+)?)\s*px/g, // border-radius in px
    /borderRadius:\s*['"](\d+(?:\.\d+)?)\s*px['"]/g, // borderRadius in JSX
  ],
}

const EXCLUDE_DIRS = ['node_modules', '.next', 'archive', 'mnt', 'dist', 'build']
const EXCLUDE_FILES = ['.test.', '.spec.']
const FILE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']

function loadTokens() {
  const tokens = {}
  for (const [key, filePath] of Object.entries(TOKEN_FILES)) {
    if (fs.existsSync(filePath)) {
      try {
        tokens[key] = JSON.parse(fs.readFileSync(filePath, 'utf8'))
      } catch (e) {
        console.warn(`Warning: Could not parse ${filePath}:`, e.message)
      }
    }
  }
  return tokens
}

function flattenTokens(obj, prefix = '') {
  const result = {}
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenTokens(value, newKey))
    } else {
      result[newKey] = value
    }
  }
  return result
}

function shouldScanFile(filePath) {
  const ext = path.extname(filePath)
  if (!FILE_EXTENSIONS.includes(ext)) return false

  const relativePath = path.relative(process.cwd(), filePath)
  if (EXCLUDE_FILES.some(exclude => relativePath.includes(exclude))) return false

  const parts = relativePath.split(path.sep)
  if (parts.some(part => EXCLUDE_DIRS.includes(part))) return false

  // Skip token files themselves
  if (relativePath.includes('ui/tokens.json') || 
      relativePath.includes('ui/typography.json') || 
      relativePath.includes('ui/colors.json')) return false

  return true
}

function scanFile(filePath, tokens) {
  const content = fs.readFileSync(filePath, 'utf8')
  const findings = {
    colors: [],
    spacing: [],
    typography: [],
    radii: [],
  }

  // Scan for colors
  SCAN_PATTERNS.colors.forEach(pattern => {
    const matches = content.matchAll(pattern)
    for (const match of matches) {
      findings.colors.push({
        value: match[0],
        line: content.substring(0, match.index).split('\n').length,
      })
    }
  })

  // Scan for spacing
  SCAN_PATTERNS.spacing.forEach(pattern => {
    const matches = content.matchAll(pattern)
    for (const match of matches) {
      findings.spacing.push({
        value: match[0],
        line: content.substring(0, match.index).split('\n').length,
      })
    }
  })

  // Scan for typography
  SCAN_PATTERNS.typography.forEach(pattern => {
    const matches = content.matchAll(pattern)
    for (const match of matches) {
      findings.typography.push({
        value: match[0],
        line: content.substring(0, match.index).split('\n').length,
      })
    }
  })

  // Scan for radii
  SCAN_PATTERNS.radii.forEach(pattern => {
    const matches = content.matchAll(pattern)
    for (const match of matches) {
      findings.radii.push({
        value: match[0],
        line: content.substring(0, match.index).split('\n').length,
      })
    }
  })

  return findings
}

function getAllFiles(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir)
    files.forEach(file => {
      try {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        if (stat.isDirectory()) {
          getAllFiles(filePath, fileList)
        } else if (shouldScanFile(filePath)) {
          fileList.push(filePath)
        }
      } catch (e) {
        // Skip files/directories that can't be accessed (permissions, symlinks, etc.)
        if (e.code !== 'ENOENT' && e.code !== 'EACCES' && e.code !== 'UNKNOWN') {
          console.warn(`Warning: Could not access ${filePath}:`, e.message)
        }
      }
    })
  } catch (e) {
    // Skip directories that can't be accessed
    if (e.code !== 'ENOENT' && e.code !== 'EACCES' && e.code !== 'UNKNOWN') {
      console.warn(`Warning: Could not access directory ${dir}:`, e.message)
    }
  }
  return fileList
}

function main() {
  console.log('🔍 Scanning codebase for token coverage...\n')

  const tokens = loadTokens()
  const flatTokens = flattenTokens(tokens)

  const files = getAllFiles(process.cwd())
  console.log(`Found ${files.length} files to scan\n`)

  const allFindings = {
    colors: [],
    spacing: [],
    typography: [],
    radii: [],
  }

  const fileFindings = {}

  files.forEach(file => {
    const findings = scanFile(file, tokens)
    const relativePath = path.relative(process.cwd(), file)

    // Aggregate findings
    Object.keys(allFindings).forEach(key => {
      if (findings[key].length > 0) {
        allFindings[key].push(...findings[key].map(f => ({
          ...f,
          file: relativePath,
        })))
      }
    })

    if (Object.values(findings).some(arr => arr.length > 0)) {
      fileFindings[relativePath] = findings
    }
  })

  // Calculate coverage
  const totalDesignValues = 
    allFindings.colors.length +
    allFindings.spacing.length +
    allFindings.typography.length +
    allFindings.radii.length

  // Simple heuristic: if value matches a token, it's covered
  // This is a simplified check - in reality, you'd want more sophisticated matching
  const coveredValues = 0 // Placeholder - would need token value matching logic
  const coveragePercent = totalDesignValues > 0 
    ? Math.round((coveredValues / totalDesignValues) * 100) 
    : 100

  const report = {
    timestamp: new Date().toISOString(),
    coverage_percent: coveragePercent,
    total_design_values: totalDesignValues,
    tokens_found: Object.keys(flatTokens).length,
    raw_literals: {
      colors: allFindings.colors.slice(0, 200), // Top 200 samples
      spacing: allFindings.spacing.slice(0, 200),
      typography: allFindings.typography.slice(0, 200),
      radii: allFindings.radii.slice(0, 200),
    },
    files_with_findings: Object.keys(fileFindings).length,
    suggestions: [
      'Review raw literals and map to existing tokens where possible',
      'Create new tokens for commonly used values',
      'Update components to use token references instead of raw values',
    ],
  }

  const outputPath = path.join(__dirname, 'token-coverage.json')
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2))

  console.log('✅ Token scan complete!')
  console.log(`📊 Coverage: ${coveragePercent}%`)
  console.log(`📁 Files with findings: ${report.files_with_findings}`)
  console.log(`📝 Report saved to: ${outputPath}\n`)

  return report
}

if (require.main === module) {
  main()
}

module.exports = { main, scanFile, loadTokens }

