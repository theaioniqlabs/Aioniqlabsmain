#!/usr/bin/env node

/**
 * Button Migration Script
 * Finds and reports button usage patterns for migration to unified Button component
 * 
 * Usage: node scripts/migrate-buttons.js
 * Output: scripts/migration-report.json
 */

const fs = require('fs')
const path = require('path')

// Try to use glob if available, otherwise use simple file walk
let glob
try {
  glob = require('glob').glob || require('glob')
} catch (e) {
  console.warn('⚠️  glob package not found. Install with: npm install glob')
  console.warn('   Falling back to simple file search...\n')
}

// Files to exclude from migration
const EXCLUDE_PATTERNS = [
  '**/node_modules/**',
  '**/docs/archive/**',
  '**/*.test.tsx',
  '**/*.test.ts',
  '**/__tests__/**',
  '**/scripts/**',
]

// Patterns to flag for manual review
const MANUAL_REVIEW_PATTERNS = [
  /SKIP-MIGRATE/i,
  /animated|animation/i,
  /third-party|external/i,
  /lottie/i,
  /ProductFeatures.*486/i, // Specific animated button
  /MainNav.*323/i, // Custom CTA
]

// Patterns that indicate safe migration
const SAFE_PATTERNS = [
  /<Button\s+/,
  /<button\s+className=/,
  /<a\s+.*className.*button/i,
]

/**
 * Check if file should be excluded
 */
function shouldExclude(filePath) {
  return EXCLUDE_PATTERNS.some(pattern => {
    const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\//g, '\\/'))
    return regex.test(filePath)
  })
}

/**
 * Check if file needs manual review
 */
function needsManualReview(content, filePath) {
  return MANUAL_REVIEW_PATTERNS.some(pattern => {
    if (pattern instanceof RegExp) {
      return pattern.test(content) || pattern.test(filePath)
    }
    return content.includes(pattern) || filePath.includes(pattern)
  })
}

/**
 * Find button patterns in file
 */
function findButtonPatterns(content, filePath) {
  const patterns = []
  
  // Find <Button> usage
  const buttonComponentMatches = content.matchAll(/<Button[^>]*>/g)
  for (const match of buttonComponentMatches) {
    patterns.push({
      type: 'Button Component',
      match: match[0],
      line: content.substring(0, match.index).split('\n').length,
      safe: true,
    })
  }
  
  // Find <button> elements
  const buttonElementMatches = content.matchAll(/<button[^>]*>/g)
  for (const match of buttonElementMatches) {
    const fullMatch = match[0]
    const isSafe = !fullMatch.includes('onClick') || fullMatch.includes('className')
    patterns.push({
      type: 'Native Button',
      match: fullMatch,
      line: content.substring(0, match.index).split('\n').length,
      safe: isSafe,
    })
  }
  
  // Find <a> elements styled as buttons
  const anchorButtonMatches = content.matchAll(/<a[^>]*className[^>]*button[^>]*>/gi)
  for (const match of anchorButtonMatches) {
    patterns.push({
      type: 'Anchor as Button',
      match: match[0],
      line: content.substring(0, match.index).split('\n').length,
      safe: true,
    })
  }
  
  return patterns
}

/**
 * Generate migration report
 */
async function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalFiles: 0,
      filesWithButtons: 0,
      safeToMigrate: 0,
      needsManualReview: 0,
      totalButtonInstances: 0,
    },
    files: [],
    flagged: [],
  }
  
  // Find all TypeScript/TSX files
  let files = []
  if (glob) {
    files = await glob('**/*.{ts,tsx}', {
      ignore: EXCLUDE_PATTERNS,
      cwd: process.cwd(),
    })
  } else {
    // Fallback: simple recursive file search
    function findFiles(dir, fileList = []) {
      const files = fs.readdirSync(dir)
      files.forEach(file => {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)
        if (stat.isDirectory() && !shouldExclude(filePath)) {
          findFiles(filePath, fileList)
        } else if (/\.(ts|tsx)$/.test(file) && !shouldExclude(filePath)) {
          fileList.push(path.relative(process.cwd(), filePath))
        }
      })
      return fileList
    }
    files = findFiles(process.cwd())
  }
  
  report.summary.totalFiles = files.length
  
  for (const file of files) {
    if (shouldExclude(file)) continue
    
    const filePath = path.join(process.cwd(), file)
    const content = fs.readFileSync(filePath, 'utf-8')
    
    const patterns = findButtonPatterns(content, filePath)
    
    if (patterns.length > 0) {
      report.summary.filesWithButtons++
      report.summary.totalButtonInstances += patterns.length
      
      const needsReview = needsManualReview(content, file)
      const safeCount = patterns.filter(p => p.safe).length
      
      if (needsReview) {
        report.summary.needsManualReview++
        report.flagged.push({
          file,
          reason: 'Contains patterns requiring manual review',
          patterns: patterns.length,
        })
      } else if (safeCount > 0) {
        report.summary.safeToMigrate++
      }
      
      report.files.push({
        file,
        needsReview,
        patterns,
        safeCount,
        totalPatterns: patterns.length,
      })
    }
  }
  
  return report
}

/**
 * Main execution
 */
async function main() {
  console.log('🔍 Scanning for button usage patterns...\n')
  
  try {
    const report = await generateReport()
    
    // Write report to file
    const reportPath = path.join(process.cwd(), 'scripts', 'migration-report.json')
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2))
    
    // Print summary
    console.log('📊 Migration Report Summary:')
    console.log(`   Total files scanned: ${report.summary.totalFiles}`)
    console.log(`   Files with buttons: ${report.summary.filesWithButtons}`)
    console.log(`   Safe to migrate: ${report.summary.safeToMigrate}`)
    console.log(`   Needs manual review: ${report.summary.needsManualReview}`)
    console.log(`   Total button instances: ${report.summary.totalButtonInstances}\n`)
    
    if (report.flagged.length > 0) {
      console.log('⚠️  Files flagged for manual review:')
      report.flagged.forEach(item => {
        console.log(`   - ${item.file} (${item.reason})`)
      })
      console.log()
    }
    
    console.log(`✅ Full report saved to: ${reportPath}`)
    console.log('\n📝 Next steps:')
    console.log('   1. Review migration-report.json')
    console.log('   2. Manually review flagged files')
    console.log('   3. Apply migrations for safe files')
    console.log('   4. Test changes with: pnpm test && pnpm build\n')
    
  } catch (error) {
    console.error('❌ Error generating report:', error)
    process.exit(1)
  }
}

main()

