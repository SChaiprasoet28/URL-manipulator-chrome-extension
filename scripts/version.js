#!/usr/bin/env node

/**
 * Version Management Script
 * 
 * This script provides utilities for managing the version of the Chrome extension.
 * It can get the current version, increment it, set it to a specific value,
 * and generate a changelog from commit messages.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const semver = require('semver');

// Path to package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');

/**
 * Get the current version from package.json
 * @returns {string} The current version
 */
function getCurrentVersion() {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    return packageJson.version;
  } catch (error) {
    console.error('Error reading package.json:', error.message);
    process.exit(1);
  }
}

/**
 * Update the version in package.json
 * @param {string} newVersion - The new version to set
 */
function updateVersion(newVersion) {
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packageJson.version = newVersion;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    console.log(`Version updated to ${newVersion}`);
  } catch (error) {
    console.error('Error updating package.json:', error.message);
    process.exit(1);
  }
}

/**
 * Increment the version by the specified type
 * @param {string} type - The type of increment (major, minor, patch)
 * @returns {string} The new version
 */
function incrementVersion(type) {
  const currentVersion = getCurrentVersion();
  const newVersion = semver.inc(currentVersion, type);
  
  if (!newVersion) {
    console.error(`Invalid version increment type: ${type}`);
    process.exit(1);
  }
  
  updateVersion(newVersion);
  return newVersion;
}

/**
 * Set the version to a specific value
 * @param {string} version - The version to set
 */
function setVersion(version) {
  if (!semver.valid(version)) {
    console.error(`Invalid version format: ${version}`);
    process.exit(1);
  }
  
  updateVersion(version);
}

/**
 * Get commit messages since the last tag
 * @returns {string} The changelog
 */
function getChangelog() {
  try {
    // Get the last tag
    const lastTag = execSync('git describe --tags --abbrev=0 2>/dev/null || echo ""').toString().trim();
    
    // If no tags exist, get all commits
    const gitLogCommand = lastTag 
      ? `git log ${lastTag}..HEAD --pretty=format:"- %s (%h)"`
      : 'git log --pretty=format:"- %s (%h)"';
    
    const changelog = execSync(gitLogCommand).toString().trim();
    
    if (!changelog) {
      return 'No changes since last release.';
    }
    
    return changelog;
  } catch (error) {
    console.error('Error generating changelog:', error.message);
    return 'Error generating changelog.';
  }
}

/**
 * Parse commit message to determine version increment type
 * @param {string} commitMessage - The commit message
 * @returns {string|null} The version increment type or null if not found
 */
function parseVersionTypeFromCommit(commitMessage) {
  const majorMatch = commitMessage.match(/\[major\]/i);
  const minorMatch = commitMessage.match(/\[minor\]/i);
  const patchMatch = commitMessage.match(/\[patch\]/i);
  
  if (majorMatch) return 'major';
  if (minorMatch) return 'minor';
  if (patchMatch) return 'patch';
  
  return null;
}

/**
 * Get the latest commit message
 * @returns {string} The latest commit message
 */
// Main function
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command) {
    console.error('Please provide a command: get, increment, or set');
    process.exit(1);
  }
  
  switch (command) {
    case 'get':
      console.log(getVersion());
      break;
    case 'increment':
      const type = args[1] || 'patch';
      const newVersion = incrementVersion(type);
      console.log(newVersion);
      break;
    case 'set':
      if (!args[1]) {
        console.error('Please provide a version to set');
        process.exit(1);
      }
      const setVersionResult = setVersion(args[1]);
      console.log(setVersionResult);
      break;
    case 'changelog':
      console.log(getCommitMessagesSinceLastTag());
      break;
    default:
      console.error('Unknown command. Use: get, increment, or set');
      process.exit(1);
  }
}

main(); 