#!/bin/bash

# Create a mapping of old commit messages to new ones
declare -A commit_messages=(
    ["Update workflow permissions and add force_orphan option"]="fix github pages deploy thingy lol"
    ["Add explicit permissions to GitHub Actions workflow"]="added permissions to workflow i think?"
    ["Remove packageManager field and fix dependencies"]="removed packageManager stuff and fixed deps"
    ["Restore original package.json with packageManager field"]="put back the original package.json"
    ["Remove packageManager field to fix Yarn version compatibility"]="removed packageManager to fix yarn version"
    ["Remove Live Demo section from README"]="removed live demo from readme"
    ["Add GitHub Actions workflow for automatic deployment"]="added github actions for auto deploy"
    ["Add dist folder for GitHub Pages deployment"]="added dist folder for gh pages"
    ["Add back badges to README"]="put badges back in readme"
    ["Restore README to previous detailed version"]="restored the old readme version"
    ["Make README super simple and minimal"]="made readme super simple"
    ["Simplify README - make it shorter and in English"]="simplified readme - shorter and english"
)

# Function to rewrite commit messages
rewrite_message() {
    local old_message="$1"
    local new_message="${commit_messages[$old_message]}"
    
    if [ -n "$new_message" ]; then
        echo "$new_message"
    else
        echo "$old_message"
    fi
}

# Export the function for git filter-branch
export -f rewrite_message

# Use git filter-branch to rewrite the last 12 commits
git filter-branch --msg-filter '
    old_message=$(cat)
    rewrite_message "$old_message"
' HEAD~12..HEAD

echo "Commit messages rewritten! Use 'git push --force' to update remote repository."

