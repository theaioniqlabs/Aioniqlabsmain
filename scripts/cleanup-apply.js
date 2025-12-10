#!/usr/bin/env node
/**
 * Cleanup Apply Script
 * Applies low-risk archive operations from cleanup report
 * Usage: node scripts/cleanup-apply.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DRY_RUN = process.argv.includes('--dry-run');
const REPORT_PATH = path.join(__dirname, 'cleanup-report-20251209.json');

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

function execCommand(cmd, description) {
  log(`\n${description}`, 'blue');
  if (DRY_RUN) {
    log(`[DRY RUN] Would execute: ${cmd}`, 'yellow');
    return { success: true, output: '[DRY RUN]' };
  }
  try {
    const output = execSync(cmd, { encoding: 'utf-8', stdio: 'pipe' });
    log(`✓ Success`, 'green');
    return { success: true, output };
  } catch (error) {
    log(`✗ Failed: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

function main() {
  log('=== Cleanup Apply Script ===', 'blue');
  log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`, DRY_RUN ? 'yellow' : 'red');

  // Load report
  if (!fileExists(REPORT_PATH)) {
    log(`Error: Report not found at ${REPORT_PATH}`, 'red');
    process.exit(1);
  }

  const report = JSON.parse(fs.readFileSync(REPORT_PATH, 'utf-8'));
  const archiveBase = path.join(__dirname, '..', 'archive', 'cleanup-20251209');

  // Create archive directory structure
  log('\n=== Step 1: Create Archive Structure ===', 'blue');
  const archiveDirs = [
    'components/ui',
    'components/demo',
    'components/CardStack',
    'components/explore-grid',
    'components/trusted-band',
    'components/ui/tilt',
    'app/(demo)/progressive-blur-demo',
    'public/assets/backgrounds',
    'public/assets/trusted',
    'assets',
  ];

  archiveDirs.forEach(dir => {
    const fullPath = path.join(archiveBase, dir);
    if (!DRY_RUN) {
      fs.mkdirSync(fullPath, { recursive: true });
    }
    log(`Created: ${fullPath}`, 'green');
  });

  // Archive low-risk components
  log('\n=== Step 2: Archive Unused Components ===', 'blue');
  const lowRiskComponents = report.unused_components
    .filter(c => c.risk === 'Low')
    .map(c => ({
      source: c.path,
      dest: path.join(archiveBase, c.path),
    }));

  lowRiskComponents.forEach(({ source, dest }) => {
    const sourcePath = path.join(__dirname, '..', source);
    if (fileExists(sourcePath)) {
      const destDir = path.dirname(dest);
      if (!DRY_RUN) {
        fs.mkdirSync(destDir, { recursive: true });
        fs.renameSync(sourcePath, dest);
      }
      log(`Archived: ${source} → ${dest}`, 'green');
    } else {
      log(`Skipped (not found): ${source}`, 'yellow');
    }
  });

  // Archive empty directories (create .gitkeep)
  log('\n=== Step 3: Archive Empty Directories ===', 'blue');
  const emptyDirs = report.empty_directories.map(d => d.path);
  
  emptyDirs.forEach(dir => {
    const sourcePath = path.join(__dirname, '..', dir);
    const gitkeepPath = path.join(sourcePath, '.gitkeep');
    const archivePath = path.join(archiveBase, dir);
    
    if (fs.existsSync(sourcePath)) {
      if (!DRY_RUN) {
        // Create .gitkeep to track empty directory
        fs.writeFileSync(gitkeepPath, '# Archived empty directory\n');
        // Move directory
        fs.renameSync(sourcePath, archivePath);
      }
      log(`Archived: ${dir}`, 'green');
    } else {
      log(`Skipped (not found): ${dir}`, 'yellow');
    }
  });

  // Archive duplicate files
  log('\n=== Step 4: Archive Duplicate Files ===', 'blue');
  const duplicates = report.duplicate_files
    .filter(d => d.risk === 'Low')
    .map(d => ({
      source: d.duplicate_path,
      dest: path.join(archiveBase, d.duplicate_path),
    }));

  duplicates.forEach(({ source, dest }) => {
    const sourcePath = path.join(__dirname, '..', source);
    if (fileExists(sourcePath)) {
      const destDir = path.dirname(dest);
      if (!DRY_RUN) {
        fs.mkdirSync(destDir, { recursive: true });
        fs.renameSync(sourcePath, dest);
      }
      log(`Archived: ${source} → ${dest}`, 'green');
    } else {
      log(`Skipped (not found): ${source}`, 'yellow');
    }
  });

  // Archive temporary files
  log('\n=== Step 5: Archive Temporary Files ===', 'blue');
  const tempFiles = report.suspicious_files
    .filter(f => f.type === 'temp_file' && f.risk === 'High')
    .map(f => ({
      source: f.path,
      dest: path.join(archiveBase, f.path),
    }));

  tempFiles.forEach(({ source, dest }) => {
    const sourcePath = path.join(__dirname, '..', source);
    if (fileExists(sourcePath)) {
      const destDir = path.dirname(dest);
      if (!DRY_RUN) {
        fs.mkdirSync(destDir, { recursive: true });
        fs.renameSync(sourcePath, dest);
      }
      log(`Archived: ${source} → ${dest}`, 'green');
    } else {
      log(`Skipped (not found): ${source}`, 'yellow');
    }
  });

  log('\n=== Summary ===', 'blue');
  log(`Components archived: ${lowRiskComponents.length}`, 'green');
  log(`Directories archived: ${emptyDirs.length}`, 'green');
  log(`Duplicates archived: ${duplicates.length}`, 'green');
  log(`Temp files archived: ${tempFiles.length}`, 'green');

  if (DRY_RUN) {
    log('\n[DRY RUN] No files were actually moved.', 'yellow');
    log('Run without --dry-run to apply changes.', 'yellow');
  } else {
    log('\n✓ Archive operations completed.', 'green');
    log('Next: Review changes with `git status` and commit.', 'blue');
  }
}

main();







