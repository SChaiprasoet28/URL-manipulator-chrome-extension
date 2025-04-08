#!/usr/bin/env node

/**
 * Version Management Script
 * 
 * This script provides utilities for managing the version of the Chrome extension.
 * It uses version.json as the source of truth for version management.
 * The version is removed from package.json to avoid merge conflicts.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const semver = require('semver');

// Path to version.json (source of truth)
const versionJsonPath = path.join(__dirname, '..', 'version.json');
// Path to package.json
const packageJsonPath = path.join(__dirname, '..', 'package.json');

/**
 * Get the current version from version.json (source of truth)
 * @returns {string} The current version
 */
function getCurrentVersion() {
  try {
    const versionJson = JSON.parse(fs.readFileSync(versionJsonPath, 'utf8'));
    return versionJson.version;
  } catch (error) {
    console.error('Error reading version.json:', error.message);
    process.exit(1);
  }
}

/**
 * Update the version in version.json (source of truth)
 * @param {string} newVersion - The new version to set
 */
function updateVersion(newVersion) {
  try {
    // Update version.json (source of truth)
    const versionJson = JSON.parse(fs.readFileSync(versionJsonPath, 'utf8'));
    versionJson.version = newVersion;
    fs.writeFileSync(versionJsonPath, JSON.stringify(versionJson, null, 2) + '\n');
    
    // Remove version from package.json to avoid merge conflicts
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    if (packageJson.version) {
      delete packageJson.version;
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
    }
    
    console.log(`Version updated to ${newVersion} in version.json`);
    console.log(`Version field removed from package.json to avoid merge conflicts`);
  } catch (error) {
    console.error('Error updating version files:', error.message);
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
 * Parse version type from commit message
 * @param {string} commitMessage - The commit message
 * @returns {string} The version type (major, minor, patch)
 */
function parseVersionTypeFromCommit(commitMessage) {
  if (commitMessage.includes('[major]')) {
    return 'major';
  } else if (commitMessage.includes('[minor]')) {
    return 'minor';
  } else {
    return 'patch'; // Default to patch
  }
}

/**
 * Get version type from commit message
 * @returns {string} The version type
 */
function getVersionType() {
  try {
    const commitMessage = execSync('git log -1 --pretty=%B').toString().trim();
    return parseVersionTypeFromCommit(commitMessage);
  } catch (error) {
    console.error('Error getting commit message:', error.message);
    return 'patch'; // Default to patch
  }
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'get':
      console.log(getCurrentVersion());
      break;
    case 'increment':
      const type = args[1] || getVersionType();
      incrementVersion(type);
      break;
    case 'set':
      if (!args[1]) {
        console.error('Please provide a version to set');
        process.exit(1);
      }
      setVersion(args[1]);
      break;
    case 'changelog':
      console.log(getChangelog());
      break;
    case 'get-version-type':
      console.log(getVersionType());
      break;
    default:
      console.error('Unknown command. Available commands: get, increment, set, changelog, get-version-type');
      process.exit(1);
  }
}

main(); 