#!/usr/bin/env node
/**
 * Cleanup Verification Script
 * Verifies that archived files are not referenced in codebase
 * Usage: node scripts/cleanup-verify.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const REPORT_PATH = path.join(__dirname, 'cleanup-report-20251209.json');
const ARCHIVE_BASE = path.join(__dirname, '..', 'archive', 'cleanup-20251209');

// Colors for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function grepSearch(pattern, excludeDirs = []) {
  const exclude = excludeDirs.map(d => `--exclude-dir=${d}`).join(' ');
  try {
    const cmd = `grep -r "${pattern}" . ${exclude} --exclude="*.json" --exclude="*.md" 2>/dev/null || true`;
    const output = execSync(cmd, { encoding: 'utf-8', cwd: path.join(__dirname, '..') });
    return output.trim().split('\n').filter(line => line.length > 0);
  } catch {
    return [];
  }
}

function checkImport(componentPath) {
  const basename = path.basename(componentPath, path.extname(componentPath));
  const dirname = path.dirname(componentPath);
  const relativePath = path.relative(path.join(__dirname, '..'), componentPath);
  
  // Check for various import patterns
  const patterns = [
    `from ['"].*${basename}['"]`,
    `import.*${basename}`,
    `require.*${basename}`,
    relativePath.replace(/\\/g, '/'),
    relativePath.replace(/\\/g, '\\\\'),
  ];

  const excludeDirs = ['node_modules', '.next', 'archive', 'dist', 'build'];
  const results = [];

  patterns.forEach(pattern => {
    const matches = grepSearch(pattern, excludeDirs);
    if (matches.length > 0) {
      results.push(...matches);
    }
  });

  return results;
}

function main() {
  log('=== Cleanup Verification Script ===', 'blue');

  // Load report
  if (!fs.existsSync(REPORT_PATH)) {
    log(`Error: Report not found at ${REPORT_PATH}`, 'red');
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf-8'));
  let hasErrors = false;
  let totalChecked = 0;
  let totalIssues = 0;

  // Verify archived components
  log('\n=== Checking Archived Components ===', 'blue');
  const archivedComponents = report.unused_components
    .filter(c => c.risk === 'Low')
    .map(c => c.path);

  archivedComponents.forEach(componentPath => {
    totalChecked++;
    const fullPath = path.join(__dirname, '..', componentPath);
    const archivePath = path.join(ARCHIVE_BASE, componentPath);
    
    // Check if file exists in archive
    if (!fs.existsSync(archivePath)) {
      log(`⚠ Warning: ${componentPath} not found in archive`, 'yellow');
      return;
    }

    // Check for references
    const references = checkImport(componentPath);
    if (references.length > 0) {
      log(`✗ ${componentPath} still has references:`, 'red');
      references.forEach(ref => log(`  ${ref}`, 'yellow'));
      hasErrors = true;
      totalIssues++;
    } else {
      log(`✓ ${componentPath} - no references found`, 'green');
    }
  });

  // Verify build artifacts
  log('\n=== Checking Build Artifacts ===', 'blue');
  const buildArtifacts = report.build_artifacts || [];
  buildArtifacts.forEach(artifact => {
    totalChecked++;
    const artifactPath = path.join(__dirname, '..', artifact.path);
    
    // Check if .next is in .gitignore
    const gitignorePath = path.join(__dirname, '..', '.gitignore');
    if (fs.existsSync(gitignorePath)) {
      const gitignore = fs.readFileSync(gitignorePath, 'utf-8');
      if (gitignore.includes('.next')) {
        log(`✓ .next is in .gitignore`, 'green');
      } else {
        log(`⚠ Warning: .next not found in .gitignore`, 'yellow');
        totalIssues++;
      }
    }

    // Check if .next is tracked in git
    try {
      const tracked = execSync(`git ls-files .next/ 2>/dev/null || true`, {
        encoding: 'utf-8',
        cwd: path.join(__dirname, '..'),
      }).trim();
      
      if (tracked.length > 0) {
        log(`✗ .next is still tracked in git`, 'red');
        hasErrors = true;
        totalIssues++;
      } else {
        log(`✓ .next is not tracked in git`, 'green');
      }
    } catch {
      log(`⚠ Could not check git tracking status`, 'yellow');
    }
  });

  // Summary
  log('\n=== Verification Summary ===', 'blue');
  log(`Total items checked: ${totalChecked}`, 'blue');
  log(`Issues found: ${totalIssues}`, totalIssues > 0 ? 'red' : 'green');

  if (hasErrors) {
    log('\n✗ Verification failed. Please review the issues above.', 'red');
    process.exit(1);
  } else {
    log('\n✓ Verification passed. All archived files are safe to remove.', 'green');
    process.exit(0);
  }
}

main();
























